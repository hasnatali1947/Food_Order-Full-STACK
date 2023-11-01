import Pizza from "../components/Pizza";
import { useStateContext } from "../context/context";
import Link from "next/link";
import Loading from "@/components/Loading";
import { useEffect, useState } from "react";
import { dropDown } from "@/utility/imports";

const HomeScreen = () => {
  const { pizzaData, cart } = useStateContext();
  const [userData, setUserData] = useState(null);
  const [isOpen, setIsopen] = useState(false)

  const DropDown = () => {
    setIsopen(!isOpen)
  }

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
            <div class="dropdown">
              {userData ? (
                <ul className={buttonClass}>
                <li className="nameBtn" onClick={DropDown}>{userData.name}</li>
                <li><img className={DropDownIcon} src={dropDown.src}/> </li>
                </ul>
              ) : (
                <Link href="/login">
                  <li>Login</li>
                </Link>
              )}
              {
                isOpen && (
                  <div class="dropdown-content">
                    <Link href="/myorder">Orders</Link>
                    <a href="#">LogOut</a>
                  </div>
                )}
            </div>
            <li>
              <Link href="/cart">Cart</Link> <span className="cartsCount">{cart.length}</span>
            </li>
          </ul>
        </nav>
      </header>
      <div className="homePageContainer">
        <div className="pizzaContainer">
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
