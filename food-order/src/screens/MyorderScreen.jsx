"use client"
import Loading from '@/components/Loading'
import axios from 'axios'
import React from 'react'
import { useState, useEffect } from 'react'
import { leftArrow } from '@/utility/imports'
import "../app/styles/myOrder.css"
import Link from 'next/link'

const MyorderScreen = () => {

  const [myOrder, setMyOrder] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/myorder/myOrderRoute")
        const data = response.data
        setMyOrder(data)
        setLoading(false)
        console.log("getdata", data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, [])

  if(loading){
    return(
      <p><Loading/></p>
    )
  }

  if(!myOrder || myOrder.length === 0){
    return(
      <div className="NoOrderDiv">
        <h1>No Orders</h1>
      </div>
    )
  }

  return (
    <div className='MyOrderContainer'>
      <h1>My Orders</h1>

      <button></button>

      {myOrder.map((item, index) => (

        <div key={index} className="orderMainDiv">
          <Link href="HomeScreen" ><img className="cartbackbtn" src={leftArrow.src} alt="leftArrow" /> </Link>
          <div className='ItemDiv'>
            <h2>Items</h2>
            <ul>
              {item.orderItems.map((item, itemIndex) => (
                <li key={itemIndex}>
                  <p> <b>Name:</b> {item.name}</p>
                  <p> <b>Size:</b> {item.size}</p>
                  <p> <b>Price:</b>  {item.price}</p>
                </li>
              ))}
            </ul>
          </div>
          <div >
            <h2>Address</h2>
            <div className='fullAddress'>
              <span> <b>Street:</b> {item.fullAddress.street}</span>
              <span><b>City:</b> {item.fullAddress.City}</span>
              <span> <b>Country:</b> {item.fullAddress.Country}</span>
              <span> <b>PinCode:</b> {item.fullAddress.pinCode}</span>
            </div>
          </div>
          <div>
            <h2>Order Info</h2>
            <div className='OrderInfo'>
            <span><b>Total Amount:</b> {item.orderAmount}</span>
            <span><b>Date:</b> {item.updatedAt.substring(0, 10)}</span>
            <span><b>Transaction Id:</b> {item.transactionId}</span>
            <span><b>Order Id:</b> {item._id}</span>
            </div>
          </div>
        </div>

      ))}
    </div>
  )
}

export default MyorderScreen;