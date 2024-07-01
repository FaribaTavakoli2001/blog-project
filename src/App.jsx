import React from 'react'
import HomePage from './components/home/HomePage';
import Layout from './components/layout/Layout';
import { Navigate, Route , Routes } from 'react-router-dom'; 
import AuthorPages from './components/authors/AuthorPages';
import BlogPages from './components/blog/BlogPages';


function App() {

  return (
    <div>
      <Layout>
        
        <Routes>
          <Route path='/HomePage' element={<HomePage />} />
          <Route path='/' element={<Navigate to='/HomePage' replace /> } />
          <Route path='/blogs/:slug' element={<BlogPages />} />
          <Route path='/authors/:slug' element={<AuthorPages />} />

        </Routes>
      </Layout>
    </div>
  )
}

export default App