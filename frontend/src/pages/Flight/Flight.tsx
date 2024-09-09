// import React from 'react';
// import './Flight.css';
// import FFF from './assets/FFF.png'
// import PPP from './assets/PPP.jpg'

// const Flight: React.FC = () => {
//   return (
//     <div className="container">
//       <header>
//         <img src={FFF} alt="Logo" className="header-logo" />
//         <nav>
//           <button className="nav-btn-1">Flights</button>
//           <button className="nav-btn-2">Add_flights</button>
//           <div className="member-section">
//             <div className="profile"/>
//                 <div className="profile-background" />
//                 <img className="profile-image" src={PPP} alt="Profile" />
//                 <div className="member-button">
//                     <div className="member-button-background" />
//                     <div className="member-button-text">MEMBER</div>
//                 </div>
//                 <div className="dropdown">&#x25BC;</div>
//           </div>
//         </nav>
//       </header>
      
//       <div className="search-section">
//         <input type="text" className="search-input" placeholder="search" />
//         <button className="search-btn">Search</button>
//       </div>
      
//       <table className="flight-table">
//         <thead>
//           <tr>
//             <th>Flight Code</th>
//             <th>Flying From</th>
//             <th>Going To</th>
//             <th>Schedule Start</th>
//             <th>Schedule End</th>
//             <th>Airline</th>
//             <th></th>
//           </tr>
//         </thead>
//         <tbody>
//           <tr>
//             <td>Flight Code</td>
//             <td>Flying From</td>
//             <td>Going To</td>
//             <td>Schedule Start</td>
//             <td>Schedule End</td>
//             <td>Airline</td>
//             <td><button className="edit-btn">EDIT</button></td>
//           </tr>
//           <tr>
//             <td>Flight Code</td>
//             <td>Flying From</td>
//             <td>Going To</td>
//             <td>Schedule Start</td>
//             <td>Schedule End</td>
//             <td>Airline</td>
//             <td><button className="edit-btn">EDIT</button></td>
//           </tr>
//           <tr>
//             <td>Flight Code</td>
//             <td>Flying From</td>
//             <td>Going To</td>
//             <td>Schedule Start</td>
//             <td>Schedule End</td>
//             <td>Airline</td>
//             <td><button className="edit-btn">EDIT</button></td>
//           </tr>
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default Flight;


import React from 'react';
import './Flight.css';
import FFF from './assets/FFF.png';
import PPP from './assets/PPP.jpg';

interface Props {
  onShowFlights: () => void;
  onAddFlight: () => void;
  onEditFlight: () => void;
}

const Flight: React.FC<Props> = ({ onShowFlights, onAddFlight, onEditFlight }) => {
  return (
    <div className="container">
      <header>
        <img src={FFF} alt="Logo" className="header-logo" />
        <nav>
          <button className="nav-btn-1" onClick={onShowFlights}>Flights</button>
          <button className="nav-btn-2" onClick={onAddFlight}>Add Flights</button>
          <div className="member-section">
            <div className="profile">
              <div className="profile-background" />
              <img className="profile-image" src={PPP} alt="Profile" />
            </div>
            <div className="member-button">MEMBER</div>
            <div className="dropdown">&#x25BC;</div>
          </div>
        </nav>
      </header>

      <div className="search-section">
        <input type="text" className="search-input" placeholder="Search" />
        <button className="search-btn">Search</button>
      </div>

      <table className="flight-table">
        <thead>
          <tr>
            <th>Flight Code</th>
            <th>Flying From</th>
            <th>Going To</th>
            <th>Schedule Start</th>
            <th>Schedule End</th>
            <th>Airline</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Flight Code</td>
            <td>Flying From</td>
            <td>Going To</td>
            <td>Schedule Start</td>
            <td>Schedule End</td>
            <td>Airline</td>
            <td><button className="edit-btn" onClick={onEditFlight}>EDIT</button></td>
          </tr>
          {/* เพิ่มแถวอื่น ๆ ตามที่ต้องการ */}
        </tbody>
      </table>
    </div>
  );
};

export default Flight;
