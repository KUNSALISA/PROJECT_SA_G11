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


import React from "react";
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

export default App;




