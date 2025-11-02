import React, { useRef } from "react";
import "./ExploreMenu.css";
import { menu_list } from "../../assets/frontend_assets/assets";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa"; // Import arrow icons

const ExploreMenu = ({ category, setCategory }) => {
  const menuRef = useRef(null);

  const scrollLeft = () => {
    if (menuRef.current) {
      menuRef.current.scrollLeft -= 200; // Scroll left by 200px
    }
  };

  const scrollRight = () => {
    if (menuRef.current) {
      menuRef.current.scrollLeft += 200; // Scroll right by 200px
    }
  };

  return (
    <div className="explore-menu" id="explore-menu">
      <h1>Explore our menu</h1>
      <p className="explore-menu-text">
        Choose from a diverse menu featuring a detectable array of dishes. Our
        mission is to satisfy your cravings and elevate your dining experience,
        one delicious meal at a time.
      </p>

      {/* Scrollable Menu Section */}
      <div className="explore-menu-container">
        <button className="scroll-btn left" onClick={scrollLeft}>
          <FaChevronLeft />
        </button>

        <div className="explore-menu-list" ref={menuRef}>
          {menu_list.map((item, index) => (
            <div 
              onClick={() => setCategory(prev => prev === item.menu_name ? "All" : item.menu_name)} 
              key={index} 
              className="explore-menu-list-item">        
              <img 
                className={category === item.menu_name ? "active" : ""} 
                src={item.menu_image} 
                alt={item.menu_name} 
              />
              <p>{item.menu_name}</p>
            </div>
            
          ))}
          
        </div>

        <button className="scroll-btn right" onClick={scrollRight}>
          <FaChevronRight />
        </button>
      </div>

      <hr />
    </div>
  );
};

export default ExploreMenu;
