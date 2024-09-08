import React from 'react';
import './App.css';  // Importing the CSS file

const App: React.FC = () => {
  return (
    <div style={{ width: 1440, height: 1024, position: 'relative', background: 'white' }}>
      <div className="box" style={{ width: 626, height: 136, left: 130, top: 228 }} />
      <div className="text" style={{ left: 288, top: 272 }}>Internet Banking</div>
      <div className="box" style={{ width: 480, height: 136, left: 880, top: 221 }} />
      <div className="box" style={{ width: 480, height: 136, left: 880, top: 374 }} />
      <div className="box" style={{ width: 480, height: 292, left: 880, top: 527 }} />
      <div className="box" style={{ width: 626, height: 136, left: 130, top: 378 }} />
      <div className="box" style={{ width: 626, height: 136, left: 130, top: 534 }} />
      <div className="box" style={{ width: 626, height: 136, left: 130, top: 690 }} />
      <div className="text" style={{ left: 288, top: 422 }}>Cards</div>
      <div className="text" style={{ width: 422, left: 915, top: 265 }}>Flight</div>
      <div className="text" style={{ left: 288, top: 572 }}>E-Wallet</div>
      <div className="text" style={{ left: 288, top: 728 }}>Paypal</div>
      <div className="icon" style={{ left: 157, top: 246 }} />
      <div className="icon" style={{ left: 156, top: 390 }} />
      <div className="icon" style={{ left: 156, top: 552 }} />
      <div className="icon" style={{ left: 156, top: 708 }} />
      <div className="button" style={{ left: 640, top: 313 }}>Click</div>
      <div className="button" style={{ left: 1239, top: 454 }}>Click</div>
      <div className="button" style={{ left: 640, top: 461 }}>Click</div>
      <div className="button" style={{ left: 640, top: 619 }}>Click</div>
      <div className="button" style={{ left: 640, top: 776 }}>Click</div>
      <div className="text-voucher" style={{ left: 900, top: 384 }}>Voucher/Promo Code</div>
      <div className="price-detail" style={{ left: 921, top: 565 }}>Price Detail<br />Total</div>
      <div className="input-box" style={{ left: 900, top: 454 }} />
      <div className="small-box" style={{ left: 1360, top: 960 }} />
      <div className="header" />
      <div className="menu-item" style={{ left: 559, top: 59 }}>Benefits</div>
      <div className="menu-item" style={{ left: 704, top: 59 }}>Help Center</div>
      <div className="menu-item" style={{ left: 1155, top: 59 }}>MEMBER</div>
      <div className="small-box" style={{ left: 1296, top: 10 }} />
      <div className="menu-item" style={{ left: 269, top: 51 }}>Home</div>
      <div className="menu-item" style={{ left: 414, top: 51 }}>Flight</div>
    </div>
  );
};

export default App;