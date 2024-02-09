"use client"
import Pizza from "../components/Pizza";
import { useStateContext } from "../context/context";
import Link from "next/link";
import "../app/styles/homePage.css"
import { useEffect, useState } from "react";
import { image1, image2, image3, image4, dropDown, mobMenu, PagenationArrow } from "@/utility/imports";
import Slider from "../components/slider";
import Image from "next/image";

const HomeScreen = () => {
  const { pizzaData, cart } = useStateContext();
  const [userData, setUserData] = useState(null);
  const [isOpen, setIsopen] = useState(false)
  const [mobMenuDisplay, setmobMenuDisplay] = useState(false)
  const [filterPizza, setFilterPizza] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [pizzaPerPage] = useState(6)

  const filteredPizza = pizzaData.filter(pizzas =>
    pizzas.name.toLowerCase().includes(filterPizza.toLowerCase())
  );

  const indexOfLastPizza = currentPage * pizzaPerPage;
  const indexofFirstPizza = indexOfLastPizza - pizzaPerPage
  const currentPizzas = filteredPizza.slice(indexofFirstPizza, indexOfLastPizza)

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

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
      localStorage.removeItem("adminLogin");
      window.location.href = "/login";
    }
  };

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("userData"));
    setUserData(userData);
  }, []);

  if (!pizzaData || pizzaData.length === 0) {
    return (
      <div className="loadingDiv">
        <p>Loading...</p>
      </div>
    );
  }

  const HandlemobMenu = () => {
    setmobMenuDisplay(!mobMenuDisplay)
  }

  const ExitMobMenu = () => {
    setmobMenuDisplay(false)
  }

  const buttonClass = isOpen ? 'dropbtn' : 'notDrop';
  const DropDownIcon = isOpen ? 'openDropDownIcon' : 'NotopenDropDownIcon';



  return (
    <div>
      <header>
        <nav>
          <h2>Pizza_House</h2>
          <Image className='mobMenu' width={18} height={18} onClick={HandlemobMenu} src={mobMenu.src} alt="mobMenu" />
          <ul>
            <a href="/Admin_Panel"><li className="AdminPanel-onNav">AdminPanel</li></a>
            <div class="dropdown">
              {userData ? (
                <ul>
                  <li className={buttonClass} onClick={DropDown}>{userData.name}</li>
                  <li><Image className={DropDownIcon} width={18} height={18} src={dropDown.src} alt="DropDown" /> </li>
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

          {mobMenuDisplay ?
            <ul className="mobMenuOpen">
              <li className='X' onClick={ExitMobMenu}>+</li>
              <a href="/Admin_Panel"><li className="AdminPanel-onNav">Go To AdminPanel</li></a>
              <Link href="/myorder">My Orders</Link>
              <Link href="/cart">
                <div className="cartandCountDiv">
                  <li className="AdminPanel-onNav">Cart</li>
                  <span className="cartsCount">{cart.length}</span>
                </div>
              </Link>
              <a onClick={logOut}>LogOut</a>
            </ul>
            : ""}
        </nav>
      </header>

      <div className="homePageContainer">

        <Slider slidess={data} />
        <input className="FilterInput" onChange={(e) => { setFilterPizza(e.target.value) }} placeholder="searchPizzas" />

        {filterPizza.length === pizzaData.name ?
          <div>
            {displayPizzas}
          </div>
          :
          <div className="pizzaContainer" id="pizzaContainer">

            {currentPizzas.map((pizza, index) => (
              <div className="displayPizzas" key={index}>
                <Pizza pizza={pizza} />
              </div>
            ))}

          </div>
        }
      </div>
      <div className="pagenationDiv">
        <div className="pagenationcontainer">
          <img className="pagenationLeftArrow" onClick={() => {
            if (currentPage > 1) {
              paginate(currentPage - 1);
            }
          }} src={PagenationArrow.src} />
          {Array.from({ length: Math.ceil(filteredPizza.length / pizzaPerPage) }, (_, i) => (
            <p
              className={`pagenationPgNo ${currentPage === i + 1 ? 'activePage' : ''}`}
              key={i}
              onClick={() => paginate(i + 1)}
            >
              {i + 1}
            </p>
          ))}
          <img className="pagenationRightArrow" onClick={() => {
            if (currentPage < Math.ceil(filteredPizza.length / pizzaPerPage)) {
              paginate(currentPage + 1);
            }
          }} src={PagenationArrow.src} />
        </div>
      </div>
    </div>
  );
};

export default HomeScreen;
