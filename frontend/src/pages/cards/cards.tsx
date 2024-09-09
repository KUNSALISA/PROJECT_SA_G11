import React from 'react';
import { Link } from 'react-router-dom';
import './cards.css'; // Import the CSS file

const YourComponent = () => {
  return (
    <div className="main-container">
      <h2>cards Page</h2>
      <p>This is the cards page content.</p>
      <div className="rectangle top-right"></div>
      <div className="rectangle middle-left"></div>
      <div className="label issue-country">Issue Country</div>
      <div className="label name-on-card">Name On Card</div>
      <div className="label cvv">CVV/CVC</div>
      <div className="input-box cvv-input"></div>
      <div className="rectangle middle-right"></div>
      <div className="header-text flight-title">Flight</div>
      <div className="header-text total-title">Total</div>
      <div className="header-text card-title">Cards</div>
      <div className="input-box card-input"></div>
      <div className="input-box name-input"></div>
      <div className="input-box country-input"></div>
      <div className="input-box valid-until-input"></div>
      <div className="label card-type">Credit/debit Cards</div>
      <div className="label valid-until">Valid Until</div>
      <div className="payment-status-box"></div>
      <div className="label payment-status">Payment Status:</div>
      <div className="header-container">
      <Link to="/payment" className="small-icon" style={{ left: 1354, top: 957 }}></Link>
        <img className="logo" src="https://via.placeholder.com/162x128" alt="Logo" />
        <div className="profile-pic-container">
          <div className="profile-pic-bg"></div>
          <img className="profile-pic" src="https://via.placeholder.com/113x109" alt="Profile" />
        </div>
        <div className="nav benefits">Benefits</div>
        <div className="nav help-center">Help Center</div>
        <div className="nav member">MEMBER</div>
        <div className="nav home">Home</div>
        <div className="nav flight">Flight</div>
      </div>
      <div className="additional-box">
        <div className="additional-inner-box"></div>
      </div>
    </div>
  );
};

export default YourComponent;