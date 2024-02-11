"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios"
const Context = createContext();

export const StateContext = ({ children }) => {

    const [pizzaData, setPizzaData] = useState([]);
    const [cart, setCart] = useState([]);
    const [apiData, setApiData] = useState()

    console.log("apiData", apiData);

    const UserLogin = async (userData) => {
        console.log("user login check : ");
        try {
          const response = await axios.post("https://foodorder-backend.onrender.com/api/user/login", userData)
          console.log("user login : ", response);
          setApiData(response)
          console.log("user login : ", response);
          return response;
        } catch (error) {
            console.error("Login failed", error);
            console.log("error  ::");
            return error.response;
        }
      }

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem('cartData'))
        if (data) {
            setCart(data)
        }
    }, []);

    const removeFromCart = (index) => {
        const updatedCart = [...cart];
        updatedCart.splice(index, 1);
        setCart(updatedCart);
        localStorage.setItem('cartData', JSON.stringify(updatedCart));
    }

    useEffect(() => {
        async function fetchPizzaData() {
            const response = await axios.get("https://foodorder-backend.onrender.com/api/pizzas/getallpizzas");
            const pizzas = response.data;
            setPizzaData(pizzas);
            // console.log("fetching pizzas", pizzas);
        }

        fetchPizzaData();
    }, []);

    return (
        <Context.Provider
            value={{
                pizzaData,
                setPizzaData,
                cart,
                setCart,
                removeFromCart,
                apiData,
                setApiData,
                UserLogin
            }}
        >
            {children}
        </Context.Provider>
    );
};

export const useStateContext = () => useContext(Context);