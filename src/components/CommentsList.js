import React from 'react'
import { useSelector } from 'react-redux'

export default function CommentsList() {
  const comments = useSelector((state) => state.blog?.currentPost?.comments)

  return (
    <div className="flex items-center justify-center">
      <div className="block">
        {comments?.map(({ name, body }) => (
          <div key={name} className="my-4 flex items-center justify-center overflow-hidden">
            <div className="h-24 w-1/2 rounded-xl bg-gray-100 p-3">
              <div className="font-medium ">
                <small>{name}</small>
              </div>
              <div className="text-m mt-2">{body}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
