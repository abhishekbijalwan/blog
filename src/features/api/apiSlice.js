import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { setFilteredPosts } from '../blog/blogSlice'

export const apiSlice = createApi({
  reducerPath: 'apiSlice',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://jsonplaceholder.typicode.com'
  }),
  entityTypes: ['Posts'],
  endpoints: (builder) => ({
    getPosts: builder.query({
      query: () => '/posts',
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        const { data } = await queryFulfilled
        dispatch(setFilteredPosts(data))
      }
    }),
    getSinglePost: builder.query({
      query: (id) => `/posts/${id}`
    }),
    loadComments: builder.query({
      query: (postId) => `/comments?postId=${postId}`
    })
  })
})

export const { useGetSinglePostQuery, useGetPostsQuery, useLoadCommentsQuery } = apiSlice
