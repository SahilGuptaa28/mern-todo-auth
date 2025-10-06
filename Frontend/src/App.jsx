import { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import { Route, Routes } from 'react-router-dom'
import AddTask from './components/AddTask'
import List from './components/List'
import UpdateTask from './components/UpdateTask'
import Signup from './components/SignUP'
import Login from './components/Login'
import Protected from './components/Protected.jsx'

function App() {
 

  return (
    <>
    < Navbar />
     <Routes>
      <Route path='/' element={<Protected> <List/> </Protected>} />
      <Route path='/add' element={<Protected> <AddTask/> </Protected>} />
      <Route path='/update/:id' element={< UpdateTask />} />
       <Route path='/signup' element={<Signup />} />
       <Route path='/login' element={<Login />} />

     </Routes>
    </>
  )
}

export default App
