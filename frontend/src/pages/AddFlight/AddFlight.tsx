// // import React from 'react';
// // import './AddFlight.css'; 
// // import FFF from './assets/FFF.png'
// // import PPP from './assets/PPP.jpg'

// // const AddFlight: React.FC = () => {
// //   return (
// //     <div className="container">
// //       <div className="button button1" />
// //       <div className="button button2" />
// //       <div className="button button3" />
// //       <div className="button button4" />
// //       <div className="button button5" />
// //       <div className="button button6" />
// //       <div className="button button7" />
// //       <div className="button button8" />
// //       <div className="button button9" />
// //       <div className="button button10" />
// //       <div className="label label1">FlightCode</div>
// //       <div className="label label2">Flying From</div>
// //       <div className="label label3">Going To</div>
// //       <div className="label label4">Schedule Start</div>
// //       <div className="label label5">Schedule End</div>
// //       <div className="label label6">Hour</div>
// //       <div className="label label7">Cost</div>
// //       <div className="label label8">Point</div>
// //       <div className="label label9">Type</div>
// //       <div className="label label10">Airline_ID</div>
// //       <div className="header">
// //         <div className="header-background" />
// //         <div className="header-background" />
// //         <img className="header-logo" src={FFF} alt="Logo" />
// //         <div className="profile">
// //           <div className="profile-background" />
// //           <img className="profile-image" src={PPP} alt="Profile" />
// //         </div>
// //       </div>
// //       <div className="home-button">
// //         <div className="home-button-background" />
// //         <div className="home-button-text">Home</div>
// //       </div>
// //       <div className="member-button">
// //         <div className="member-button-background" />
// //         <div className="member-button-text">MEMBER</div>
// //       </div>
// //       <div className="notification">
// //         <div className="notification-border" />
// //       </div>
// //       <div className="save-button-bottom">
// //         <div className="save-button-background" />
// //         <div className="save-button-text">SAVE</div>
// //       </div>
// //     </div>
// //   );
// // }

// // export default AddFlight;


// import React from 'react';
// import './AddFlight.css'; 
// import FFF from './assets/FFF.png'
// import PPP from './assets/PPP.jpg'

// type Props = {
//   onPageChange?: (view: 'flight' | 'add' | 'edit' | 'date') => void;
// };

// const AddFlight: React.FC<Props> = ({ onPageChange }) => {

//   const handleHomeClick = () => {
//     if (onPageChange) {
//       onPageChange('flight'); // Change to 'flight' page
//     }
//   };

// //   const handleMemberClick = () => {
// //     if (onPageChange) {
// //       onPageChange('member'); // Change to 'member' page if applicable
// //     }
// //   };

//   const handleSaveClick = () => {
//     // Handle save action here
//     alert('Flight details saved!');
//   };

//   return (
//     <div className="container">
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
//       <div className="header">
//         <div className="header-background" />
//         <div className="header-background" />
//         <img className="header-logo" src={FFF} alt="Logo" />
//         <div className="profile">
//           <div className="profile-background" />
//           <img className="profile-image" src={PPP} alt="Profile" />
//         </div>
//       </div>
//       <div className="home-button" onClick={handleHomeClick}>
//         <div className="home-button-background" />
//         <div className="home-button-text">Home</div>
//       </div>
//       {/* <div className="member-button" onClick={handleMemberClick}>
//         <div className="member-button-background" />
//         <div className="member-button-text">MEMBER</div>
//       </div> */}
//       <div className="notification">
//         <div className="notification-border" />
//       </div>
//       <div className="save-button-bottom" onClick={handleSaveClick}>
//         <div className="save-button-background" />
//         <div className="save-button-text">SAVE</div>
//       </div>
//     </div>
//   );
// }

// export default AddFlight;


import React from 'react';
import './AddFlight.css'; 
import FFF from './assets/FFF.png'
import PPP from './assets/PPP.jpg'

interface Props {
  onGoHome: () => void;
}

const AddFlight: React.FC<Props> = ({ onGoHome }) => {
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

export default AddFlight;
