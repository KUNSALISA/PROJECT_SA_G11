import React, { useEffect, useState } from 'react';
import './Passenger.css';
import { Button, DatePicker, Input, Select, Space, Timeline, Form } from 'antd';
import { ArrowRightOutlined } from '@ant-design/icons';
import { Baggage, Passenger } from '../../interfaces/booking';
import { CreateBookingAll } from '../../Service/bookingServ';
import { useLocation } from 'react-router-dom';

const options = [
  { value: '+66', label: 'TH (+66)' },
  { value: '+86', label: 'CN (+86)' },
];

const baggageOptions = [
  { value: '+0', label: '+0', price: 0 },
  { value: '+5', label: '+5 (1400)', price: 1400 },
  { value: '+10', label: '+10 (2800)', price: 2800 },
  { value: '+20', label: '+20 (3000)', price: 3000 },
];

const PassengerAll = () => {
  const [form] = Form.useForm();
  const [selectedBaggage, setSelectedBaggage] = useState<Array<any>>(Array(4).fill(baggageOptions[0])); // Array for all passengers' baggage
  const [totalPriced, setTotalPrice] = useState<number>(0); // Total price including baggage
  const [baggageTotal, setBaggageTotal] = useState<number>(0); // Total baggage cost
  const [fixedGender, setFixedgender] = useState<string | undefined>(); // Store gender
  const location = useLocation();
  const { outboundFlight, returnFlight, totalPrice, numberPassenger, departDate, returnDate, fromValue, toValue, airlineOutbound, airlineReturn, departureTimeOutbound, arrivalTimeOutbound, departureTimeReturn, arrivalTimeReturn} = location.state || {}; // Retrieve outbound and return flight
  // Update the gender based on title
  const handleTitleChange = (value: string) => {
    if (value === 'นาย') {
      setFixedgender('Male');
    } else if (value === 'นาง' || value === 'นางสาว') {
      setFixedgender('Female');
    }
  };

  // Set the initial total price when outboundFlight is available
  useEffect(() => {
    // คำนวณยอดรวมใหม่เมื่อ totalPrice หรือ baggageTotal เปลี่ยนแปลง
    setTotalPrice(totalPrice + baggageTotal);
  }, [totalPrice, baggageTotal]);
  

  const handleBaggageChange = (value: string, passengerIndex: number) => {
    const baggage = baggageOptions.find((option) => option.value === value) || baggageOptions[0];
    const updatedBaggage = [...selectedBaggage];
    
    // Update outbound baggage for the passenger
    updatedBaggage[passengerIndex] = {
      ...updatedBaggage[passengerIndex],
      outboundBaggage: baggage,
    };
    
    setSelectedBaggage(updatedBaggage);
    
    // Recalculate baggage total for outbound and return trips
    calculateTotalBaggageCost(updatedBaggage);
  };
  
  const handleBaggageReturnChange = (value: string, passengerIndex: number) => {
    const baggage = baggageOptions.find((option) => option.value === value) || baggageOptions[0];
    const updatedBaggage = [...selectedBaggage];
    
    // Update return baggage for the passenger
    updatedBaggage[passengerIndex] = {
      ...updatedBaggage[passengerIndex],
      returnBaggage: baggage,
    };
    
    setSelectedBaggage(updatedBaggage);
    
    // Recalculate baggage total for outbound and return trips
    calculateTotalBaggageCost(updatedBaggage);
  };
  
  // ฟังก์ชันสำหรับคำนวณยอดสัมภาระรวม
  const calculateTotalBaggageCost = (baggageArray: any) => {
    let newBaggageTotal = 0;
  
    // คำนวณยอดสัมภาระขาไปและขากลับของผู้โดยสารทุกคน
    baggageArray.forEach((baggage: any) => {
      const outboundPrice = baggage?.outboundBaggage?.price || 0;
      const returnPrice = baggage?.returnBaggage?.price || 0;
      newBaggageTotal += outboundPrice + returnPrice;
    });
  
    // อัปเดตยอดรวมสัมภาระและราคาทั้งหมด
    setBaggageTotal(newBaggageTotal);
    const newTotalPrice = totalPrice + newBaggageTotal;
    setTotalPrice(newTotalPrice);
  };
  
  

  const onFinish = async (values: any) => {
    const passengersData: Passenger[] = [];
    const baggageData: { baggage: Baggage; flightId: number }[] = []; // Baggage for both outbound and return
  
    for (let i = 0; i < numberPassenger; i++) {
      // Passenger data
      const passengerData: Passenger = {
        Phone: values.phone,
        Email: values.email,
        FirstName: values[`firstname_${i}`],
        LastName: values[`lastname_${i}`],
        Gender: values[`title_${i}`] === 'นาย' ? 'Male' : 'Female',
        BirthDay: values[`birthday_${i}`].format('YYYY-MM-DDTHH:mm:ss[Z]'),
        PassportNumber: values[`passportnumber_${i}`],
        PassportDate: values[`passportdate_${i}`].format('YYYY-MM-DDTHH:mm:ss[Z]'),
      };
      passengersData.push(passengerData);
  
      // Outbound baggage data
      const outboundBaggage = baggageOptions.find((option) => option.value === values[`baggage_${i}`]);
      baggageData.push({
        baggage: {
          Weight: parseInt(values[`baggage_${i}`].replace('+', '')) || 0,
          Price: outboundBaggage?.price || 0,
        },
        flightId: outboundFlight.ID,  // Associate with outbound flight
      });
  
      // Return baggage data (if applicable)
      if (returnFlight && values[`baggageback_${i}`]) {
        const returnBaggage = baggageOptions.find((option) => option.value === values[`baggageback_${i}`]);
        baggageData.push({
          baggage: {
            Weight: parseInt(values[`baggageback_${i}`].replace('+', '')) || 0,
            Price: returnBaggage?.price || 0,
          },
          flightId: returnFlight.ID,  // Associate with return flight
        });
      }
    }
  
    try {
      // Prepare flight details for outbound and return flights
      const flightDetails = [{ flightAndFlightDetailsID: outboundFlight.ID }];
      if (returnFlight && returnFlight.ID) {
        flightDetails.push({ flightAndFlightDetailsID: returnFlight.ID });
      }
  
      // Calculate total price including baggage
      const totalCalculatedPrice = totalPrice + baggageTotal;
  
      // Submit the booking data
      const response = await CreateBookingAll({
        TotalPrice: totalCalculatedPrice,
        bookingPassenger: passengersData.map((passenger) => ({ passenger })),
        bookingBaggage: baggageData.map(({ baggage, flightId }) => ({
          baggage,
          flightAndFlightDetailsID: flightId,  // Assign flight ID for each baggage entry
        })),
        bookingFlightAndFlightDetails: flightDetails,
      });
  
      console.log('Success:', response);
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };
  
  
  
  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div className="passenger">
      <Form form={form} layout="vertical" onFinish={onFinish} onFinishFailed={onFinishFailed}>
        <div className="place">
          <div className="contect">
            <h1>ข้อมูลการติดต่อ</h1>
            <div className="contect-phone">
              <Form.Item label="หมายเลขโทรศัพท์มือถือ" name="phone" rules={[{ required: true, message: '' }]}>
                <Space.Compact style={{ width: 250 }}>
                  <Select style={{ width: 150 }} defaultValue="+66" options={options} />
                  <Input/>
                </Space.Compact>
              </Form.Item>
            </div>

            <div className="contect-email">
              <Form.Item label="อีเมลล์" name="email" layout="vertical" rules={[{ required: true, message: '' }]}>
                <Input style={{ width: 250 }} suffix=".com" placeholder="email@example.com" />
              </Form.Item>
            </div>
          </div>

          {Array.from({ length: numberPassenger }).map((_, i) => (
            <div className="passinfo" key={i}>
              <h1>รายละเอียดผู้โดยสาร {i + 1}</h1>

              <div className="h2">
                <Form.Item label="คำนำหน้า"  name={`title_${i}`} rules={[{ required: true, message: '' }]}>
                  <Select
                    style={{ width: 120 }}
                    options={[
                      { value: 'นาย', label: 'นาย' },
                      { value: 'นาง', label: 'นาง' },
                      { value: 'นางสาว', label: 'นางสาว' },
                    ]}
                    onChange={handleTitleChange}
                  />
                </Form.Item>
              </div>

              <div className="h3">
                <Form.Item label="ชื่อจริง" name={`firstname_${i}`}  rules={[{ required: true, message: '' }]}>
                  <Input style={{ width: 250 }} placeholder="Ex. สมใจ" />
                </Form.Item>
                <Form.Item label="นามสกุล" name={`lastname_${i}`}  rules={[{ required: true, message: '' }]}>
                  <Input style={{ width: 250 }} placeholder="Ex. ได้เอ" />
                </Form.Item>
              </div>

              <div className="h5">
                <Form.Item label="วันเกิด" name={`birthday_${i}`} rules={[{ required: true, message: '' }]}>
                  <DatePicker style={{ width: 250 }} />
                </Form.Item>
              </div>

              <div className="h6">
                <Form.Item label="หมายเลขหนังสือเดินทาง" name={`passportnumber_${i}`} layout="vertical" rules={[{ required: true, message: '' }]}>
                  <Input style={{ width: 250 }} />
                </Form.Item>
                <Form.Item label="วันหมดอายุหนังสือเดินทาง" name={`passportdate_${i}`} layout="vertical" rules={[{ required: true, message: '' }]}>
                  <DatePicker style={{ width: 250 }} />
                </Form.Item>
              </div>

              <div className="passbaggage">
                <Form.Item label="สัมภาระเพิ่มเติม" name={`baggage_${i}`} layout="vertical" initialValue="+0">
                  <Select style={{ width: 250 }} options={baggageOptions} onChange={(value) => handleBaggageChange(value, i)} />
                </Form.Item>
                {returnFlight && (
                  <Form.Item label="สัมภาระเพิ่มเติม กลับ" name={`baggageback_${i}`} layout="vertical" initialValue="+0">
                    <Select style={{ width: 250 }} options={baggageOptions} onChange={(value) => handleBaggageReturnChange(value, i)} />
                  </Form.Item>
                )}
              </div>
            </div>
          ))}
        </div>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            ชำระเงิน
          </Button>
        </Form.Item>
      </Form>

      <div className="placeside">
        <div className="dataflight">
          <h1>
            {fromValue} <ArrowRightOutlined /> {toValue}
          </h1>
          <h3>ขาไป, {departDate}</h3>
          <div className="logoplace">
            <div className="logoflight"></div>
            <h2>{airlineOutbound} </h2>
          </div>
          <div className="timelineplace">
            <Timeline
              className="custom-timeline"
              items={[
                { children: <p>{departureTimeOutbound} กรุงเทพ</p> },
                { children: <p>{arrivalTimeOutbound} เชียงใหม่</p> },
              ]}
            />
          </div>
        </div>
        {returnFlight && (
        <div className="dataflight">
          <h1>
          {toValue} <ArrowRightOutlined /> {fromValue}
          </h1>
          <h3>ขากลับ, {returnDate}</h3>
          <div className="logoplace">
            <div className="logoflight"></div>
            <h2>{airlineReturn}</h2>
          </div>
          <div className="timelineplace">
            <Timeline
              className="custom-timeline"
              items={[
                { children: <p>{departureTimeReturn} กรุงเทพ</p> },
                { children: <p>{arrivalTimeReturn} เชียงใหม่</p> },
              ]}
            />
          </div>
        </div>
        )}
        <div className="total">
          <h1>สรุปราคา</h1>
          <div className="pricehumen">
            <span>ผู้โดยสาร {numberPassenger}</span> <span>{totalPrice} ฿</span>
          </div>
          <div className="pricebaggage">
            {baggageTotal > 0 ? (
              <div className="span">
                สัมภาระเพิ่มเติม<span>{baggageTotal} ฿</span>
              </div>
            ) : (
              <div className="span">
                <br />
              </div>
            )}
          </div>
          <div className="totalprice">
            <span>ยอดรวม</span> <span>{totalPriced} ฿</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PassengerAll;
