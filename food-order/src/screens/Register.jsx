"use client"
import React from 'react'
import { useState } from 'react';
import Link from 'next/link';
import axios from 'axios';

const Register = () => {

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [Cpasswrod, setCpassword] = useState('')
  const [apiData, setApiData] = useState()
  

  const UserRegister = async (userData) => {
    try {
      const response = await axios.post("http://localhost:5000/api/user/register", userData);
      console.log("User data Api", response);
      setApiData(response)
      console.log("ApiData:", apiData);
      return response
    } catch (error) {
      console.error("Registration Failed", error);
    }
  };

  const handleRagister = async () => {
    if (password !== Cpasswrod) {
      alert("passwords not matched")
    }
    else if (!name) {
      alert("please type name")
    }
    else {
      const userData = {
        name,
        email,
        password
      }
      console.log("user :", userData);
      const response = await UserRegister(userData);
      if (response.status === 201) {
        localStorage.setItem("userData", JSON.stringify(userData));
      }
    }
  }

  return (
    <div className='RegisterPage'>
      <div className='registerDiv'>
        <h2>REGISTER</h2>
        <div className='registerInputs'>
          <input required value={name} onChange={(e) => { setName(e.target.value) }} type="text" placeholder='name' />
          <input required value={email} onChange={(e) => { setEmail(e.target.value) }} type="email" placeholder='email' />
          <input required value={password} onChange={(e) => { setPassword(e.target.value) }} type="password" placeholder='password' />
          <input required value={Cpasswrod} onChange={(e) => { setCpassword(e.target.value) }} type="password" placeholder='confirm password' />
        </div>
        <div className='registerButtons'>
          <button onClick={handleRagister}>REGISTER</button>
         <Link href="/login"><span>Click Here To Login</span></Link> 
        </div>
      </div>
    </div>
  )
}

export default Register;