import React, { useState } from 'react';
import { Layout } from 'antd';
import { Divider, List, Typography } from 'antd';
import { Button, Flex } from 'antd';
import { Card } from 'antd';
import { Form, Input } from 'antd';
import { usePaymentService } from '../../Service/paymentService';
import { useBookingService } from '../../Service/bookingService';
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
    marginLeft: '92.5%',
  };

  const buttoncodeStyle: React.CSSProperties = {
    textAlign: 'center',
    color: '#FFFFFF',
    backgroundColor: '#69ABC1',
     marginLeft: '10px'
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
    marginTop: '-500px',  // เพิ่ม margin-top เพื่อให้ขนานกับ List
  };
  
  const Cards: React.FC = () => {
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
    const handlePayment = () => {
      const newPayment = {
        PaymentStatus: true, // สถานะการชำระเงินเป็น true เมื่อต้องการจ่าย
        MemberID: 2, // ต้องแทนที่ด้วย ID ที่เหมาะสม
        BookingID: bookingId, // ใช้ BookingID ที่เราเลือก
        BenefitID: 1, // ต้องแทนที่ด้วย ID ที่เหมาะสม
        amount: totalPrice,
        voucherCode: voucherCode || null,
      };
  
      const createdPayment = createPayment(newPayment);
      if (createdPayment) {
        setPaymentStatus('Paid');
        alert(`Payment successful with bank: `);
      } else {
        alert('Payment failed. Please try again.');
      }
    };
  
    return (
      <Layout style={layoutStyle} >
      <Header style={headerStyle}>
        <div className='container'>
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
      <>
        <Divider orientation="left"></Divider>
        <Card title="Cards" bordered={false} style={listStyle}>
                 
              <Form.Item
                layout="vertical"
                label="Credit/debit Cards"
                name="Credit/debit Cards"
                rules={[{ required: true }]}
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
              >
                <Input placeholder="Credit/debit Cards" style={{ flex : 1 }} />  {/* ใช้ flex: 1 เพื่อให้ Input ขยายเต็มพื้นที่ */}
              </Form.Item>
  
              <Form.Item
        layout="vertical"
        label="valid until"
        name="valid until"
        rules={[{ required: true }]}
        style={{ display: 'inline-block', width: 'calc(50% - 8px)' }}
      >
        <Input placeholder="valid until" />
      </Form.Item>
      <Form.Item
        layout="vertical"
        label="CVV/CVC"
        name="CVV/CVC"
        rules={[{ required: true }]}
        style={{ display: 'inline-block', width: 'calc(50% - 8px)', marginLeft: '1.75%' }}
      >
        <Input placeholder="CVV/CVC" />
      </Form.Item>
  
      <Form.Item
                layout="vertical"
                label="Name On Card"
                name="Name On Card"
                rules={[{ required: true }]}
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
              >
            <Input placeholder="Name On Card" style={{ flex : 1 }} />  {/* ใช้ flex: 1 เพื่อให้ Input ขยายเต็มพื้นที่ */}
        </Form.Item>
  
        <Form.Item
                layout="vertical"
                label="Issue Country"
                name="Issue Country"
                rules={[{ required: true }]}
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
              >
            <Input placeholder="Issue Country" style={{ flex : 1 }} />  {/* ใช้ flex: 1 เพื่อให้ Input ขยายเต็มพื้นที่ */}
        </Form.Item>
  
        <Button type="primary" style={buttonclickStyle} onClick={handlePayment} >Click</Button>
  
          </Card>
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
        </>
      </Content>
      <Footer style={footerStyle}></Footer>
    </Layout>
    );
  };
  
  export default Cards;
  