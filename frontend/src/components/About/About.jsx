import React from "react";
import "./About.css"; // Import CSS file

const About = () => {
  return (
    <div className="container">
      <video autoPlay loop muted className="header-video">
        <source src="about.webm" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      
      {/* About Us Section */}
      <section className="about-section">
        <h2>About Us</h2>
        <div className="about-content">
        <p>
          At <strong>Tomato</strong>, we believe that great food should be just a click away.
          Our mission is to bring your favorite meals from the best restaurants straight to your
          doorstep—fast, fresh, and hassle-free.
        </p>
        </div>

        <div className="features">
          <div className="feature-box">
            <h3>Fast Delivery</h3>
            <p>We ensure quick delivery so your food arrives hot and fresh.</p>
          </div>
          <div className="feature-box">
            <h3>Best Restaurants</h3>
            <p>We partner with top restaurants to bring you delicious meals.</p>
          </div>
          <div className="feature-box">
            <h3>Customer Satisfaction</h3>
            <p>Your happiness is our priority. We strive for the best service.</p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      {/* <section className="cta-section">
        <h2>Hungry? Order Now!</h2>
        <p>Enjoy the best food from the top restaurants in your city.</p>
        <a href="/" className="cta-button">View Menu</a>
      </section> */}
    </div>
  );
};

export default About;
