import React from 'react';
import './BenefitsDetails.css';
import FFF from './assets/FFF.png'

const BenefitsDetails = () => {
  return (
    <div className="airline-selection">
      <header className="header">
        {/* <div className="logo"></div>
        <div className="app-name">MawMaw</div> */}
        <img className="head-logo" src={FFF} alt="logo" />
        <div className="navbar1">
          <span className='home'>Home</span>
        </div>
        <div className="navbar2">
          <span className='flight'>Flight</span>
        </div>
        <div className="navbar3">
          <span className='benefits'>Benefits</span>
        </div>
        <div className="navbar4">
          <span className='help-center'>Help Center</span>
        </div>
        {/* <div className="search-bar"></div> */}
      </header>

      <div className="flight-details">

      </div>
      {/* <main className="main-content">
        <div className="flight-details">
          <div className="flight-images">
            <div className="main-image"></div>
            <div className="sub-images">
              <div className="sub-image"></div>
              <div className="sub-image"></div>
            </div>
          </div>
          <div className="flight-info">
            <h2>Bangkok(Suvarnabhumi) - Samui</h2>
            <p>Airline 1</p>
            <div className="points">
              <span className="lightning-icon">⚡</span> 6,500 P
            </div>
            <div className="selection-group">
              <div className="selection">
                <label>Class :</label>
                <button>Economy</button>
                <button>Business</button>
              </div>
              <div className="selection">
                <label>Trip :</label>
                <button>One Way</button>
                <button>Round Trip</button>
              </div>
            </div>
            <button className="redeem-button">Redeem benefits</button>
          </div>
        </div>
      </main> */}
    </div>
  );
};

export default BenefitsDetails;

// import React from 'react';
// import './Benefits3.css';

// export default function Benefits3() {
//   return (
//     <div className='main-container'>
//       <div className='rectangle'>
//         <div className='rectangle-1'>
//           <div className='flex-row-b'>
//             <span className='bangkok-suvarnabhumi-samui'>
//               Bangkok(Suvarnabhumi) - Samui
//             </span>
//             <div className='rectangle-2' />
//             <div className='ellipse' />
//             <span className='airline'>Airline 1</span>
//             <div className='image' />
//             <span className='p-6500'>6,500 P</span>
//             <span className='class'>Class :</span>
//             <div className='rectangle-3'>
//               <span className='economy'>Economy</span>
//             </div>
//             <div className='rectangle-4'>
//               <span className='business'>Business</span>
//             </div>
//           </div>
//           <div className='flex-row-a'>
//             <div className='rectangle-5' />
//             <div className='rectangle-6' />
//             <span className='trip'>Trip :</span>
//             <div className='rectangle-7'>
//               <span className='one-way'>One Way</span>
//             </div>
//             <div className='rectangle-8'>
//               <span className='round-trip'>Round Trip</span>
//             </div>
//             <button className='rectangle-9'>
//               <span className='redeem-benefits'>Redeem benefits</span>
//             </button>
//           </div>
//         </div>
//       </div>
//       <div className='rectangle-a'>
//         <div className='flex-row-bd'>
//           <div className='ellipse-b' />
//           <div className='rectangle-c'>
//             <span className='home'>Home</span>
//           </div>
//           <div className='rectangle-d'>
//             <span className='flight'>Flight</span>
//           </div>
//           <div className='rectangle-e'>
//             <span className='benefits'>Benefits</span>
//           </div>
//           <div className='rectangle-f'>
//             <span className='help-center'>Help Center</span>
//           </div>
//           <div className='rectangle-10' />
//         </div>
//         <div className='rectangle-11'>
//           <span className='mawmaw'>MawMaw</span>
//         </div>
//       </div>
//       <div className='rectangle-12' />
//     </div>
//   );
// }
