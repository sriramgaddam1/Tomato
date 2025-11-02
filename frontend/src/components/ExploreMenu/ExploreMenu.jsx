import React, { useRef } from "react";
import "./ExploreMenu.css";
import { menu_list } from "../../assets/frontend_assets/assets";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const ExploreMenu = ({ category, setCategory }) => {
  const menuRef = useRef(null);

  const scrollLeft = () => {
    if (menuRef.current) menuRef.current.scrollLeft -= 200;
  };

  const scrollRight = () => {
    if (menuRef.current) menuRef.current.scrollLeft += 200;
  };

  return (
    <div className="explore-menu" id="explore-menu">
      <h1>Explore our menu</h1>
      <p className="explore-menu-text">
        Choose from a diverse menu featuring a delectable array of dishes. Our
        mission is to satisfy your cravings and elevate your dining experience.
      </p>

      <div className="explore-menu-container">
        <button className="scroll-btn left" onClick={scrollLeft}>
          <FaChevronLeft />
        </button>

        <div className="explore-menu-list" ref={menuRef}>
          {menu_list.map((item, index) => (
            <div
              key={index}
              className="explore-menu-list-item"
              onClick={() =>
                setCategory((prev) =>
                  prev === item.menu_name ? "All" : item.menu_name
                )
              }
            >
              <img
                src={item.menu_image}
                alt={item.menu_name}
                className={category === item.menu_name ? "active" : ""}
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
