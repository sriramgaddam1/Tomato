import React from 'react';
import './Help.css';  // Link to the external CSS file for styling

const HelpPage = () => {
  return (
    <div className="help-page-container">
      <main className="help-page-content">
        <h1>Help & Support</h1>
        <section>
          <h2>Frequently Asked Questions (FAQs)</h2>
          <div className="faq">
            <h3>How do I create an account?</h3>
            <p>To create an account, click on the "Sign Up" button in the top right corner of the homepage. Fill out the registration form and submit.</p>
          </div>

          <div className="faq">
            <h3>How do I reset my password?</h3>
            <p>If you've forgotten your password, click on the "Forgot Password?" link on the login page. Follow the instructions to reset your password.</p>
          </div>

          <div className="faq">
            <h3>Can I delete my account?</h3>
            <p>Yes, you can delete your account by contacting our support team. Please note that this action is irreversible.</p>
          </div>
        </section>

        <section>
          <h2>Contact Support</h2>
          <p>If you need further assistance, please don't hesitate to reach out to our support team:</p>
          <p>Email us at: <a href="mailto:contact@tomato.com">contact@tomato.com</a></p>
        </section>
      </main>

      <footer>
        <p>© 2025 @ Tomato.com</p>
      </footer>
    </div>
  );
};

export default HelpPage;
