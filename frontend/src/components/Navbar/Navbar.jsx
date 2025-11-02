import React, { useContext, useState, useEffect } from "react";
import "./Navbar.css";
import { assets } from "../../assets/frontend_assets/assets";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";
import { toast } from "react-toastify";

const Navbar = ({ setShowLogin }) => {
  const { cartItems, token, setToken } = useContext(StoreContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [menu, setMenu] = useState("");

  useEffect(() => {
    const path = location.pathname;
    if (path === "/") setMenu("home");
    else if (path === "/about") setMenu("About Us");
    else if (path === "/cart") setMenu("cart");
    else if (path === "/help") setMenu("help");
  }, [location.pathname]);

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    toast.success("Logout Successfully");
    navigate("/");
  };

  // ✅ Calculate total items in cart
  const totalCartItems = Object.values(cartItems).reduce((sum, qty) => sum + qty, 0);

  return (
    <div className="navbar">
      <Link to="/">
        <img src={assets.logo1.png} alt="Logo" className="logo" />
      </Link>

      <ul className="navbar-menu">
        <Link to="/" className={menu === "home" ? "active" : ""}>Home</Link>
        <Link to="/about" className={menu === "About Us" ? "active" : ""}>About Us</Link>
        <Link to="/help" className={menu === "help" ? "active" : ""}>Help</Link>
        <Link to ="/chatbot" className={menu === "chatbot" ? "active" : ""}>Chatbot</Link>
      </ul>

      <div className="navbar-right">
        <div className="navbar-search-icon">
          <Link to="/cart" className="cart-icon">
            <img src={assets.cart_icon} alt="Cart" />
            {totalCartItems > 0 && <span className="cart-badge">{totalCartItems}</span>}
          </Link>
        </div>

        {!token ? (
          <button onClick={() => setShowLogin(true)}>Sign In</button>
        ) : (
          <div className="navbar-profile">
            <img src={assets.profile_icon} alt="Profile" />
            <ul className="nav-profile-dropdown">
              <li onClick={() => navigate("/myorders")}>
                <img src={assets.orders_icon} alt="Orders" />
                <p>Orders</p>
              </li>
              <hr />
              <li onClick={logout}>
                <img src={assets.logout_icon} alt="Logout" />
                <p>Logout</p>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
