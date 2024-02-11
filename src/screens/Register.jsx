"use client"
import React from 'react'
import { useState } from 'react';
import Link from 'next/link';
import axios from 'axios';
import { imageLogin } from '@/utility/imports';
import "../app/styles/register.css"
import Image from 'next/image';
import { toast } from "react-toastify";
import * as Yup from 'yup';

const Register = () => {

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [Cpasswrod, setCpassword] = useState('')
  const [apiData, setApiData] = useState()

  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    email: Yup.string()
      .required('Email is required')
      .email('Invalid email')
      .test('contains-at', 'Email must contain "@"', value => value && value.includes('@')),
    password: Yup.string().required('Password is required'),
    Cpasswrod: Yup.string().required('Confirm Password is required'),
  });

  const UserRegister = async (userData) => {
    try {
      const response = await axios.post("https://foodorder-backend.onrender.com/api/user/register", userData);
      setApiData(response)
      return response
    } catch (error) {
      console.error("Registration Failed", error);
    }
  };

  const handleRagister = async () => {

    try {
      await validationSchema.validate({ name, email, password, Cpasswrod }, { abortEarly: false });

      if (password !== Cpasswrod) {
        toast.error("passwords not matched")
      }
      else if (!name) {
        toast.error("please type name")
      }
      else {
        const userData = {
          name,
          email,
          password
        }
        const response = await UserRegister(userData);
        if (response.status === 201) {
          localStorage.setItem("userData", JSON.stringify(userData));
        }
      }
    } catch (error) {
      if (error.name === 'ValidationError') {
        error.inner.forEach(err => {
          toast.error(err.message);
        });
      }
    }
  }

  return (
    <div className='RegisterPage'>
      <Image className='loginBgImg' width={800} height={800} src={imageLogin.src} alt="loginBackgroudImg" />
      <h2>REGISTER</h2>
      <div className='registerDiv'>
        <div className='registerInputs'>
          <div>
            <input required value={name} onChange={(e) => { setName(e.target.value) }} type="text" placeholder='name' />
            <input required value={email} onChange={(e) => { setEmail(e.target.value) }} type="email" placeholder='email' />
            <input required value={password} onChange={(e) => { setPassword(e.target.value) }} type="password" placeholder='password' />
            <input required value={Cpasswrod} onChange={(e) => { setCpassword(e.target.value) }} type="password" placeholder='confirm password' />
            <div className='registerButtons'>
              <button onClick={handleRagister}>REGISTER</button>
            </div>
          </div>
          <Link href="/login"><span style={{ color: 'white', fontSize: '13px', textDecoration: 'underline' }}>Click Here To Login</span></Link>
        </div>
      </div>
    </div>
  )
}

export default Register;