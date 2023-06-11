import React from 'react'
import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
    <div className="max-w-md px-6 py-12 bg-white rounded-lg shadow-lg">
      <h1 className="text-4xl font-bold text-gray-800">404</h1>
      <p className="mt-2 text-gray-600">Oops! The page you're looking for doesn't exist.</p>
      <Link to="/" className="mt-4 inline-block px-4 py-2 text-sm font-medium text-white bg-indigo-500 rounded-lg hover:bg-indigo-600 transition-colors duration-300">
        Go Back Home
      </Link>
      <div className="mt-8">
        <div className="flex justify-center">
          <div className="w-8 h-8 bg-indigo-500 rounded-full animate-bounce mr-1"></div>
          <div className="w-8 h-8 bg-indigo-500 rounded-full animate-bounce mr-1"></div>
          <div className="w-8 h-8 bg-indigo-500 rounded-full animate-bounce"></div>
        </div>
        <p className="mt-2 text-sm text-gray-600 animate-pulse">Searching for the lost page...</p>
      </div>
    </div>
  </div>
  )
}

export default NotFound