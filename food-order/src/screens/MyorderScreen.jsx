"use client"
import axios from 'axios'
import React from 'react'
import { useState, useEffect } from 'react'
import "../app/styles/myOrder.css"


const MyorderScreen = () => {

  const [myOrder, setMyOrder] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/myorder/myOrderRoute")
        const data = response.data
        setMyOrder(data)
        console.log("getdata", data);  
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
    },[])

  return (
    <div className='MyOrderContainer'>
      <h1>My Orders</h1>
      {myOrder.map((item, index) => (

        <div key={index}>
          <h2>{item.name}</h2>
          <span>{item.orderAmount}</span>
          <div className='fullAddress'>
            <span>Street: {item.fullAddress.street}</span>
            <span>City: {item.fullAddress.City}</span>
            <span>Country: {item.fullAddress.Country}</span>
            <span>PinCode: {item.fullAddress.pinCode}</span>
          </div>
        </div>

      ))}
    </div>
  )
}

export default MyorderScreen;