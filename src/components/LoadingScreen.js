import React from 'react'

export default function LoadingScreen() {
  return (
    <div className="h-center flex items-center justify-center ">
      <div className="flex animate-bounce items-center justify-center space-x-2">
        <div className="h-8 w-8 rounded-full bg-blue-400" />
        <div className="h-8 w-8 rounded-full bg-green-400" />
        <div className="h-8 w-8 rounded-full bg-black" />
      </div>
    </div>
  )
}
