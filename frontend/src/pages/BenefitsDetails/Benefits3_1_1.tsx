import React, { useState, useEffect } from 'react';
import './Benefits3_1_1.css';
import FFF from '../../assets/FFF.png';
import Logo_AirAsia from '../../assets/Logo_AirAsia.png';
import pointsicon from '../../assets/pointsicon.png';
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import axios from 'axios'; //เชื่อมกับ Backend
import { Benefits } from '../../interfaces/benefits.interface'
import { Member } from '../../interfaces/member.interface'

const Benefits3_1_1 = () => {
  const navigate = useNavigate();

  const handleBenefitsClick = () => {
    navigate("/");
  };

  const handleBenefits2Click = () => {
    navigate("/Benefits2");
  };

  const [Benefits, setBenefits] = useState<Benefits | null>(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams<{ id: string }>();

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedBenefits, setSelectedBenefits] = useState<Benefits | null>(null);

  const [TotalPoint, setTotalPoint] = useState<number>(0); // สามารถเป็น null ได้
  const [member, setMember] = useState<Member | null>(null);


  // useEffect(() => {
  //   const fetchBenefits = async () => {
  //     try {
  //       const response = await axios.get(`http://localhost:8080/benefits/${id}`);
  //       console.log(response.data);
  //       setBenefits(response.data.data);
  //     } catch (error) {
  //       console.error("Error fetching flights data:", error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchBenefits();
  // }, [id]);

  useEffect(() => {
    const fetchBenefits = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/benefits/${id}`);
        const benefits = response.data.data;
        console.log('PointRequired:', benefits.PointRequired); // ตรวจสอบค่า PointRequired
        setBenefits(benefits);
        // setBenefits(response.data.data);
      } catch (error) {
        console.error("Error fetching benefits data:", error);
      }
    };

    const fetchTotalPoints = async () => {
      try {
        const userResponse = await axios.get<Member>('http://localhost:8080/members/1'); // ดึงข้อมูลสมาชิก
        console.log('API Response:', userResponse.data);
        const totalPoint = userResponse.data.TotalPoint;
        console.log('TotalPoint:', totalPoint); // ตรวจสอบค่า TotalPoint ที่ดึงมา
        setTotalPoint(totalPoint); // ตั้งค่า totalPoint
        // setTotalPoint(userResponse.data.TotalPoint); // ตั้งค่า totalPoint
      } catch (error) {
        console.error("Error fetching user points:", error);
      }
    };

    fetchBenefits();
    fetchTotalPoints(); // ดึงแต้มสะสมของผู้ใช้เมื่อโหลดหน้า
    setLoading(false); // เคลียร์ loading หลังจากดึงข้อมูลทั้งหมด
  }, [id]);

  const handleRedeemClick = async (benefits: Benefits) => {
    console.log('TotalPoint:', TotalPoint); // ตรวจสอบค่า TotalPoint ก่อนการแลก
    console.log('PointRequired:', benefits.PointRequired);
    if (TotalPoint !== undefined && benefits.PointRequired !== undefined && TotalPoint >= benefits.PointRequired) {
      // หักแต้มออกจาก TotalPoint
      const newTotalPoint = TotalPoint - benefits.PointRequired;
      setTotalPoint(newTotalPoint);  // ตั้งค่า TotalPoint ใหม่

      // อัปเดต TotalPoint ของสมาชิกในฐานข้อมูล
      try {
        await axios.put(`http://localhost:8080/members/UpdatePoint`, {
          TotalPoint: newTotalPoint
        });
        setSelectedBenefits(benefits);
        setIsPopupOpen(true);
      } catch (error) {
        console.error("Error updating total points:", error);
      }
    } else {
      alert("You do not have enough points to redeem this benefit.");
    }
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
    setSelectedBenefits(null);
  };

  // const [selectedClass, setSelectedClass] = useState<string | null>(null); // ค่าเริ่มต้นคือ 'Economy'
  // const [selectedTrip, setSelectedTrip] = useState<string | null>(null); // ค่าเริ่มต้นคือ 'One Way'
  // const handleBenefits3Click = () => {
  //   navigate("/Benefits3");
  // };
  if (loading) {
    return <div>Loading...</div>;
  }

  if (!Benefits) {
    return <div>Benefit not found</div>;
  }

  return (
    <div className="airline-selection">
      <header className="header-bar">
        <img className="head-logo" src={FFF} alt="logo" />
        <div className="navbar-container">
          <div className="navbar1">
            <button>Home</button>
          </div>
          <div className="navbar2">
            <button>Flight</button>
          </div>
          <div className="navbar3">
            <button onClick={handleBenefitsClick}>Benefits</button>
          </div>
          <div className="navbar4">
            <button>Help Center</button>
          </div>
        </div>
      </header>
      <div className="header2"></div>

      <div className="frame-flight-details" >
        {/* {Array.isArray(Benefits) && Benefits.map((benefits) => ( */}
          <div className="flight-details" >
            <div className="img-benefits-details3_1_1">
              <img className="img1" src={Benefits.Img1} alt="img1" />
              <div className="img-benefits-details3_1_1_y">
                <img className="img2" src={Benefits.Img2} alt="img2" />
                <img className="img3" src={Benefits.Img3} alt="img3" />
              </div>
            </div>
            <div className="flight-info">
              <span className='ff'>From : {Benefits.FlyingFrom}</span>
              <span className='gt'>To : {Benefits.GoingTo}</span>
              <div className="a-airline" >
                <span className='airline-name'> AirAsia </span>
                <img className="logoAA3" src={Logo_AirAsia} alt="logoAA3" />
              </div>
              <div className="a-points">
                <img className="p-icon" src={pointsicon} alt="icon" />
                <span className="points">{Benefits.PointRequired} P</span>
              </div>

              <span className='class'>Class : {Benefits.Class}</span>
              {/* <div className="class-class">
                <div className='eco-button'>{benefits.Class}</div> */}
                {/* <div className={`bu-button ${selectedClass === 'Business' ? 'selected' : ''}`}>
                  <button onClick={() => setSelectedClass('Business')}>Business</button>
                </div> */}
              {/* </div> */}

              <span className='trip'>Trip : {Benefits.Trip}</span>
              {/* <div className="trip-class">
                <div className={`ow-button ${selectedTrip === 'One Way' ? 'selected' : ''}`}>
                  <button onClick={() => setSelectedTrip('One Way')}>One Way</button>
                </div>
              </div> */}
              <button className="redeem-button" onClick={() => handleRedeemClick(Benefits)}>Redeem benefits</button>
            </div>
          </div>
        {/* ))} */}
      </div>

      {isPopupOpen && selectedBenefits && (
        <div className="popup-overlay">
          <div className="popup-content">
            <h2>Redeem benefits successfull!</h2>
            <p className='code'>This is your code : {selectedBenefits.Code}</p>
            <p>*don't forget to save your Code</p>
            <button onClick={handleClosePopup}>Close</button>
          </div>
        </div>
      )}

    </div>
  );
};

export default Benefits3_1_1;

