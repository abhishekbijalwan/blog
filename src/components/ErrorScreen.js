import React from 'react'

export default function ErrorScreen() {
  return (
    <div
      className="alert alert-dismissible fade show m-auto mb-3 inline-flex w-1/2 items-center rounded-lg bg-yellow-100 py-5 px-6 text-center text-base text-yellow-700"
      role="alert"
    >
      <strong className="mr-1">Oops! Something went wrong.</strong>
    </div>
  )
}
