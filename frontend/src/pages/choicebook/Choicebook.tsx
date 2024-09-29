import React, { useEffect, useState } from 'react';
import './Choicebook.css';
import { ArrowRightOutlined, SearchOutlined} from '@ant-design/icons';
import { useLocation, useNavigate } from "react-router-dom";
import { GetAvailableFlights } from '../../Service/bookingServ';
import { AutoComplete, Button, DatePicker, Form, Modal } from 'antd';
import SearceModul from '../../pages/Home/SearchModul/SearceModul';
import Navbook from './Navbook/Navbook'

type LocationOption = {
  value: string; // e.g. 'กรุงเทพ (BKK)'
  label: string;
  code: string;  // e.g. 'BKK'
};

const optionsPlace: LocationOption[] = [
  { value: 'กรุงเทพ (BKK)', label: 'กรุงเทพ (BKK)', code: 'BKK' },
  { value: 'เชียงใหม่ (CNX)', label: 'เชียงใหม่ (CNX)', code: 'CNX' },
  { value: 'ภูเก็ต (HKT)', label: 'ภูเก็ต (HKT)', code: 'HKT' },
  { value: 'สมุย (USM)', label: 'สมุย (USM)', code: 'USM' },
  { value: 'ดอนเมือง (DMK)', label: 'ดอนเมือง (DMK)', code: 'DMK' },
];

