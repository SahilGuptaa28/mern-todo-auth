import React, { useState,useEffect } from "react";
import {Link, useNavigate} from 'react-router-dom'

function Signup() {

    const [userData, setUserData] = useState(
        {
            name: "",
            email: "",
            password: "",
        }
    );
    const navigate = useNavigate()
    useEffect(()=>{
             if(localStorage.getItem('login')){
                navigate('/')
             }
        })

    const handleSignup = async() =>{
       let response = await fetch("http://localhost:3200/signup", {
            method: 'Post',
            body: JSON.stringify(userData),
            headers: {
                'Content-Type': 'application/json'
            },
        })
        response = await response.json()
        if(response.success){
            document.cookie="token=" +response.token 
             localStorage.setItem('login',userData.email)
            navigate('/')
        }else{
           alert("Try after sometime") 
        }
    }
    

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-6 rounded-2xl shadow-md w-full max-w-sm">
                <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
                    Sign Up
                </h2>

                {/* Name */}
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm mb-2">Name</label>
                    <input onChange={(e) => setUserData({ ...userData, name: e.target.value })}
                        type="text"
                        placeholder="Enter your name"
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-gray-500"
                    />
                </div>

                {/* Email */}
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm mb-2">Email</label>
                    <input  onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                        type="email"
                        placeholder="Enter your email"
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-gray-500"
                    />
                </div>

                {/* Password */}
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm mb-2">Password</label>
                    <input  onChange={(e) => setUserData({ ...userData, password: e.target.value })}
                        type="password"
                        placeholder="Enter your password"
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-gray-500"
                    />
                </div>

                {/* Submit */}
                <button onClick={handleSignup} 
                 className="w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition">
                    Sign Up
                </button>
                {/* Login */}
                 <p className="text-sm text-gray-600 mt-4 text-center">
           Already have an account?{" "}
          <Link to="/login" className="text-black hover:underline font-medium">
            Login
          </Link>
        </p> 
            </div>
        </div>
    );
}

export default Signup;
