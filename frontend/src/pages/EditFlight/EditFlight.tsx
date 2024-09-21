// import React, { useState, useEffect } from 'react';
// import { Form, Input, Button, DatePicker, InputNumber } from 'antd';
// import { useParams, useNavigate } from 'react-router-dom';
// import moment from 'moment';
// import './EditFlight.css';
// import FFF from '../../assets/FFF.png';
// import PPP from '../../assets/PPP.jpg';

// interface FlightData {
//   key: string;
//   flightCode: string;
//   from: string;
//   to: string;
//   start: string;
//   end: string;
//   airline: string;
//   cost: number;
//   points: number;
// }

// const EditFlight: React.FC = () => {
//   const { id } = useParams<{ id: string }>(); // Get flight ID from the URL
//   const [form] = Form.useForm();
//   const navigate = useNavigate();
//   const [flightData, setFlightData] = useState<FlightData | null>(null);

//   useEffect(() => {
//     // Fetch the flight data based on ID
//     const fetchFlight = async () => {
//       const flights = [
//         { key: '1', flightCode: 'FL123', from: 'Bangkok', to: 'Tokyo', start: '2024-09-10 08:00', end: '2024-09-10 12:00', airline: 'Thai Airways', cost: 500, points: 2000 },
//         { key: '2', flightCode: 'FL456', from: 'Bangkok', to: 'New York', start: '2024-09-12 20:00', end: '2024-09-13 04:00', airline: 'Emirates', cost: 1000, points: 4000 },
//       ];
//       const flight = flights.find(f => f.key === id);
//       if (flight) {
//         setFlightData(flight);
//         form.setFieldsValue({
//           ...flight,
//           start: moment(flight.start),
//           end: moment(flight.end),
//         });
//       }
//     };

//     fetchFlight();
//   }, [id, form]);

//   const handleFinish = (values: any) => {
//     console.log('Updated values:', values);
//     // Logic to save the updated flight details (API call or local state update)
//     navigate('/flight');
//   };

//   const handleDelete = () => {
//     // Logic to delete the flight
//     console.log('Flight deleted:', id);
//     navigate('/flight');
//   };

//   if (!flightData) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div className="edit-flight-container">
//       <h2>Edit Flight {flightData.flightCode}</h2>
//       <Form
//         form={form}
//         onFinish={handleFinish}
//         layout="vertical"
//         className="edit-flight-form"
//       >
//         <Form.Item label="Flight Code" name="flightCode">
//           <Input disabled />
//         </Form.Item>
        
//         <Form.Item label="Flying From" name="from">
//           <Input />
//         </Form.Item>

//         <Form.Item label="Going To" name="to">
//           <Input />
//         </Form.Item>

//         <Form.Item label="Schedule Start" name="start">
//           <DatePicker showTime format="YYYY-MM-DD HH:mm" />
//         </Form.Item>

//         <Form.Item label="Schedule End" name="end">
//           <DatePicker showTime format="YYYY-MM-DD HH:mm" />
//         </Form.Item>

//         <Form.Item label="Airline" name="airline">
//           <Input />
//         </Form.Item>

//         <Form.Item label="Cost" name="cost">
//           <InputNumber min={0} />
//         </Form.Item>

//         <Form.Item label="Points" name="points">
//           <InputNumber min={0} />
//         </Form.Item>

//         <Form.Item>
//           <Button type="primary" htmlType="submit">
//             Save
//           </Button>
//           <Button danger onClick={handleDelete} style={{ marginLeft: '10px' }}>
//             Delete
//           </Button>
//         </Form.Item>
//       </Form>
//     </div>
//   );
// };

// export default EditFlight;


import React, { useState, useEffect } from 'react';
import { Input, Button, DatePicker, Form, notification } from 'antd';
import { useParams, useNavigate } from 'react-router-dom';
import moment from 'moment';
import './editFlight.css';
import FFF from '../../assets/FFF.png';
import PPP from '../../assets/PPP.jpg';

interface FlightDetails {
  flightCode: string;
  from: string;
  to: string;
  start: string;
  end: string;
  airline: string;
  cost: number;
  point: number;
}

const EditFlight: React.FC = () => {
  const [flightData, setFlightData] = useState<FlightDetails | null>(null);
  const { flightCode } = useParams<{ flightCode: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch the specific flight details based on flightCode (you can replace this with an API call)
    const fetchFlightData = async () => {
      const flight = {
        flightCode: 'FL123',
        from: 'Bangkok',
        to: 'Tokyo',
        start: '2024-09-10 08:00',
        end: '2024-09-10 12:00',
        airline: 'Thai Airways',
        cost: 500,
        point: 1000,
      };

      if (flight.flightCode === flightCode) {
        setFlightData(flight);
      }
    };
    fetchFlightData();
  }, [flightCode]);

  const handleDelete = () => {
    // Delete flight data based on flightCode (you can replace this with an API call)
    notification.success({
      message: 'Flight Deleted',
      description: `Flight ${flightCode} has been successfully deleted.`,
    });
    navigate('/flight'); // Navigate back to the flight list
  };

  const handleSave = (values: FlightDetails) => {
    // Save the edited flight details (you can replace this with an API call)
    notification.success({
      message: 'Flight Updated',
      description: `Flight ${flightCode} has been successfully updated.`,
    });
    navigate('/flight'); // Navigate back to the flight list
  };

  if (!flightData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="edit-flight-container">
      <h2>Edit Flight: {flightCode}</h2>
      <Form
        initialValues={{
          ...flightData,
          start: moment(flightData.start),
          end: moment(flightData.end),
        }}
        onFinish={handleSave}
      >
        <Form.Item
          name="flightCode"
          label="Flight Code"
          rules={[{ required: true, message: 'Please input flight code' }]}
        >
          <Input disabled />
        </Form.Item>
        <Form.Item
          name="from"
          label="Flying From"
          rules={[{ required: true, message: 'Please input origin' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="to"
          label="Going To"
          rules={[{ required: true, message: 'Please input destination' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="start"
          label="Schedule Start"
          rules={[{ required: true, message: 'Please select start time' }]}
        >
          <DatePicker showTime format="YYYY-MM-DD HH:mm" />
        </Form.Item>
        <Form.Item
          name="end"
          label="Schedule End"
          rules={[{ required: true, message: 'Please select end time' }]}
        >
          <DatePicker showTime format="YYYY-MM-DD HH:mm" />
        </Form.Item>
        <Form.Item
          name="airline"
          label="Airline"
          rules={[{ required: true, message: 'Please input airline' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="cost"
          label="Cost"
          rules={[{ required: true, message: 'Please input cost' }]}
        >
          <Input type="number" />
        </Form.Item>
        <Form.Item
          name="point"
          label="Point"
          rules={[{ required: true, message: 'Please input point' }]}
        >
          <Input type="number" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Save
          </Button>
          <Button type="default" danger onClick={handleDelete} style={{ marginLeft: '10px' }}>
            Delete
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default EditFlight;
