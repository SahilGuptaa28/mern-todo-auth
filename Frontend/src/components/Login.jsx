import React, { useState } from "react";
import { useEffect } from "react";
import {Link} from 'react-router-dom'
import { useNavigate } from "react-router-dom";
function Login() {

    const [userData, setUserData] = useState(
        {
            email: "",
            password: "",
        }
    );

    useEffect(()=>{
         if(localStorage.getItem('login')){
            navigate('/')
         }
    })

    const navigate = useNavigate()
     const handleLogin = async() =>{
       let response = await fetch("http://localhost:3200/login", {
            method: 'Post',
            body: JSON.stringify(userData),
            headers: {
                'Content-Type': 'application/json'
            },
          
        })
        response = await response.json()
        if(response.success){
            document.cookie="token=" + response.token  
            localStorage.setItem('login',userData.email)
            window.dispatchEvent(new Event('localStorage-change'))
            navigate('/')
        }else{
            alert("Wrong email or password")
        }
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-6 rounded-2xl shadow-md w-full max-w-sm">
                <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
                    Login
                </h2>

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
                <button onClick={handleLogin} 
                 className="w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition">
                    Login
                </button>
                {/* SignUp */}
                  <p className="text-sm text-gray-600 mt-4 text-center">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-black hover:underline font-medium">
            Sign up
          </Link>
        </p>
            </div>
        </div>
    );
}

export default Login;
