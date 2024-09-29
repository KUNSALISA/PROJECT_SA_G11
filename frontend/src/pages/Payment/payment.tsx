import React, { useState } from 'react';
import { Layout, Divider, List, Typography, Button, Card, Form, Input, Flex } from 'antd';
import { usePaymentService } from '../../Service/paymentService';
import { useBookingService } from '../../Service/bookingService';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import imageSrc from '../../assets/Screenshot 2024-09-19 023621.png';


const { Header, Footer, Content } = Layout;

const headerStyle: React.CSSProperties = {
    display: 'flex',           // Use flexbox for alignment
    alignItems: 'center',       // Center vertically
    color: '#fff',
    height: 64,
    paddingInline: 48,
    lineHeight: '64px',
    backgroundColor: '#69ABC1',
    width: '100vw',             // Full width of the viewport
  };
  const contentStyle: React.CSSProperties = {
    minHeight: 'calc(100vh - 128px)',  // Full height minus header and footer
    lineHeight: '120px',
    backgroundColor: '#FFFFFF',
    width: '100vw',  // Full width of the viewport
  };
  
  const footerStyle: React.CSSProperties = {
    backgroundColor: '#FFFFFF',
    height: 64,
    width: '100vw',  // Full width of the viewport
  };
  
  const layoutStyle: React.CSSProperties = {
    borderRadius: 0,  // No border radius for full screen
    overflow: 'hidden',
    width: '100vw',  // Full width
    height: '100vh',  // Full height
  };
  const buttonStyle: React.CSSProperties = {
    textAlign: 'center',
    color: '#5F212E',
    paddingInline: 24,
    backgroundColor: '#FFFFFF',
    
  };

  const buttonclickStyle: React.CSSProperties = {
    textAlign: 'center',
    color: '#FFFFFF',
    backgroundColor: '#69ABC1',
    margin: '0'
  };

  const buttoncodeStyle: React.CSSProperties = {
    textAlign: 'center',
    color: '#FFFFFF',
    backgroundColor: '#69ABC1',
     marginLeft: '5%'
  };

  const listStyle: React.CSSProperties = { 
    padding: '20px 40px',
    width: '50%',           
    marginLeft: '5%',
          
  };

  const inputContainerStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',  // จัดให้ทั้ง Input และ Button อยู่ตรงกลางแนวแกน Y
  };

  const headerContainerStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',  // จัดให้ทั้ง Input และ Button อยู่ตรงกลางแนวแกน Y
  };

  const cardStyle: React.CSSProperties = {
    width: '30%',
    marginRight: '5%',
    marginTop: '-275px',  // เพิ่ม margin-top เพื่อให้ขนานกับ List
  };
  

// Mock bank options
const data = [
  { name: 'Internet Banking', id: 1 },
  { name: 'Cards', id: 2 },
  { name: 'E-Wallet', id: 3 },
  { name: 'Paypal', id: 4 },
];

const Payment: React.FC = () => {
  const [voucherCode, setVoucherCode] = useState<string>(''); // Voucher code from input
  const [paymentStatus, setPaymentStatus] = useState<string>('Pending'); // Payment status
  const [totalPrice, setTotalPrice] = useState<number>(0); // Total price เริ่มต้นที่ 0
  const { createPayment } = usePaymentService(); // ใช้ payment service
  const { getBookingById } = useBookingService(); // ใช้ booking service เพื่อดึงการจอง
  
  const applyVoucherCode = () => {
    // สมมุติว่า 'PROMO100' เป็น Voucher ที่ถูกต้องเพื่อลดราคา 100%
    if (voucherCode === 'PROMO100') {
      setTotalPrice(0); // ลด totalPrice เป็น 0
      alert('Voucher applied! Total price is now 0 THB.');
    } else {
      alert('Invalid voucher code. Please try again.');
    }
  };


  const bookingId = 2; // รหัสการจองที่ต้องการแสดง (ตัวอย่าง)

  // เมื่อเริ่มต้น ให้ดึงข้อมูลการจองและอัปเดต totalPrice
  React.useEffect(() => {
    const booking = getBookingById(bookingId);
    if (booking) {
      setTotalPrice(booking.TotalPrice); // อัปเดต TotalPrice จากการจอง
    }
  }, [getBookingById, bookingId]);

  // Handle payment
  // const handlePayment = (bankId: number) => {
  //   const newPayment = {
  //     PaymentStatus: true, // สถานะการชำระเงินเป็น true เมื่อต้องการจ่าย
  //     MemberID: 2, // ต้องแทนที่ด้วย ID ที่เหมาะสม
  //     BookingID: bookingId, // ใช้ BookingID ที่เราเลือก
  //     BenefitID: 1, // ต้องแทนที่ด้วย ID ที่เหมาะสม
  //     amount: totalPrice,
  //     bankId,
  //     voucherCode: voucherCode || null,
  //   };

  //   const createdPayment = createPayment(newPayment);
  //   if (createdPayment) {
  //     setPaymentStatus('Paid');
  //     alert(`Payment successful with bank: ${bankId}`);
  //   } else {
  //     alert('Payment failed. Please try again.');
  //   }
  // };

  return (
    <Layout style={layoutStyle}>
      <Header style={headerStyle}>
        <div className="container">
        <div className='topbar'>
              <div style={headerContainerStyle}>
                  <img src={imageSrc} alt="description" style={{ width: '10%', height: '10%',marginRight: '5%' }} /> 
                  <Flex gap="small" wrap>
                    <Button type="primary" style={buttonStyle}>Home</Button>
                    <Button type="primary" style={buttonStyle}>Fight</Button>
                    <Button type="primary" style={buttonStyle}>Benefits</Button>
                    <Button type="primary" style={buttonStyle}>Help Center</Button>
                  </Flex>
                  </div>
             </div>
        </div>
      </Header>

      <Content style={contentStyle}>
        <Divider orientation="left" />
        <List
          bordered
          dataSource={data}
          style={listStyle}
          renderItem={(item, index) => (
            <List.Item>
              <Typography.Text>{item.name}</Typography.Text>
                              <Link to={index === 0 ? "/InternetBanking" : index === 1 ? "/Cards" : index === 2 ? "/Wallet" : "/Paypal"}>
                                <Button type="primary" style={buttonclickStyle}>Click</Button>
                              </Link>
            </List.Item>
          )}
        />

        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Card title="Payment" bordered={false} style={cardStyle}>
            <Form layout="vertical">
              <Form.Item label="Voucher/Promo Code">
                <div style={inputContainerStyle}>
                  <Input
                    value={voucherCode}
                    onChange={(e) => setVoucherCode(e.target.value)} // Handle voucherCode
                    style={{ flex: 1 }}
                    placeholder="Enter voucher code"
                  />
                  <Button type="primary" style={buttoncodeStyle} onClick={applyVoucherCode}>Apply</Button>
                </div>
              </Form.Item>

              <Divider />
              <p>Flight: Example Flight</p>
              <p>Total: {totalPrice} THB</p>
              <p>Payment Status: {paymentStatus}</p>
            </Form>
          </Card>
        </div>
      </Content>

      <Footer style={footerStyle}></Footer>
    </Layout>
  );
};

export default Payment;

