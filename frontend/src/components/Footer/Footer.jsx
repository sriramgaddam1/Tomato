import React from "react";
import "./Footer.css";
import { assets } from "../../assets/frontend_assets/assets";
import About from "../About/About.jsx";

const Footer = () => {
  return (
    <div className="footer" id="footer">
      <div className="footer-content">
        <div className="footer-content-left">
          <img width={250} src={assets.logo} alt="" />
          <p>
            Crave it, get it! Enjoy fresh, quality meals delivered fast to your doorstep. From local favorites to global cuisines—order now for a hassle-free dining experience!
          </p>
          <div className="footer-social-icons">
            <img src={assets.facebook_icon} alt="" />
            <img src={assets.twitter_icon} alt="" />
            <img src={assets.linkedin_icon} alt="" />
          </div>
        </div>
        <div className="footer-content-center">
          <h2>Company</h2>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/about">About Us</a></li>
            <li><a href="/privacy">Privacy Policy</a></li>
            <li><a href="/help">Help</a></li>
          </ul>

        </div>
        <div className="footer-content-right">
          <h2>Get in touch</h2>
          <ul>
            <li>+92-308-4900522</li>
            <li>contact@tomato.com</li>
          </ul>
        </div>
      </div>
      <hr />
      <p className="footer-copyright">
        Copyright 2025 @ Tomato.com - All Right Reserved.
      </p>
    </div>
  );
};

export default Footer;
