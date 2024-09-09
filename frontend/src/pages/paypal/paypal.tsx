import React from 'react';
import { Link } from 'react-router-dom';
import './paypal.css';

const PaypalFlightComponent = () => {
  return (
    <div className="container">
      <h2>paypal Page</h2>
      <p>This is the paypal page content.</p>
      <div className="left-box" />
      <div className="click-box">
        <div className="click-text">Click</div>
      </div>
      <div className="paypal-text">Paypal</div>
      <div className="right-box" />
      <div className="flight-text">Flight</div>
      <div className="total-box" />
      <div className="total-text"><br />Total</div>
      <Link to="/payment" className="small-icon" style={{ left: 1354, top: 957 }}></Link>
      <div className="payment-status-box" />
      <div className="payment-status-text">Payment Status :</div>
      <div className="header">
        <div className="header-content">
          <div className="header-background" />
          <img className="header-logo" src="https://via.placeholder.com/162x128" alt="Logo" />
        </div>
        <div className="profile-box">
          <div className="profile-background" />
          <img className="profile-image" src="https://via.placeholder.com/113x109" alt="Profile" />
        </div>
        </div>
        <div className="nav-item" style={{ left: 269, top: 59, position: 'absolute' }}>
          <div className="nav-item-text1">Home</div>
        </div>
        <div className="nav-item" style={{ left: 414, top: 59, position: 'absolute' }}>
          <div className="nav-item-text2">Flight</div>
        </div>
        <div className="nav-item" style={{ left: 559, top: 59, position: 'absolute' }}>
          <div className="nav-item-text3">Benefits</div>
        </div>
        <div className="nav-item" style={{ left: 704, top: 59, position: 'absolute' }}>
          <div className="nav-item-text4">Help Center</div>
        </div>
        <div className="nav-item" style={{ left: 1155, top: 59, position: 'absolute' }}>
          <div className="nav-item-text">MEMBER</div>
        </div>
    </div>
  );
}

export default PaypalFlightComponent;