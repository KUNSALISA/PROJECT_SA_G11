import React, { useState, useEffect } from 'react';
import './Benefits.css';
import FFF from '../../assets/FFF.png';
import Logo_AirAsia from '../../assets/Logo_AirAsia.png';
import Logo_Nokair from '../../assets/Logo_Nokair.png';
import Logo_ThaiAirways from '../../assets/Logo_ThaiAirways.png';
import Logo_Vietjet from '../../assets/Logo_Vietjet.png';
import { useNavigate } from "react-router-dom";
import axios from 'axios'; //เชื่อมกับ Backend
import {AirlineInterface} from '../../interfaces/fullmanageflight'
// import { GetAllAirline } from '../../services';

export default function Benefits() {
  const navigate = useNavigate();

  const handleBenefitsClick = () => {
    navigate("/");
  };

  const handleBenefits2Click = () => {
    navigate("/Benefits2");
  };

  const handleBenefits3Click = () => {
    navigate("/Benefits3-details/1");
  };

  const [Airlines, setAirlines] = useState<AirlineInterface[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAirlines = async () => {
      try {
        const response = await axios.get('http://localhost:8080/airlines');
        console.log(response.data); // Check what data you receive
        setAirlines(response.data.airlines);
      } catch (error) {
        console.error("Error fetching flights data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAirlines();
  }, []);

  return (
    <div className='main-container'>
      <div className='flex-row'>
        <div className='rectangle'>
          <img className="logo" src={FFF} alt="logo" />
          <div className="rectangle-1">
            <button onClick={handleBenefitsClick}>Home</button>
          </div>
          <div className="rectangle-2">
            <button>Flight</button>
          </div>
          <div className="rectangle-3">
            <button onClick={handleBenefitsClick}>Benefits</button>
          </div>
          <div className="rectangle-4">
            <button>Help Center</button>
          </div>
        </div>
        <div className='rectangle-7'>
          <span className='select-airline'>Please select an airline</span>
        </div>
      </div>
      <div className='flex-row-ff'>
        <img className="logoAA" src={Logo_AirAsia} alt="logoAA" onClick={handleBenefits2Click} />
        <img className="logoNA" src={Logo_Nokair} alt="logoNA" onClick={handleBenefits2Click} />
        <img className="logoTA" src={Logo_ThaiAirways} alt="logoTA" onClick={handleBenefits2Click} />
        <img className="logoVJ" src={Logo_Vietjet} alt="logoVJ" onClick={handleBenefits2Click} />
      </div>
      <div className='flex-row-fb'>
        {Array.isArray(Airlines) && Airlines.map((Airlines, index) => (
          <div key={index} className="selectAirline-card">
            <div className='airline-n' onClick={handleBenefits2Click}>
              {Airlines.AirlineName}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
