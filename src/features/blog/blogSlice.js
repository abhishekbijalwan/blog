import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  filteredPosts: [],
  currentPost: { comments: [] }
}

export const blogSlice = createSlice({
  name: 'blogSlice',
  initialState,
  reducers: {
    setCurrentPost: (state, action) => {
      state.currentPost = action.payload
    },
    setPostComments: (state, action) => {
      state.currentPost = { ...state.currentPost, comments: action.payload }
    },
    setFilteredPosts: (state, action) => {
      state.filteredPosts = action.payload && [...action.payload]
    }
  }
})

export const { setCurrentPost, setFilteredPosts, setPostComments } = blogSlice.actions

export default blogSlice.reducer
