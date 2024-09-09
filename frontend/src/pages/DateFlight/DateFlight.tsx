// import React from 'react';
// import './DateFlight.css'; 
// import FFF from './assets/FFF.png'
// import PPP from './assets/PPP.jpg'

// const DateFlight: React.FC = () => {
//   return (
//     <div className="container">
//       <div className="header">
//         <img src={FFF} alt="Logo" className="header-logo" />
//             <button className="home-btn">Home</button>
//         <img src={PPP} alt="Profile" className="profile-image" />
//             <div className="member-button">
//                 <div className="member-button-background" />
//                 <div className="member-button-text">MEMBER</div>
//                 <div className="dropdown">&#x25BC;</div>
//             </div>
//       </div>
//       <nav>
//       </nav>

//       <div className="search-section">
//         <input type="date" className="date-input" />
//         <button className="all-btn">ALL</button>
//         <button className="add-btn">ADD</button>
//         <input type="text" className="search-input" placeholder="search" />
//         <button className="search-btn">Search</button>
//       </div>
      
//       <table className="flight-table">
//         <thead>
//           <tr>
//             <th></th>
//             <th>Flight Code</th>
//             <th>Flying From</th>
//             <th>Going To</th>
//             <th>Schedule Start</th>
//             <th>Schedule End</th>
//             <th>Airline</th>
//           </tr>
//         </thead>
//         <tbody>
//           <tr>
//             <td><input type="checkbox" /></td>
//             <td>Flight Code</td>
//             <td>Flying From</td>
//             <td>Going To</td>
//             <td>Schedule Start</td>
//             <td>Schedule End</td>
//             <td>Airline</td>
//           </tr>
//           <tr>
//             <td><input type="checkbox" /></td>
//             <td>Flight Code</td>
//             <td>Flying From</td>
//             <td>Going To</td>
//             <td>Schedule Start</td>
//             <td>Schedule End</td>
//             <td>Airline</td>
//           </tr>
//           <tr>
//             <td><input type="checkbox" /></td>
//             <td>Flight Code</td>
//             <td>Flying From</td>
//             <td>Going To</td>
//             <td>Schedule Start</td>
//             <td>Schedule End</td>
//             <td>Airline</td>
//           </tr>
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default DateFlight;


import React from 'react';
import './DateFlight.css'; 
import FFF from './assets/FFF.png'
import PPP from './assets/PPP.jpg'

interface Props {
  onGoHome: () => void;
}

const DateFlight: React.FC<Props> = ({ onGoHome }) => {
  return (
    <div className="container">
      <div className="header">
        <img className="header-logo" src={FFF} alt="Logo" />
        <div className="profile">
          <div className="profile-background" />
          <img className="profile-image" src={PPP} alt="Profile" />
        </div>
        <button className="home-btn" onClick={onGoHome}>Home</button>
      </div>
      {/* Your other content */}
    </div>
  );
}

export default DateFlight;
