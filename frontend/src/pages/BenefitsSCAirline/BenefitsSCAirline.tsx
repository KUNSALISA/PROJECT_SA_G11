// import React from 'react';
// import './Benefits.css';



// const Benefits: React.FC = () => {



//   return (
//     <div className="container">
//       <div className="navbar">
//         <div className="navbar-logo">
//           <div className="circle-logo" />
//           {/* <div className="navbar-item mawmaw">MawMaw</div> */}
//         </div>
//         <div className="navbar-links">
//           <div className="navbar-item">Home</div>
//           <div className="navbar-item">Flight</div>
//           <div className="navbar-item">Benefits</div>
//           <div className="navbar-item">Help Center</div>
//         </div>
//         <div className="navbar-placeholder"></div>
//       </div>

//       <div className="header">
//         <h2>Please select an airline</h2>
//       </div>

//       <div className="airline-container">
//         <div className="airline-card">
//           <div className="airline-box"></div>
//           <div className="airline-name">Airline 1</div>

//         </div>
//         <div className="airline-card"> 
//           <div className="airline-box"></div>
//           <div className="airline-name">Airline 2</div>
//         </div>
//         <div className="airline-card">
//           <div className="airline-box"></div>
//           <div className="airline-name">Airline 3</div>
//         </div>
//         <div className="airline-card">
//           <div className="airline-box"></div>
//           <div className="airline-name">Airline 4</div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Benefits;

import React from 'react';
import './BenefitsSCAirline.css';
import FFF from './assets/FFF.png'

export default function BenefitsSCAirline() {
  return (
    <div className='main-container'>
      <div className='flex-row'>
        <div className='rectangle'>
          <img className="logo" src={FFF} alt="logo" />
          <div className='flex-row-dd'>
          {/* <div className='ellipse' /> */}
            <div className='rectangle-1'>
              <span className='home'>Home</span>
            </div>
            <div className='rectangle-2'>
              <span className='flight'>Flight</span>
            </div>
            <div className='rectangle-3'>
              <span className='benefits'>Benefits</span>
            </div>
            <div className='rectangle-4'>
              <span className='help-center'>Help Center</span>
            </div>
            {/* <div className='rectangle-5' /> */}
          </div>
          {/* <div className='rectangle-6'>
            <span className='mawmaw'>MawMaw</span>
          </div> */}
        </div>
        <div className='rectangle-7'>
          <span className='select-airline'>Please select an airline</span>
        </div>
      </div>
      <div className='flex-row-ff'>
        <div className='rectangle-8' />
        <div className='rectangle-9' />
        <div className='rectangle-a' />
        <div className='rectangle-b' />
      </div>
      <div className='flex-row-fb'>
        <span className='airline-1'>Airline 1</span>
        <span className='airline-2'>Airline 2</span>
        <span className='airline-3'>Airline 3</span>
        <span className='airline-4'>Airline 4</span>
      </div>
    </div>
  );
}
// export default Benefits;

// import React from 'react';
// import './AddFlight.css'; 
// import FFF from './assets/FFF.png'
// import PPP from './assets/PPP.jpg'

// const AddFlight: React.FC = () => {
//   return (
//     <div className="container">
//       <div className="header-text">ADD FLIGHT</div>
//       <div className="button button1" />
//       <div className="button button2" />
//       <div className="button button3" />
//       <div className="button button4" />
//       <div className="button button5" />
//       <div className="button button6" />
//       <div className="button button7" />
//       <div className="button button8" />
//       <div className="button button9" />
//       <div className="button button10" />
//       <div className="label label1">FlightCode</div>
//       <div className="label label2">Flying From</div>
//       <div className="label label3">Going To</div>
//       <div className="label label4">Schedule Start</div>
//       <div className="label label5">Schedule End</div>
//       <div className="label label6">Hour</div>
//       <div className="label label7">Cost</div>
//       <div className="label label8">Point</div>
//       <div className="label label9">Type</div>
//       <div className="label label10">Airline_ID</div>
//       <div className="save-button">SAVE</div>
//       <div className="header">
//         <div className="header-background" />
//         <div className="header-background" />
//         <img className="header-logo" src={FFF} alt="Logo" />
//         <div className="profile">
//           <div className="profile-background" />
//           <img className="profile-image" src={PPP} alt="Profile" />
//         </div>
//       </div>
//       <div className="home-button">
//         <div className="home-button-background" />
//         <div className="home-button-text">Home</div>
//       </div>
//       <div className="member-button">
//         <div className="member-button-background" />
//         <div className="member-button-text">MEMBER</div>
//       </div>
//       <div className="notification">
//         <div className="notification-border" />
//       </div>
//       <div className="save-button-bottom">
//         <div className="save-button-background" />
//         <div className="save-button-text">SAVE</div>
//       </div>
//     </div>
//   );
// }

// export default AddFlight;