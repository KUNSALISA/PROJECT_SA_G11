import React from 'react';
import { Link } from 'react-router-dom';
import './EWallet.css';

const Component = () => {
    return (
      <div className="container">
        <h2>EWallet Page</h2>
        <p>This is the EWallet page content.</p>
        <div className="rectangle" style={{ width: 626, height: 136, left: 130, top: 233 }} />
        <div className="text" style={{ left: 288, top: 277 }}>wallet1</div>
        <div className="rectangle" style={{ width: 480, height: 500, left: 874, top: 233 }} />
        <div className="rectangle" style={{ width: 626, height: 136, left: 130, top: 383 }} />
        <div className="text" style={{ left: 288, top: 427 }}>wallet2</div>
        <div className="text" style={{ left: 909, top: 253 }}>Flight</div>
        
        <div className="icon" style={{ left: 157, top: 251 }} />
        <div className="icon" style={{ left: 156, top: 395 }} />
        
        <div className="button" style={{ left: 610,height: 15, top: 318 }}>Click</div>
        <div className="button" style={{ left: 610,height: 15, top: 466 }}>Click</div>
        
  
        <div className="rectangle" style={{ width: 480, height: 73, left: 874, top: 755 }} />
        <div className="text-small2" style={{ left: 890, top: 772 }}>Total</div>
        <Link to="/payment" className="small-icon" style={{ left: 1354, top: 957 }}></Link>
  
        <div className="status-box" style={{ left: 999, top: 675 }} />
        <div className="text-small" style={{ left: 1041, top: 685 }}>Payment Status:</div>
  
        <div className="header">
          <img className="header-img" src="https://via.placeholder.com/162x128" alt="Logo" />
          <div className="profile">
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
  
  export default Component;