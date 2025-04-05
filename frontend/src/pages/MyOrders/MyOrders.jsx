import React, { useContext, useEffect, useState } from "react";
import "./MyOrders.css";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";
import { assets } from "../../assets/frontend_assets/assets";

const MyOrders = () => {
  const { url, token } = useContext(StoreContext);
  const [data, setData] = useState([]);

  const fetchOrders = async () => {
    const response = await axios.post(
      url + "/api/order/userorders",
      {},
      { headers: { token } }
    );
    if (response.data.success) {
      setData(response.data.data);
    }
  };

  useEffect(() => {
    if (token) {
      fetchOrders();
    }
  }, [token]);

  return (
    <div className="my-orders">
  <video autoPlay loop muted className="background-video">
    <source src="orders.webm" type="video/mp4" />
    Your browser does not support the video tag.
  </video>

  <div className="content">
    <h2>Your Orders</h2>
    <div className="container">
      <div className="scrollable-orders">
        {data.map((order, index) => (
          <div key={index} className="my-orders-order">
            <img src={assets.parcel_icon} alt="" />
            <p>
              {order.items.map((item, idx) =>
                idx === order.items.length - 1
                  ? `${item.name} x ${item.quantity}`
                  : `${item.name} x ${item.quantity}, `
              )}
            </p>
            <p>${order.amount}.00</p>
            <p>items: {order.items.length}</p>
            <p>
              <span>&#x25cf;</span>
              <b> {order.status}</b>
            </p>
            <button onClick={fetchOrders}>⬅️ Order Status</button>
          </div>
        ))}
      </div>
    </div>
  </div>
</div>

  );
};

export default MyOrders;
