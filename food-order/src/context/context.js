"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios"
const Context = createContext();

export const StateContext = ({ children }) => {

    const [pizzaData, setPizzaData] = useState([]);
    const initialCartData = JSON.parse(localStorage.getItem("cartData")) || [];
    const [cart, setCart] = useState(initialCartData);

    useEffect(() => {
        localStorage.setItem("cartData", JSON.stringify(cart));
    },[cart])
    const removeFromCart = (index) => {
        const updatedCart = [...cart];
        updatedCart.splice(index, 1);
        setCart(updatedCart);
    }

    useEffect(() => {
        async function fetchPizzaData() {
            const response = await axios.get("http://localhost:5000/api/pizzas/getallpizzas");
            const pizzas = response.data;            
            setPizzaData(pizzas);
            console.log("fetching pizzas", pizzas);
        }

        fetchPizzaData();
    }, []);

    return (
        <Context.Provider
            value={{
                pizzaData,
                cart,
                setCart,
                removeFromCart,
            }}
        >
            {children}
        </Context.Provider>
    );
};

export const useStateContext = () => useContext(Context);