// import React from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Login from "./pages/login/Login";
// import EditFlight from "./pages/editflight/EditFlight";
// import Flight from "./pages/flight/flight"; 
// import DateFlight from "./pages/dateflight/DateFlight";
// import AddFlight from "./pages/addflight/AddFlight";
// import Payment from './page/Payment.tsx'
// import InternetBanking from './page/InternetBanking.tsx'
// import Wallet from './page/E-Wallet.tsx'
// import Paypal from './page/Paypal.tsx'
// import Cards from './page/Cards.tsx'

// function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<Login />} />
//         <Route path="/flight" element={<Flight />} />
//         <Route path="/date-flight" element={<DateFlight />} />
//         <Route path="/add-flight" element={<AddFlight />} /> 
//         <Route path="/edit-flight/:flightCode" element={<EditFlight />} />
//         <Route path="/Payment" element={<Payment />} />
//         <Route path="/InternetBanking" element={<InternetBanking />} />
//         <Route path="/Wallet" element={<Wallet />} />
//         <Route path="/Paypal" element={<Paypal />} />
//         <Route path="/Cards" element={<Cards />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;


/* import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/login/Login";
import EditFlight from "./pages/editflight/EditFlight";
import Flight from "./pages/flight/flight"; 
import DateFlight from "./pages/dateflight/DateFlight";
import AddFlight from "./pages/addflight/AddFlight";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/flight" element={<Flight />} />
        <Route path="/date-flight" element={<DateFlight />} />
        <Route path="/add-flight" element={<AddFlight />} /> 
        <Route path="/edit-flight/:id" element={<EditFlight />} />
      </Routes>
    </Router>
  );
}

export default App; */


// import { useState } from 'react';
// import HelpCenterPage from './pages/HelpCenter/HelpCenterPage';

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
//     <div>
//       <HelpCenterPage />
//     </div>
//     </>
//   )
// }

// export default App;

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Payment from './pages/Payment/payment.tsx'
import InternetBanking from './pages/InternetBanking/internetbanking.tsx'
import Wallet from './pages/cards/cards.tsx'
import Paypal from './pages/EWallet/EWallet.tsx'
import Cards from './pages/paypal/paypal.tsx'
import './index.css'
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

const App: React.FC = () => {
  return (
  <Router>
      <div>
        

        <Routes>
          <Route path="/Payment" element={<Payment />} />
          <Route path="/InternetBanking" element={<InternetBanking />} />
          <Route path="/Wallet" element={<Wallet />} />
          <Route path="/Paypal" element={<Paypal />} />
          <Route path="/Cards" element={<Cards />} />
          <Route path="/" element={<Payment />} /> {/* Make Payment the default route */}
        </Routes>
      </div>
    </Router>
)
}

export default App;