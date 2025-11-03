import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [cartItems, setCartItems] = useState({});
  const [food_list, setFoodList] = useState([]);
  const [loading, setLoading] = useState(true);
  const url = "https://tomato-backend-3hdl.onrender.com";
  const [token, setToken] = useState(localStorage.getItem("token") || "");

  // ✅ Load cart from localStorage if no token (user not logged in)
  useEffect(() => {
    if (!token) {
      const savedCart = localStorage.getItem("cartItems");
      if (savedCart) {
        setCartItems(JSON.parse(savedCart)); // Restore cart from localStorage
      }
    }
  }, []);

  // ✅ Save cart to localStorage when cart changes (only for guest users)
  useEffect(() => {
    if (!token) {
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
    }
  }, [cartItems]);

  const addToCart = async (itemId) => {
    setCartItems((prev) => {
      const newCart = { ...prev, [itemId]: (prev[itemId] || 0) + 1 };
      if (!token) localStorage.setItem("cartItems", JSON.stringify(newCart)); // Save for guests
      return newCart;
    });

    if (token) {
      try {
        const response = await axios.post(
          url + "/api/cart/add",
          { itemId },
          { headers: { token } }
        );
        if (response.data.success) {
          toast.success("Item Added to Cart");
        } else {
          toast.error("Something went wrong");
        }
      } catch (error) {
        toast.error("Error adding item to cart");
      }
    }
  };

  const removeFromCart = async (itemId) => {
    setCartItems((prev) => {
      const newCart = { ...prev };
      if (newCart[itemId] > 1) {
        newCart[itemId] -= 1;
      } else {
        delete newCart[itemId]; // Remove item if count is 0
      }
      if (!token) localStorage.setItem("cartItems", JSON.stringify(newCart)); // Save for guests
      return newCart;
    });

    if (token) {
      try {
        const response = await axios.post(
          url + "/api/cart/remove",
          { itemId },
          { headers: { token } }
        );
        if (response.data.success) {
          toast.success("Item Removed from Cart");
        } else {
          toast.error("Something went wrong");
        }
      } catch (error) {
        toast.error("Error removing item from cart");
      }
    }
  };

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    if (!food_list.length) return totalAmount;
    for (const item in cartItems) {
      const itemInfo = food_list.find((product) => product._id === item);
      if (itemInfo) {
        totalAmount += itemInfo.price * cartItems[item];
      }
    }
    return totalAmount;
  };

  const fetchFoodList = async () => {
    try {
      const response = await axios.get(url + "/api/food/list");
      if (response.data.success) {
        setFoodList(response.data.data);
      } else {
        toast.error("Failed to fetch food items");
      }
    } catch (error) {
      toast.error("Error fetching food list");
    } finally {
      setLoading(false);
    }
  };

  const loadCartData = async (token) => {
    try {
      const response = await axios.post(url + "/api/cart/get", {}, { headers: { token } });
      setCartItems(response.data.cartData || {});
    } catch (error) {
      toast.error("Error loading cart data");
    }
  };

  useEffect(() => {
    async function loadData() {
      await fetchFoodList();
      if (token) {
        await loadCartData(token);
      }
    }
    loadData();
  }, [token]);

  const contextValue = {
    food_list,
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    url,
    token,
    setToken,
    loading,
  };

  return <StoreContext.Provider value={contextValue}>{props.children}</StoreContext.Provider>;
};

export default StoreContextProvider;
