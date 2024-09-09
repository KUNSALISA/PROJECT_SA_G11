import React from 'react';
import './Help.css';

const Help = () => {
  return (
    <div className="help-center">
      <header className="header">
        <div className="logo">LOGO</div>
        <nav className="nav">
          <button>Home</button>
          <button>Flight</button>
          <button>Benefits</button>
          <button>Help Center</button>
        </nav>
      </header>

      <div className="main">
        <h1>Hi, how can we help?</h1>
        <div className="search-bar">
          <input type="text" placeholder="Type any question or keyword" />
          <button className="search-button">🔍</button>
        </div>

        <div className="content">
          <div className="featured-topics">
            <h2>Most Featured Topics</h2>
            <ul>
              <li>Topic1 <span>+</span></li>
              <li>Topic2 <span>+</span></li>
              <li>Topic3 <span>+</span></li>
              <li>Topic4 <span>+</span></li>
              <li>Topic5 <span>+</span></li>
            </ul>
          </div>

          <div className="request-form">
            <h2>Mail Us Your Request</h2>
            <form>
              <label>
                Category:
                <select>
                  <option value="">Choose a category</option>
                  {/* Add other options here */}
                </select>
              </label>
              <label>
                Firstname:
                <input type="text" placeholder="Enter your firstname" />
              </label>
              <label>
                Lastname:
                <input type="text" placeholder="Enter your lastname" />
              </label>
              <label>
                Email:
                <input type="email" placeholder="emailAddress@email.com" />
              </label>
              <label>
                Subject:
                <input type="text" placeholder="Enter a subject" />
              </label>
              <label>
                Mobile Phone:
                <input type="tel" placeholder="ex. 894561230" />
              </label>
              <label>
                Message:
                <textarea placeholder="Please describe the details"></textarea>
              </label>
              <button type="submit" className="submit-button">Submit</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Help;