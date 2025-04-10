import React, { useState, useEffect, useContext } from "react";
import "./Add.css";
import { assets } from "../../assets/assets";
import axios from "axios";
import { toast } from "react-toastify";
import { StoreContext } from "../../context/StoreContext";
import { useNavigate } from "react-router-dom";

const Add = ({ url }) => {
  const navigate = useNavigate();
  const { token, admin } = useContext(StoreContext);

  const [image, setImage] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [data, setData] = useState({
    name: "",
    description: "",
    price: "",
    category: "Salad",
  });

  useEffect(() => {
    if (!admin && !token) {
      toast.error("Please Login First");
      navigate("/");
    }
  }, []);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    setImage(file);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "tomato_preset");

    try {
      const res = await fetch("https://api.cloudinary.com/v1_1/ddlujhqlj/image/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      setImageUrl(data.secure_url);
      toast.success("Image uploaded successfully");
    } catch (err) {
      toast.error("Image upload failed");
      console.error(err);
    }
  };

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    // ✅ Manual check for required image
    if (!image) {
      toast.error("Please upload an image");
      return;
    }

    try {
      // 1. Upload image to Cloudinary
      const formDataImage = new FormData();
      formDataImage.append("file", image);
      formDataImage.append("upload_preset", "tomato_preset");

      const cloudinaryRes = await axios.post(
        "https://api.cloudinary.com/v1_1/ddlujhqlj/image/upload",
        formDataImage
      );

      const imageUrl = cloudinaryRes.data.secure_url;

      // 2. Send food data to backend
      const foodData = {
        name: data.name,
        description: data.description,
        price: Number(data.price),
        category: data.category,
        image: imageUrl,
      };

      const response = await axios.post(`${url}/api/food/add`, foodData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });

      if (response.data.success) {
        setData({
          name: "",
          description: "",
          price: "",
          category: "Salad",
        });
        setImage(false);
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }

    } catch (error) {
      toast.error("Something went wrong while uploading");
      console.error("Upload error:", error.response?.data || error.message);
    }
  };

  return (
    <div className="add">
      <video autoPlay loop muted className="container-video">
        <source src="admin.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <form onSubmit={onSubmitHandler} className="flex-col">
        <div className="add-img-upload flex-col">
          <p>Upload image</p>
          <label htmlFor="image">
            <img
              src={image ? URL.createObjectURL(image) : assets.upload_area}
              alt=""
            />
          </label>
          <input
            onChange={handleImageUpload}
            type="file"
            id="image"
            name="image"
            accept="image/*"
            hidden // ✅ Keep hidden
          />
        </div>

        <div className="add-product-name flex-col">
          <p>Product name</p>
          <input
            onChange={onChangeHandler}
            value={data.name}
            type="text"
            name="name"
            placeholder="Type here"
            required
          />
        </div>

        <div className="add-product-description flex-col">
          <p>Product description</p>
          <textarea
            onChange={onChangeHandler}
            value={data.description}
            name="description"
            rows="6"
            placeholder="Write content here"
            required
          ></textarea>
        </div>

        <div className="add-category-price">
          <div className="add-category flex-col">
            <p>Product category</p>
            <select
              name="category"
              required
              onChange={onChangeHandler}
              value={data.category}
            >
              <option value="Salad">Salad</option>
              <option value="Rolls">Rolls</option>
              <option value="Deserts">Deserts</option>
              <option value="Sandwich">Sandwich</option>
              <option value="Cake">Cake</option>
              <option value="Pure Veg">Pure Veg</option>
              <option value="Pasta">Pasta</option>
              <option value="Noodles">Noodles</option>
              <option value="Non Veg">Non Veg</option>
            </select>
          </div>

          <div className="add-price flex-col">
            <p>Product price</p>
            <input
              onChange={onChangeHandler}
              value={data.price}
              type="number"
              name="price"
              placeholder="$20"
              required
            />
          </div>
        </div>

        <button type="submit" className="add-btn">
          ADD
        </button>
      </form>
    </div>
  );
};

export default Add;
