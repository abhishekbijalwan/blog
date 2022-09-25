import React, { useCallback, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import debounce from 'lodash.debounce'

import { apiSlice, useGetPostsQuery } from '../features/api/apiSlice'
import { setFilteredPosts } from '../features/blog/blogSlice'

import ErrorScreen from '../components/ErrorScreen'
import LoadingScreen from '../components/LoadingScreen'
import PostCard from '../components/PostCard'

const DELAY = 400

function Home() {
  const [inputValue, setInputValue] = useState('')
  const { isLoading, isError, error } = useGetPostsQuery()

  const dispatch = useDispatch()
  const state = useSelector((state) => state)
  const filteredPosts = useSelector((state) => state.blog.filteredPosts)

  const getFilteredPosts = (text) =>
    apiSlice.endpoints.getPosts
      .select()(state)
      .data?.filter((post) => post.title?.includes(text))

  const searchPosts = (text) => {
    dispatch(setFilteredPosts(getFilteredPosts(text)))
  }

  const controlledSearch = useCallback(
    debounce((string) => searchPosts(string), DELAY),
    [inputValue]
  )

  const handleSearchChange = (event) => {
    event.preventDefault()

    const { value } = event.target
    const trimmedString = value.replace(/  +/g, ' ')

    setInputValue(trimmedString)
    controlledSearch(trimmedString)
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    searchPosts(inputValue)
  }

  return (
    <>
      <Helmet>
        <title>Home</title>
      </Helmet>
      <div className="mt-16">
        <form className="m-auto w-1/2" onSubmit={handleSubmit}>
          <label
            htmlFor="default-search"
            className="sr-only mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            Search
          </label>
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3" />
            <input
              type="search"
              id="search"
              value={inputValue}
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-4 pl-10 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
              placeholder="Search..."
              onChange={handleSearchChange}
              required
            />
            <button
              type="submit"
              className="absolute right-2.5 bottom-2.5 rounded-lg bg-blue-700 px-4 py-2 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Search
            </button>
          </div>
        </form>
      </div>
      <div className="m-24">
        {isError && <ErrorScreen error={error} />}
        {isLoading && <LoadingScreen />}
        <ul className="grid grid-cols-6 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8">
          {filteredPosts?.map((post) => (
            <li key={post.id} className="relative">
              <Link to={`/posts/${post.id}`}>
                <PostCard post={post} />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}
export default Home