const Choicebook = () => {
  const navigate = useNavigate();
  const [flights, setFlights] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedOutboundFlight, setSelectedOutboundFlight] = useState<any>(null);
  const [selectedReturnFlight, setSelectedReturnFlight] = useState<any>(null);
  const [isSelectingReturn, setIsSelectingReturn] = useState(false);
  const location = useLocation();
  const { from, to, departDate, returnDate, numberPassenger, flightClass, fromValue, toValue } = location.state || {};
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSearchVisible, setIsSearchVisible] = useState(false); // New state for toggling search form visibility

  // Function to fetch available flights
  const fetchAvailableFlights = async (departure: string, arrival: string, date: string) => {
    try {
      const response = await GetAvailableFlights({
        departure,
        arrival,
        flight_date: date,
      });
      console.log(response.data);
      setFlights(response.data); // Store the flight data in state
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Fetch outbound flights initially
    fetchAvailableFlights(from, to, departDate);
  }, [from, to, departDate]);

  const handleBookingClick = (flight: any) => {
    if (!isSelectingReturn) {
      setSelectedOutboundFlight(flight);
      
      // ตรวจสอบว่ามี returnDate หรือไม่
      if (returnDate) {
        // Fetch return flights
        fetchAvailableFlights(to, from, returnDate);
        setIsSelectingReturn(true); // เปลี่ยนสถานะไปที่การเลือกเที่ยวบินขากลับ
      } else {
        // ถ้าเป็นเที่ยวเดียว ส่งข้อมูลเที่ยวบินขาไป
        navigate("/passengerall", { 
          state: { 
            fromValue,
            toValue,
            departDate,
            returnDate,
            outboundFlight: flight, 
            airlineOutbound: flight.Airline,  // ส่ง airline ของเที่ยวบินขาไป
            departureTimeOutbound: flight.DepartureTime, // ส่งเวลาของเที่ยวบินขาไป
            arrivalTimeOutbound: flight.ArrivalTime, // ส่งเวลาถึงของเที่ยวบินขาไป
            totalPrice: calculateTotalPrice(flight.Price, numberPassenger, flightClass), 
            numberPassenger 
          } 
        });
      }
    } else {
      // เลือกเที่ยวบินขากลับ
      setSelectedReturnFlight(flight);
  
      // คำนวณราคาทั้งเที่ยวบินขาไปและเที่ยวบินขากลับ
      const totalFlightPrice = calculateTotalPrice(selectedOutboundFlight.Price, numberPassenger, flightClass) + calculateTotalPrice(flight.Price, numberPassenger, flightClass);
  
      // ส่งข้อมูลไปหน้า /passengerall รวม airline และเวลาของทั้งขาไปและขากลับ
      navigate("/passengerall", {
        state: {
          fromValue,
          toValue,
          departDate,
          returnDate,
          airlineOutbound: selectedOutboundFlight.Airline,  // airline ขาไป
          departureTimeOutbound: selectedOutboundFlight.DepartureTime, // เวลาของเที่ยวบินขาไป
          arrivalTimeOutbound: selectedOutboundFlight.ArrivalTime, // เวลาถึงของเที่ยวบินขาไป
          airlineReturn: flight.Airline,  // airline ขากลับ
          departureTimeReturn: flight.DepartureTime, // เวลาของเที่ยวบินขากลับ
          arrivalTimeReturn: flight.ArrivalTime, // เวลาถึงของเที่ยวบินขากลับ
          outboundFlight: selectedOutboundFlight,
          returnFlight: flight,
          totalPrice: totalFlightPrice, // ราคารวม
          numberPassenger,
        },
      });
    }
  };
  
  

  const calculateDuration = (departureTime: string, arrivalTime: string) => {
    const departure = new Date(departureTime);
    const arrival = new Date(arrivalTime);
    const diffMs = arrival.getTime() - departure.getTime();
    const diffMinutes = Math.floor(diffMs / 60000);
    const hours = Math.floor(diffMinutes / 60);
    const minutes = diffMinutes % 60;
    return `${hours}ชม. ${minutes}น.`;
  };

  const calculateTotalPrice = (basePrice: number, numberPassenger: number, flightClass: string) => {
    let totalPrice = basePrice * numberPassenger;
    if (flightClass === 'ชั้นธุรกิจ') {
      totalPrice += 10000;
    }
    return totalPrice;
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
    <Navbook/>
    <div className='choicebook'>
      <div className='choice'>
       <div className="imagesmall"></div>
       <div className="changeflight">
       <h1>{fromValue} <ArrowRightOutlined /> {toValue}</h1>
       <h2>{departDate} | {numberPassenger} ผู้โดยสาร | {flightClass}</h2>
       <Button 
         className="custom" 
         type="text" 
         onClick={() => setIsSearchVisible(!isSearchVisible)} 
         icon={<SearchOutlined />} 
       >
         Change Search
       </Button>
       
       {/* Conditionally render the search form */}
       {isSearchVisible && (
         <div className="search-module">
           <SearceModul />
         </div>
       )}
       </div>
    </div>
      <h2>{!isSelectingReturn ? 'เลือกเที่ยวบินขาไป' : 'เลือกเที่ยวบินขากลับ'}</h2>
      {flights.length > 0 ? (
        flights.map((flight) => (
          <div className="choiceselect" key={flight.ID}>
            <div className="airline">
              <div className="logo-flight"></div>
              <div className="name">{flight.Airline}</div>
            </div>
            <div className="flight-time">
              <div className="departure">
                <div className="time">{new Date(flight.DepartureTime).toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit', hour12: false })}</div>
                <div className="location">{flight.Departure}</div>
              </div>
            </div>
            <div className="duration">
              <div className="time">{calculateDuration(flight.DepartureTime, flight.ArrivalTime)}</div>
              <ArrowRightOutlined />
              <div className="type">{flightClass}</div>
            </div>
            <div className="arrival">
              <div className="time">{new Date(flight.ArrivalTime).toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit', hour12: false })}</div>
              <div className="location">{flight.Arrival}</div>
            </div>
            <div className="price-section">
              <div className="price">฿ {calculateTotalPrice(flight.Price, numberPassenger, flightClass)}</div>
              <Button className="custom" onClick={() => handleBookingClick(flight)}>จอง</Button>
            </div>
          </div>
        ))
      ) : (
        <p>ไม่พบเที่ยวบินที่ตรงกับการค้นหาของคุณ</p>
      )}
    </div>
    </>
  );
};

export default Choicebook;
