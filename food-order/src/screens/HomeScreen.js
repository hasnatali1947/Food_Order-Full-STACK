import Pizza from "../components/Pizza";
import { useStateContext } from "../context/context";
import Link from "next/link";

const HomeScreen = () => {

  const { pizzaData, cart} = useStateContext()


  if (!pizzaData || pizzaData.length === 0) {
    return (
      <div>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div>
      <header>
        <nav>
          <h2>Pizza_House</h2>
          <ul>
            <li>login</li>
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