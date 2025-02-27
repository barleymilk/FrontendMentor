import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { CommentProvider } from './context/CommentContext'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <CommentProvider>
      <App />
    </CommentProvider>
  </React.StrictMode>
)
