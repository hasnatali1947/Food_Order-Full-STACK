import Link from "next/link";
import "../app/styles/cart.css"
import React from "react";
import { leftArrow, dustban } from "@/utility/imports";
import { useStateContext } from "../context/context";
import Checkout from "@/components/PayNow";
{/* <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300&display=swap" rel="stylesheet"></link> */}

const Cart = () => {
  const { cart, setCart, removeFromCart } = useStateContext();
  const totalCartPrice = cart.reduce((total, selectedPizza) => total + selectedPizza.price, 0);

  const changeQuantity = (selectedPizza, newSize, newQuantity) => {
    if (newQuantity >= 1) {

      selectedPizza.size = newSize;
      selectedPizza.Quantity = newQuantity;
      selectedPizza.price = selectedPizza.prices[0][newSize] * newQuantity;

      const updatedCart = cart.map((item) => {
        if (item._id === selectedPizza._id) {
          return selectedPizza;
        }
        return item;
      });
      setCart(updatedCart);
    };
  }

  return (
    <div className="cartContainer">
      <Link href="HomeScreen" ><img className="cartbackbtn" src={leftArrow.src} alt="leftArrow" /> </Link>
      <div className="cartHeading">

        <h2>My Cart</h2>
        <div>

        <div>
        </div>
        <div className="SubTotal-PayNow">
          <h2>SubTotal: {totalCartPrice}</h2>
          <Checkout subTotal={totalCartPrice} />
        </div>
        </div>
      </div>
      <ul className="cartItemsMain">
        {cart.map((selectedPizza, index) => (
          <ul key={index} className="cartItems">
            <div>
              <div className="cartNameNdSize">
                <li>
                  {selectedPizza.name}
                </li>
                <li>
                  [{selectedPizza.size}]
                </li>
              </div>
              <li className="cartPrices">
                Category: {selectedPizza.category}
              </li>
              <li className="cartPrices">
                Prices: {selectedPizza.Quantity} * {selectedPizza.prices[0][selectedPizza.size]} = {selectedPizza.price}
              </li>
              <li className="Cartquantitymain">
                Quantity:
                <li className="CartquantityDiv">
                  <span className="subQuantity" onClick={() => changeQuantity(selectedPizza, selectedPizza.size, selectedPizza.Quantity - 1)} >-</span>
                  {selectedPizza.Quantity}{" "}
                  <span className="addQuantity" onClick={() => changeQuantity(selectedPizza, selectedPizza.size, selectedPizza.Quantity + 1)}>+</span>
                </li>
              </li>
            </div>
            <div className="cartImg-cross">
              <img className="cartPizzaImage" src={selectedPizza.image} alt="pizzaImage" />
              <img className="cartDustban" onClick={() => removeFromCart(index)} src={dustban.src} />
            </div>
          </ul>
        ))}
      </ul>
    </div>
  );
};

export default Cart;
