import React, { useEffect, useState } from 'react';
import '../Header.css';
import { AutoComplete, Button, Checkbox, CheckboxProps, DatePicker, Form, InputNumber, Select } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { useNavigate } from "react-router-dom";
import dayjs from 'dayjs';

// Define a type for storing location with both label and code
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

const SearceModul = () => {

    const navigate = useNavigate();
  const [isRoundTrip, setIsRoundTrip] = useState(false);
  const [from, setFrom] = useState<LocationOption>(optionsPlace[0]); // Default to 'กรุงเทพ (BKK)'
  const [to, setTo] = useState<LocationOption>(optionsPlace[1]); // Default to 'เชียงใหม่ (CNX)'
  const [departDate, setDepartDate] = useState(dayjs().add(1, 'day'));
  const [returnDate, setReturnDate] = useState<dayjs.Dayjs | null>(null);
  const [flightClass, setFlightClass] = useState('ชั้นประหยัด');
  const [numberPassenger, setNumberPassenger] = useState(1);

  const onCheckboxChange: CheckboxProps['onChange'] = (e) => {
    setIsRoundTrip(e.target.checked);
  };

  const handleSearchClick = () => {
    // Navigate to the select flight page with both value and code
    navigate('/selectflight', {
      state: {
        from: from.code, // Send the code for the departure location
        fromValue: from.value, // Send the value for the departure location
        to: to.code, // Send the code for the destination
        toValue: to.value, // Send the value for the destination
        departDate: departDate.format('YYYY-MM-DD'),
        returnDate: isRoundTrip && returnDate ? returnDate.format('YYYY-MM-DD') : null,
        flightClass,
        numberPassenger,
      },
    });
  };
  return (
    <div className='searchflight'>
    <div className="input">
      <h1>
        {/* Departure Input */}
        <Form.Item label='จาก' name='from' layout='vertical'>
          <AutoComplete
            style={{ width: 182 }}
            defaultValue={from.value}
            options={optionsPlace}
            onChange={(value) => {
              const selectedOption = optionsPlace.find(option => option.value === value);
              if (selectedOption) setFrom(selectedOption); // Store both value and code
            }}
            filterOption={(inputValue, option) =>
              option!.value.toLowerCase().includes(inputValue.toLowerCase())
            }
          />
        </Form.Item>

        {/* Destination Input */}
        <Form.Item label='ไปยัง' name='to' layout='vertical'>
          <AutoComplete
            style={{ width: 182 }}
            defaultValue={to.value}
            options={optionsPlace}
            onChange={(value) => {
              const selectedOption = optionsPlace.find(option => option.value === value);
              if (selectedOption) setTo(selectedOption); // Store both value and code
            }}
            filterOption={(inputValue, option) =>
              option!.value.toLowerCase().includes(inputValue.toLowerCase())
            }
          />
        </Form.Item>

        {/* Departure Date Picker */}
        <Form.Item label='วันที่ออกเดินทาง' name='departDate' layout='vertical'>
          <DatePicker
            defaultValue={departDate}
            value={departDate}
            onChange={(date) => setDepartDate(date)}
          />
        </Form.Item>

        {/* Return Date Picker - Only enabled if round trip */}
        <Form.Item
          label={<Checkbox checked={isRoundTrip} onChange={onCheckboxChange}>ไป-กลับ</Checkbox>}
          name='returnDate'
          layout='vertical'
        >
          <DatePicker
            disabled={!isRoundTrip}
            onChange={(date) => setReturnDate(date)}
          />
        </Form.Item>
      </h1>

      <h2>
        {/* Flight Class Selection */}
        <Form.Item name='class'>
          <Select
            defaultValue={'ชั้นประหยัด'}
            options={[
              { value: 'ชั้นประหยัด', label: 'ชั้นประหยัด' },
              { value: 'ชั้นธุรกิจ', label: 'ชั้นธุรกิจ' },
            ]}
            style={{ width: 182 }}
            onChange={(value: string) => setFlightClass(value)}
          />
        </Form.Item>

        {/* Number of Passengers Input */}
        <Form.Item name='numberPassenger'>
          <InputNumber
            suffix="ผู้โดยสาร"
            style={{ width: 182 }}
            min={1}
            max={10}
            defaultValue={1}
            onChange={(value) => setNumberPassenger(value || 1)}
          />
        </Form.Item>
      </h2>
    </div>

    {/* Search Button */}
    <div className="search">
      <Button
        className='custom-button'
        type="text"
        icon={<SearchOutlined />}
        onClick={handleSearchClick}
      >
        Search
      </Button>
    </div>
  </div>
  )
}

export default SearceModul