import React from 'react';
import { Link } from 'react-router-dom';
import './payment.css';

const Payment: React.FC = () => {
  return (
    <div className="container">
      <h2>Payment Page</h2>
      <p>This is the payment page content.</p>
      
      {/* Adjust positioning or use CSS classes to style these divs */}
      <div className="box" style={{ width: 626, height: 136, left: 130, top: 228, position: 'absolute' }} />
      <div className="title" style={{ left: 288, top: 272, position: 'absolute' }}>Internet Banking</div>
      <div className="box" style={{ width: 480, height: 136, left: 880, top: 221, position: 'absolute' }}></div>
      <div className="box" style={{ width: 480, height: 136, left: 880, top: 374, position: 'absolute' }} />
      <div className="box" style={{ width: 480, height: 292, left: 880, top: 527, position: 'absolute' }} />
      <div className="box" style={{ width: 626, height: 136, left: 130, top: 378, position: 'absolute' }} />
      <div className="box" style={{ width: 626, height: 136, left: 130, top: 534, position: 'absolute' }}></div>
      <div className="box" style={{ width: 626, height: 136, left: 130, top: 690, position: 'absolute' }}></div>
      <div className="title" style={{ left: 288, top: 422, position: 'absolute' }}>Cards</div>
      <div className="subtitle" style={{ width: 422, left: 915, top: 265, position: 'absolute' }}>Flight</div>
      <div className="title" style={{ left: 288, top: 572, position: 'absolute' }}>E-Wallet</div>
      <div className="title" style={{ left: 288, top: 728, position: 'absolute' }}>Paypal</div>
      <div className="box-small" style={{ left: 157, top: 246, position: 'absolute' }}>
        <div className="box-small-inner"></div>
      </div>
      <div className="box-small" style={{ left: 156, top: 390, position: 'absolute' }}>
        <div className="box-small-inner"></div>
      </div>
      <div className="box-small" style={{ left: 156, top: 552, position: 'absolute' }}>
        <div className="box-small-inner"></div>
      </div>
      <div className="box-small" style={{ left: 156, top: 708, position: 'absolute' }}>
        <div className="box-small-inner"></div>
      </div>
      <Link to="/internetbanking" className="button" style={{ left: 610, height: 15, top: 318 }}>Click</Link>
      <Link to="/cards" className="button" style={{ left: 610, height: 15, top: 466 }}>Click</Link>
      <Link to="/ewallet" className="button" style={{ left: 610, height: 15, top: 624 }}>Click</Link>
      <Link to="/paypal" className="button" style={{ left: 610, height: 15, top: 772 }}>Click</Link>
      <div className="subtitle" style={{ left: 900, top: 384, position: 'absolute' }}>Voucher/Promo Code</div>
      <div className="price-detail-container" style={{ left: 921, top: 565, position: 'absolute' }}>
        <div className="price-detail">Price Detail<br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>Total</div>
      </div>
      <div className="input-box" style={{ width: 323, height: 40, left: 900, top: 454, position: 'absolute' }} />
      <Link to="/payment" className="small-icon" style={{ left: 1354, top: 957 }}></Link>
      <div className="header">
        <img className="header-img" src="https://via.placeholder.com/162x128" alt="Header" />
        <div className="header-icon">
          <img className="header-icon-img" src="https://via.placeholder.com/113x109" alt="Header Icon" />
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

export default Payment;
