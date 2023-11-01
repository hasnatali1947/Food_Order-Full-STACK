"use client"

import Link from 'next/link';
import React from 'react'
import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';

const Login = () => {

  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setpassword] = useState();

  const UserLogin = async (userData) => {
    console.log("userData", userData);
    try {
      const response = await axios.post("http://localhost:5000/api/user/login", userData)
      return response;
    } catch (error) {
      console.error("Login failed", error);
      return error.response;
    }
  }

  const handleLogin = async () => {
    if (!password) {
      alert("Please type your password");
    }
    if(!name){
      alert("Please type your Name")
    }
    else {
      const userData = {
        name,
        email,
        password
      };
      const response = await UserLogin(userData);
      console.log("check name",response);
      if (response.status === 200) {
        localStorage.setItem("userData", JSON.stringify(userData)); 
        window.location.href = '/';
      }
      else if (response.status === 400) {
        alert("Incorrect email");
      }
      else if (response.status === 401) {
        alert("Incorrect password");
      }
    }
  };

  useEffect(()=> {
    if( localStorage.getItem("storeData" )){
      window.location.href = '/';
    }
   
  }, [])

  return (
    <div className='LoginPage'>
      <div className='LoginDiv'>
        <h2>LOGIN</h2>
        <div className='loginInputs'>
          <input required value={name} onChange={(e) => { setName(e.target.value) }} type="text" placeholder='name' />
          <input required value={email} onChange={(e) => { setEmail(e.target.value) }} type="email" placeholder='email' />
          <input required value={password} onChange={(e) => { setpassword(e.target.value) }} type="password" placeholder='password' />
        </div>
        <div className='loginButtons'>
          <button onClick={handleLogin}>LOGIN</button>
          <Link href="/register"><span>Click Here To Register</span></Link>
        </div>
      </div>
    </div>
  )
}

export default Login;