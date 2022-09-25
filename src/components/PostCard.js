import React from 'react'

export default function PostCard({ post }) {
  return (
    <div className="h-80 max-w-sm overflow-hidden rounded-lg border border-gray-200 bg-white p-6 shadow-md dark:border-gray-700 dark:bg-gray-800">
      <h5 className="mb-2 h-16 overflow-hidden text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        {post.title}
      </h5>
      <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{post.body}</p>
    </div>
  )
}
