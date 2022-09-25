import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

import Home from '../pages/Home'
import NotFoundPage from '../pages/NotfoundPage'
import Post from '../pages/Post'

import { BASE_ROUTES, BLOG_ROUTES } from '../constants/routes'

const appRoutes = () => [
  {
    path: BASE_ROUTES.HOME,
    element: <Navigate to={BLOG_ROUTES.POSTS} />,
    fallback: <div> Loading... </div>
  },
  {
    path: BLOG_ROUTES.POSTS,
    element: <Outlet />,
    fallback: <div> Loading... </div>,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: BLOG_ROUTES.BLOG_POST,
        element: <Post />
      },
      {
        path: '*',
        element: <NotFoundPage />
      }
    ]
  },
  {
    path: '*',
    element: <NotFoundPage />
  }
]

export default appRoutes
