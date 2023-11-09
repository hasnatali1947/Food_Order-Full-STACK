"use client"
import Pizza from "../components/Pizza";
import { useStateContext } from "../context/context";
import Link from "next/link";
import "../app/styles/homePage.css"
import Loading from "@/components/Loading";
import { useEffect, useState } from "react";
import { dropDown } from "@/utility/imports";
import { image1, image2, image3, image4 } from "@/utility/imports";
import Slider from "@/components/slider";

const HomeScreen = () => {
  const { pizzaData, cart } = useStateContext();
  const [userData, setUserData] = useState(null);
  const [isOpen, setIsopen] = useState(false)


  const data = [
    image1.src, image2.src, image3.src, image4.src
  ];

  const DropDown = () => {
    setIsopen(!isOpen)
  }

  const logOut = () => {
    const confirmLogOut = window.confirm("Are you sure you want to log out?")
    if (confirmLogOut) {
      localStorage.removeItem("userData");
      localStorage.removeItem("cartData");
      window.location.href = "/login";
    }
  };

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("userData"));
    setUserData(userData);
  }, []);

  if (!pizzaData || pizzaData.length === 0) {
    return (
      <div>
        <p> <Loading /></p>
      </div>
    );
  }

  const buttonClass = isOpen ? 'dropbtn' : 'notDrop';
  const DropDownIcon = isOpen ? 'openDropDownIcon' : 'NotopenDropDownIcon';

  return (
    <div>
      <header>
        <nav>
          <h2>Pizza_House</h2>
          <ul>
            <a href="/Admin_Panel"><li className="AdminPanel-onNav">AdminPanel</li></a>
            <div class="dropdown">
              {userData ? (
                <ul>
                  <li className={buttonClass} onClick={DropDown}>{userData.name}</li>
                  <li><img className={DropDownIcon} src={dropDown.src} /> </li>
                </ul>
              ) : (
                <Link href="/login">
                  <li className="AdminPanel-onNav">Login</li>
                </Link>
              )}
              {
                isOpen && (
                  <div class="dropdown-content">
                    <Link href="/myorder">My Orders</Link>
                    <a onClick={logOut}>LogOut</a>
                  </div>
                )}
            </div>
            <Link href="/cart">
              <div className="cartandCountDiv">
                <li className="AdminPanel-onNav">Cart</li>
                <span className="cartsCount">{cart.length}</span>
              </div>
            </Link>
          </ul>
        </nav>
      </header>

      <div className="homePageContainer">

          <Slider slidess={data} />

        <div className="pizzaContainer" id="pizzaContainer">
          {pizzaData.map((pizza, index) => (
            <div className="displayPizzas" key={index}>
              <Pizza pizza={pizza} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomeScreen;
