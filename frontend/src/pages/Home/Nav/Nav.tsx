import React, { useEffect, useState } from 'react'
import './์Nav.css'
import logo from '../../../assets/logo.png'
import { Button, CheckboxProps } from 'antd'
import { UserOutlined } from '@ant-design/icons';



const Nav = () => {

    const [collapsed, setCollapsed] = useState(false);

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

    const [sticky,setSticky] = useState(false);

    useEffect(()=>{
        window.addEventListener('scroll', ()=>{
            window.scrollY > 50 ? setSticky(true) : setSticky(false);
        })
    },[]);

  return (
        <nav className ={ `nevbar ${sticky? 'dark-nav':''}`}>
            <ul className='navlist'>
                <a href="#" className="nevlink">Home</a>
                <a href="#" className="nevlink">Flight</a>
                <a href="#" className="nevlink">Benefits</a>
                <a href="#" className="nevlink">Help</a>
            </ul>
            <div className='loginButton'>
                <Button className='Userbutton' type="primary" onClick={toggleCollapsed}> <UserOutlined /> เข้าสู่ระบบ</Button>
            </div>

        </nav>     
  )
}

export default Nav