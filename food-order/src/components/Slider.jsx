"use client";

import { useEffect, useState } from "react";
import "../app/styles/homePage.css"

export default function Slider({ slidess }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  console.log("slidess: ", slidess);

  const goLeft = () => {
    setTimeout(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === 0 ? slidess.length - 1 : prevIndex - 1
      );
    }, 200);
  };

  const goRight = () => {
    setTimeout(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === slidess.length - 1 ? 0 : prevIndex + 1
      );
    }, 200);
  };


  useEffect(() => {
    const interval = setInterval(goRight, 4000);
    return () => clearInterval(interval);
  }, [currentImageIndex]);

  return (
    <div className="sliderContainer">
      <p className="left" onClick={goLeft}>&#8592;</p>
      <img
        className='sliderImgs'
        src={slidess[currentImageIndex]}
        alt={`Image ${currentImageIndex + 1}`}
      />
      <a className="pizza-button" href="#pizzaContainer">
        Order Now
      </a>

      <p className="right" onClick={goRight}>&#8594;</p>
        <div className="slider-indicators">
       
          {slidess.map((image, index) => (
            <span
              key={index}
              className={currentImageIndex === index ? "active" : ""}
              onClick={() => setCurrentImageIndex(index)}
            ></span>
          ))}
      </div>
    </div>
  )
}