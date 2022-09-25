import React from 'react'

export default function ErrorScreen({ error }) {
  return (
    <div
      className="alert alert-dismissible fade show mb-3 inline-flex w-full items-center rounded-lg bg-yellow-100 py-5 px-6 text-base text-yellow-700"
      role="alert"
    >
      <strong className="mr-1">Oops!</strong>
      {error}
    </div>
  )
}
