import React from 'react';
import './BenefitsAll.css';
import FFF from './assets/FFF.png'

const BenefitsAll: React.FC = () => {
  return (
    <div className="container">
      <div className="navbar">
        <img className="header-logo" src={FFF} alt="logo" />
        <div className="navbar-logo"></div>
          {/* <div className="circle-logo" /> */}
          {/* <div className="navbar-item mawmaw">MawMaw</div> */}
        <div className="navbar-links1">
          <span className='home'>Home</span>
        </div>
        <div className="navbar-links2">
          <span className='flight'>Flight</span>
        </div>
        <div className="navbar-links3">
          <span className='benefits'>Benefits</span>
        </div>
        <div className="navbar-links4">
          <span className='help-center'>Help Center</span>
        </div>
        {/* <div className="navbar-placeholder"></div> */}
      </div>

      <div className="airline-tabs">
        <div className="tab">Airline 1</div>
        <div className="tab">Airline 2</div>
        <div className="tab">Airline 3</div>
        <div className="tab">Airline 4</div>
      </div>

      <div className="flight-container">
        <div className="flight-card">
          <div className="flight-image"></div>
          <div className="flight-info">
            <div className="flight-name">Bangkok (Suvarnabhumi) - Samui</div>
            <div className="flight-price">
              <div className="lightning-icon"></div>
              6,500 P
            </div>
          </div>
        </div>

        <div className="flight-card">
          <div className="flight-image"></div>
          <div className="flight-info">
            <div className="flight-name">Bangkok (Suvarnabhumi) - Maldives</div>
            <div className="flight-price">
              <div className="lightning-icon"></div>
              14,000 P
            </div>
          </div>
        </div>

        <div className="flight-card">
          <div className="flight-image"></div>
          <div className="flight-info">
            <div className="flight-name">Bangkok (Suvarnabhumi) - Lampang</div>
            <div className="flight-price">
              <div className="lightning-icon"></div>
              5,000 P
            </div>
          </div>
        </div>

        <div className="flight-card">
          <div className="flight-image"></div>
          <div className="flight-info">
            <div className="flight-name">Bangkok (Suvarnabhumi) - Trat</div>
            <div className="flight-price">
              <div className="lightning-icon"></div>
              5,000 P
            </div>
          </div>
        </div>

        <div className="flight-card">
          <div className="flight-image"></div>
          <div className="flight-info">
            <div className="flight-name">Bangkok (Suvarnabhumi) - Phuket</div>
            <div className="flight-price">
              <div className="lightning-icon"></div>
              5,000 P
            </div>
          </div>
        </div>

        <div className="flight-card">
          <div className="flight-image"></div>
          <div className="flight-info">
            <div className="flight-name">Bangkok (Suvarnabhumi) - Chiang Mai</div>
            <div className="flight-price">
              <div className="lightning-icon"></div>
              5,000 P
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BenefitsAll;
