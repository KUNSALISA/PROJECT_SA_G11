import React, { useEffect, useState } from 'react'
import './Navbook.css'
import logo from '../../../assets/logo.png'
import { Button } from 'antd'
import { UserOutlined } from '@ant-design/icons';
import { useNavigate } from "react-router-dom"

export const Navbook = () => {

    const navigate = useNavigate();

    const handleHomeClick = () => {
      navigate("/");
    };

  return (
        <nav className ='nevbook'>
            <ul className='navlist'>
                <a href="#" className="nevlink" onClick={handleHomeClick}>Home</a>
                <a href="#" className="nevlink">Flight</a>
                <a href="#" className="nevlink">Benefits</a>
                <a href="#" className="nevlink">Help</a>
            </ul>
            <div className='loginButton'>
                <Button className='Userbutton' type="primary" > <UserOutlined /> เข้าสู่ระบบ</Button>
            </div>

        </nav>
  )
}

export default Navbook;
