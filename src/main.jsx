import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { RecoilRoot } from 'recoil'

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
    <RecoilRoot>
      <App />
      </RecoilRoot>
    </BrowserRouter>
  </React.StrictMode>,
)
