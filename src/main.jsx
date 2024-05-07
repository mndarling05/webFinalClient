import React from 'react'
import ReactDOM from 'react-dom/client'

import {BrowserRouter} from 'react-router-dom'
import { AuthContextProvider } from './context/AuthContext.jsx'
import { RatingsContextProvider } from './context/RatingsContext.jsx'
import { ContestantRatingsContextProvider } from './context/ContestantRatingsContext.jsx'

import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <AuthContextProvider>
    <RatingsContextProvider>
      <ContestantRatingsContextProvider>
      <BrowserRouter>
          <App />
        </BrowserRouter>
      </ContestantRatingsContextProvider>
    </RatingsContextProvider>
  </AuthContextProvider>,
)
