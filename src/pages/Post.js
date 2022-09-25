import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { Helmet } from 'react-helmet'

import { setCurrentPost, setPostComments } from '../features/blog/blogSlice'
import { useLoadCommentsQuery, useGetSinglePostQuery } from '../features/api/apiSlice'

import CommentsList from '../components/CommentsList'
import ErrorScreen from '../components/ErrorScreen'
import LoadingScreen from '../components/LoadingScreen'

const buttonClass =
  'dark:focus:ring-[#3b5998]/55 mt-8 mr-2 mb-2 inline-flex items-center rounded-lg bg-[#3b5998] px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-[#3b5998]/90 focus:outline-none focus:ring-4 focus:ring-[#3b5998]/50'

export default function Post() {
  const [skip, setSkip] = useState(true)
  const dispatch = useDispatch()
  const { id: postId } = useParams()

  const { data: post, isLoading, isError, error, isSuccess } = useGetSinglePostQuery(postId)
  const {
    data: comments,
    isLoading: isCommentsFetching,
    isSuccess: isCommentFetched
  } = useLoadCommentsQuery(postId, {
    skip
  })

  const currentPost = useSelector((state) => state?.blog?.currentPost)

  useEffect(() => {
    dispatch(setCurrentPost(post))
    if (!skip && isCommentFetched) dispatch(setPostComments(comments))
  }, [comments, dispatch, isCommentFetched, post, skip])

  const handleLoadComments = () => {
    setSkip(!skip)
  }

  const buttonTitle = () => {
    let buttonTitle = 'Fetch comments'

    if (isCommentsFetching) buttonTitle = 'Fetching comments...'
    else if (isCommentFetched) buttonTitle = 'Comments fetched.'

    return buttonTitle
  }

  return (
    <>
      <Helmet>
        <title>{currentPost?.title}</title>
      </Helmet>
      {isError && <ErrorScreen error={error} />}
      {isLoading && <LoadingScreen />}
      {isSuccess && (
        <div className="overflow-hidden bg-white py-16 px-4 sm:px-6 lg:px-8 xl:py-36">
          <div className="mx-auto max-w-max lg:max-w-7xl">
            <div className="relative z-10 mb-8 md:mb-2 md:px-6">
              <div className="max-w-prose text-base lg:max-w-none">
                <p className="mt-2 text-3xl font-bold leading-8 tracking-tight text-gray-900 sm:text-4xl">
                  {currentPost?.title}
                </p>
              </div>
            </div>
            <div className="relative md:bg-white md:p-6">
              <div className="lg:grid lg:grid-cols-2 lg:gap-6">
                <div className="prose prose-lg prose-indigo text-gray-500 lg:max-w-none">
                  <p> {currentPost?.body}</p>
                </div>
              </div>
              <button
                disabled={isCommentsFetching || isCommentFetched}
                type="button"
                className={`${buttonClass} ${isCommentFetched && 'cursor-not-allowed'}`}
                onClick={handleLoadComments}
              >
                {buttonTitle()}
              </button>
              {isCommentFetched && <CommentsList />}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
