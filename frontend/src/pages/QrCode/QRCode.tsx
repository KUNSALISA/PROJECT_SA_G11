import React from 'react';
import { Link } from 'react-router-dom';
import './QRCode.css'; // Import the CSS file

const YourComponent: React.FC = () => {
  return (
    <div className="container">
      <h2>QRCode Page</h2>
      <p>This is the QRCodet page content.</p>
      <div className="box-left" />
      <div className="promptpay-text">PromptPay</div>
      <div className="box-right"></div>
      <div className="flight-text">Flight</div>
      <div className="total-box"></div>
      <div className="total-text"><br />Total</div>
      <div className="qrcode-box">
        <div className="qrcode-inner-box"></div>
      </div>
      <Link to="/payment" className="small-icon" style={{ left: 1354, top: 957 }}></Link>
      <div className="status-box"></div>
      <div className="status-text">Payment Status :</div>
      <div className="header">
        <div className="header-bg"></div>
        <img className="header-img" src="https://via.placeholder.com/162x128" alt="Logo" />
        <div className="profile">
          <div className="profile-bg"></div>
          <img className="profile-img" src="https://via.placeholder.com/113x109" alt="Profile" />
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
};

export default YourComponent;