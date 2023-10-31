import axios from 'axios'
import React from 'react'
import StripeCheckout from 'react-stripe-checkout'

export default function Checkout({ subTotal }) {

  // const currentUser = getState().userData

  const tokenHandler = async (token) => {
    try {

      const response = await axios.post("http://localhost:5000/api/order/orderRoute", { token, subTotal })
      const data = response.data
      console.log("orderData :", data);

      if (response.status === 200) {
        console.log("payment SuccessFully");
      } else {
        console.log("payment failed");
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div>
      <StripeCheckout
        amount={subTotal * 100}
        shippingAddress
        stripeKey='pk_test_51O6bQ9GaFip5Wq2G5iswiMNb4mXHI4dPCEjaHDI55WYcFsvMXAp0FyswpQ5u6qSr3tvTDjsFPlXZ8Giu6qOaXGCU00rXVtAm3p'
        currency='INR'
        token={tokenHandler}
      >
        <button className="PAY-NOW">PAY NOW</button>
      </StripeCheckout>
    </div>
  )
}
