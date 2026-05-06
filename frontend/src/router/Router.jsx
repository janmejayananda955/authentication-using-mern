import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from '../components/pages/Login'

const Router = () => {
  return (
      <Routes>
        <Route path='/'>{<Login/>}</Route>
        <Route path='/login'>{<Login/>}</Route>
        <Route path='/register'></Route>
      </Routes>
  )
}

export default Router