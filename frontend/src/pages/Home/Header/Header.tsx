import React from 'react'
import './Header.css'
import { AutoComplete, Cascader, Checkbox, DatePicker, Input, InputNumber } from 'antd'
import type { CheckboxProps, DatePickerProps } from 'antd';
import type { CascaderProps } from 'antd';

interface Option {
    value: string;
    label: string;
    children?: Option[];
}
  
  const options: Option[] = [
    {
      value: 'ชั้นประหยัด',
      label: 'ชั้นประหยัด',
    },
    {
        value: 'ชั้นธุรกิจ',
        label: 'ชั้นธุรกิจ',
    },
    {
        value: 'ชั้นหนึ่ง',
        label: 'ชั้นหนึ่ง',
    }
]

interface Option {
  value: string;
  label: string;
  children?: Option[];
}

const option: Option[] = [
  {
    value: 'เที่ยวเดียว',
    label: 'เที่ยวเดียว',
  },
  {
      value: 'ไป-กลับ',
      label: 'ไป-กลับ',
  }
]

const onChange: DatePickerProps['onChange'] = (date, dateString) => {
    console.log(date, dateString);
  };

const onChang: CascaderProps<Option>['onChange'] = (value) => {
    console.log(value);
};

const onChanges: CheckboxProps['onChange'] = (e) => {
  console.log(`checked = ${e.target.checked}`);
};


export const Header = () => {
  return (
    <div className='Home'>
        <div className = 'image'>
            <h1>จองเลย!</h1>
            <h2>ค้นหาเที่ยวบินมากมายจากทั่วทุกมุมโลก</h2>
        </div>

        <div className='searchflight'>
            <div className="input">
                <h3>
                <Checkbox onChange={onChanges}>ไป-กลับ</Checkbox>
                </h3>
                <h1>
                  <Input placeholder="จาก" />
                  <Input placeholder="ไปยัง" />
                  <DatePicker onChange={onChange} />
                  <DatePicker onChange={onChange} />
                </h1>
                <h2>
                  <Cascader defaultValue={['เที่ยวเดียว']} options={option} onChange={onChang} />
                  <Cascader defaultValue={['ชั้นประหยัด']} options={options} onChange={onChang} />
                  <InputNumber suffix="ผู้โดยสาร" style={{ width: '20%'}} min={1} max={10} defaultValue={1} /> 
                </h2>
            </div>
        </div>
    </div>
  )
}

export default Header