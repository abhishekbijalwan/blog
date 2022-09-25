import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { setFilteredPosts } from '../blog/blogSlice'

import { BASE_URL, GET_POSTS_ENDPOINT, LOAD_COMMENTS_ENDPOINT } from '../../constants/url'

export const apiSlice = createApi({
  reducerPath: 'apiSlice',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL
  }),
  entityTypes: ['Posts'],
  endpoints: (builder) => ({
    getPosts: builder.query({
      query: () => GET_POSTS_ENDPOINT,
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        const { data } = await queryFulfilled
        dispatch(setFilteredPosts(data))
      }
    }),
    getSinglePost: builder.query({
      query: (id) => `${GET_POSTS_ENDPOINT}${id}`
    }),
    loadComments: builder.query({
      query: (postId) => `${LOAD_COMMENTS_ENDPOINT}${postId}`
    })
  })
})

export const { useGetSinglePostQuery, useGetPostsQuery, useLoadCommentsQuery } = apiSlice
