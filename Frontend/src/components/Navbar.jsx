import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';

function Navbar() {
 
  const [login,setLogin] = useState(localStorage.getItem('login'))
  const navigate= useNavigate()
   const logout = () =>{
    localStorage.removeItem('login');
    setLogin(null)
   setTimeout(()=>{
     navigate('/login')
   },0)
   }



   useEffect(()=>{
   const handleStorage = () =>{
    setLogin(localStorage.getItem('login'))
   }

   window.addEventListener("localStorage-change",handleStorage)

   return ()=>{
    window.addEventListener("localStorage-change",handleStorage)
   }
   },[])

   

  return (
    <nav className="bg-black text-white pl-2 px-6 py-4 shadow-md flex justify-between items-center">
      <div className="text-2xl font-bold">TODO App</div>
      <ul className="flex space-x-6">
        {
           login ?
          <>
         <li>
          <Link
            to="/"
            className="hover:text-gray-200 transition-colors duration-200"
          >
            List
          </Link>
        </li>
        <li>
          <Link
            to="/add"
            className="hover:text-gray-200 transition-colors duration-200"
          >
            Add Task
          </Link>
        </li>
         <li>
          <Link onClick={logout}
            className="hover:text-gray-200 transition-colors duration-200"
          >
            Log out
          </Link>
        </li>

          </>:null
        }
             </ul>
    </nav>
  );
}

export default Navbar;

