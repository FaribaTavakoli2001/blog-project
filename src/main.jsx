import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './styles/index.css'
import './styles/font.css'
import {  BrowserRouter } from 'react-router-dom'


import { ApolloProvider , ApolloClient , InMemoryCache } from '@apollo/client'
import { ThemeProvider } from '@emotion/react'
import theme from './mui/them.js'

const client = new ApolloClient({
  uri: import.meta.env.VITE_APP_GET_URI ,
  cache:new InMemoryCache(),
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
    <ApolloProvider client={client} >
      <ThemeProvider theme={theme}>
      <App />
      </ThemeProvider>
    </ApolloProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
