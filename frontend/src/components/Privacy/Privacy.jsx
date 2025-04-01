import React from 'react';
import './Privacy.css';  // Import the CSS file for styling

const PrivacyPolicy = () => {
  return (
    <div className="privacy-policy-container">
      <main className="privacy-policy-content">
        <h1>Privacy Policy</h1>
        <section>
          <h2>Introduction</h2>
          <p>
            We value your privacy and are committed to protecting the personal information you share with us.
            This Privacy Policy explains how we collect, use, and protect your personal data.
          </p>
        </section>

        <section>
          <h2>Information We Collect</h2>
          <p>
            We collect personal information such as your name, email address, and usage data when you interact with our website.
          </p>
        </section>

        <section>
          <h2>How We Use Your Information</h2>
          <p>
            We use the information we collect to improve our services, send updates, and respond to your inquiries.
          </p>
        </section>

        <section>
          <h2>Cookies</h2>
          <p>
            We use cookies to enhance your experience on our website. You can manage cookie settings in your browser.
          </p>
        </section>

        <section>
          <h2>Your Rights</h2>
          <p>
            You have the right to access, modify, or delete your personal data. Contact us if you have any questions.
          </p>
        </section>

        <section>
          <h2>Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy, feel free to <a href="mailto:contact@website.com">contact us</a>.
          </p>
        </section>
      </main>

      <footer>
        <p>© 2025 @ Tomato.com </p>
      </footer>
    </div>
  );
};

export default PrivacyPolicy;
