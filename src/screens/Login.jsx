"use client"

import Link from 'next/link';
import React from 'react'
import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';
import { imageLogin } from '@/utility/imports';
import '../app/styles/login.css'
import Image from 'next/image';
import { toast } from "react-toastify";
import * as Yup from 'yup';
import { useStateContext } from '@/context/context';

const Login = () => {

  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setpassword] = useState();
  const { apiData, setApiData, UserLogin } = useStateContext();

  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    email: Yup.string()
      .required('Email is required')
      .email('Invalid email')
      .test('contains-at', 'Email must contain "@"', value => value && value.includes('@')),
    password: Yup.string().required('Password is required'),
  });

  // const UserLogin = async (userData) => {
  //   console.log("user login check : ");
  //   try {
  //     const response = await axios.post("https://foodorder-backend.onrender.com/api/user/login", userData)
  //     console.log("user login : ", response);
  //     setApiData(response)
  //     return response;
  //   } catch (error) {
  //     console.error("Login failed", error);
  //     return error.response;
  //   }
  // }

  // const UserLogin = (userData) => {}

  const handleLogin = async () => {
    try {
      await validationSchema.validate({ name, email, password }, { abortEarly: false });
      const userData = { name, email, password };
      const response = await UserLogin(userData);

      if (response.status === 200) {
        localStorage.setItem("userData", JSON.stringify(userData));
        window.location.href = '/HomeScreen';
      } else if (response.status === 400) {
        toast.error("Incorrect email");
      } else if (response.status === 401) {
        toast.error("Incorrect password");
      }
    } catch (error) {
      if (error.name === 'ValidationError') {
        error.inner.forEach(err => {
          toast.error(err.message);
        });
      }
    }
  };

  useEffect(() => {
    if (localStorage.getItem("storeData")) {
      window.location.href = '/';
    }
  }, [])

  return (
    <div className='LoginPage'>

      <Image className='loginBgImg' width={800} height={800} src={imageLogin.src} alt="loginBackgroudImg" />
      <h2>LOGIN</h2>
      <div className='LoginDiv'>
        <div className='loginInputs'>
          <div>
            <input required value={name} onChange={(e) => { setName(e.target.value) }} type="text" placeholder='name' pattern="[A-Za-z ]+" title="Name should contain only letters and spaces" />
            <input required value={email} onChange={(e) => { setEmail(e.target.value) }} type="email" placeholder='email' />
            <input required value={password} onChange={(e) => { setpassword(e.target.value) }} type="password" placeholder='password' />
            <div className='loginButtons'>
              <button onClick={handleLogin}>LOGIN</button>
            </div>
          </div>
          <Link href="/register"><span style={{ color: 'white' }}>Click Here To Register</span></Link>
        </div>
      </div>
    </div>
  )
}

export default Login;