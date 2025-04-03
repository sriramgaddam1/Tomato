import React, { useContext } from "react";
import "./FoodDisplay.css";
import { StoreContext } from "../../context/StoreContext";
import FoodItem from "../FoodItem/FoodItem";

const FoodDisplay = ({ category }) => {
  const { food_list } = useContext(StoreContext);

  // Filter the food list based on the selected category
  const filteredList = food_list.filter(
    (item) => category === "All" || item.category === category
  );

  return (
    <div className="food-display" id="food-display">
      <h2>Top dishes near you</h2>
      <div className="food-display-list">
        {filteredList.length > 0 ? (
          filteredList.map((item) => (
            <FoodItem
              key={item._id}
              id={item._id}
              name={item.name}
              description={item.description}
              price={item.price}
              image={item.image}
            />
          ))
        ) : (
          <div className="no-items-container">
            <img className="no-item-img" src="noitems.avif" alt="No items found" />
            <p className="no-items-found">⚠️Oops! This food item is currently unavailable</p>
          </div>
        )}

      </div>
    </div>
  );
};

export default FoodDisplay;
