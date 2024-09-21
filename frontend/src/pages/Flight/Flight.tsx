
import React, { useState, useEffect } from 'react';
import { Table, Button, Input, Space, DatePicker, Dropdown, Menu } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import './flight.css';
import FFF from '../../assets/FFF.png';
import PPP from '../../assets/PPP.jpg';

interface FlightData {
  key: string;
  flightCode: string;
  from: string;
  to: string;
  start: string;
  end: string;
  airline: string;
  date: string;
}

const FlightTable: React.FC = () => {
  const [data, setData] = useState<FlightData[]>([]);
  const [originalData, setOriginalData] = useState<FlightData[]>([]); 
  const [searchText, setSearchText] = useState('');
  const [selectedDate, setSelectedDate] = useState<moment.Moment | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const flights = [
        { key: '1', flightCode: 'FL123', from: 'Bangkok', to: 'Tokyo', start: '2024-09-10 08:00', end: '2024-09-10 12:00', airline: 'Thai Airways', date: '2024-09-10' },
        { key: '2', flightCode: 'FL456', from: 'Bangkok', to: 'New York', start: '2024-09-12 20:00', end: '2024-09-13 04:00', airline: 'Emirates', date: '2024-09-12' },
      ];
      setData(flights);
      setOriginalData(flights);
    };
    fetchData();
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchText(value);

    if (value === '') {
      setData(originalData);
    } else {
      const filteredData = originalData.filter((flight) =>
        flight.flightCode.toLowerCase().includes(value.toLowerCase())
      );
      setData(filteredData);
    }
  };

  const handleDateChange = (date: moment.Moment | null) => {
    setSelectedDate(date);

    if (date) {
      const filteredData = originalData.filter((flight) =>
        flight.date === date.format('YYYY-MM-DD')
      );
      setData(filteredData);
    } else {
      setData(originalData);
    }
  };

  // Function to handle logout
  const handleLogout = () => {
    // Clear the token from localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('token_type');

    // Navigate to login page
    navigate('/');
  };

  const menu = (
    <Menu>
      <Menu.Item key="1" onClick={handleLogout}>
        Logout
      </Menu.Item>
    </Menu>
  );

  const columns = [
    {
      title: 'Flight Code',
      dataIndex: 'flightCode',
      key: 'flightCode',
    },
    {
      title: 'Flying From',
      dataIndex: 'from',
      key: 'from',
    },
    {
      title: 'Going To',
      dataIndex: 'to',
      key: 'to',
    },
    {
      title: 'Schedule Start',
      dataIndex: 'start',
      key: 'start',
    },
    {
      title: 'Schedule End',
      dataIndex: 'end',
      key: 'end',
    },
    {
      title: 'Airline',
      dataIndex: 'airline',
      key: 'airline',
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: 'Actions',
      key: 'action',
      render: (text: any, record: FlightData) => (
        <Button className="edit-button" onClick={() => navigate(`/edit-flight/${record.key}`)}>
          EDIT
        </Button>
      ),
    },
  ];

  return (
    <div className="flight-container">
      <div className="header">
        <div className="button-group-flight">
          <img src={FFF} alt="Logo" className="left-logo" />
          <Button className="flight-button" onClick={() => navigate('/date-flight')}>Flights</Button>
          <Button className="add-flight-button" onClick={() => navigate('/add-flight')}>Add flights</Button>
        </div>

        <div className="profile-section">
          <img src={PPP} alt="Profile" className="profile-image" />
          <span className="user-name">John Doe</span>
          <Dropdown overlay={menu}>
            <Button>
              <DownOutlined />
            </Button>
          </Dropdown>
        </div>
      </div>

      <div className="search">
        <Space style={{ marginBottom: 16 }}>
          <Input
            placeholder="Search Flight by Code"
            value={searchText}
            onChange={handleSearch}
          />
          <DatePicker
            onChange={handleDateChange}
            value={selectedDate}
            format="YYYY-MM-DD"
          />
        </Space>
      </div>
      <Table columns={columns} dataSource={data} pagination={false} />
    </div>
  );
};

export default FlightTable;
