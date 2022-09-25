import React from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { Helmet } from 'react-helmet'

import { store } from './app/store'

import App from './App'
import './index.css'

const container = document.getElementById('root')
const root = createRoot(container)

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Helmet defaultTitle="Awesome Blog App" titleTemplate="%s | Blog App">
          <meta name="description" content="Blog App with search and comments" />
          <meta name="keywords" content="Blog, Comments, Posts" />
        </Helmet>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
)
