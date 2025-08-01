import React from "react";
import "./ExploreMenu.css";
import { menu_list } from "../../assets/assets";

const ExploreMenu = ({ category, setCategory }) => {
  return (
    <div className="explore-menu" id="explore-menu">
      <h1>Scroll. Drool. Order.</h1>
      <p className="explore-menu-text">
        Get ready to treat your taste buds! Our menu is packed with irresistible
        flavors, from crispy starters to comforting mains and indulgent
        desserts. Whether you're in the mood for something spicy, cheesy, or
        sweet, we've got just the thing to make you drool. Go ahead—scroll
        through, pick your cravings, and let us handle the rest!
      </p>
      <div className="explore-menu-list">
        {menu_list.map((item, index) => {
          return (
            <div
              onClick={() =>
                setCategory((prev) =>
                  prev === item.menu_name ? "All" : item.menu_name
                )
              }
              key={index}
              className="explore-menu-list-item"
            >
              <img
                className={category === item.menu_name ? "active" : ""}
                src={item.menu_image}
                alt={item.menu_name}
              />
              <p>{item.menu_name}</p>
            </div>
          );
        })}
      </div>
      <hr></hr>
    </div>
  );
};

export default ExploreMenu;
