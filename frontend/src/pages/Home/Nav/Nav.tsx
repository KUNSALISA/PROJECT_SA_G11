import React, { useEffect, useState } from 'react'
import './์Nav.css'
import logo from '../../assets/logo.png'
import { Button } from 'antd'


const Nav = () => {

    const [sticky,setSticky] = useState(false);

    useEffect(()=>{
        window.addEventListener('scroll', ()=>{
            window.scrollY > 50 ? setSticky(true) : setSticky(false);
        })
    },[]);

  return (
        <nav className ={ `nevbar ${sticky? 'dark-nav':''}`}>
            <img src={logo} width={100} className='logo'/>
            <ul className='navlist'>
                <a href="#" className="nevlink">Home</a>
                <a href="#" className="nevlink">Flight</a>
                <a href="#" className="nevlink">Benefits</a>
                <a href="#" className="nevlink">Help</a>
            </ul>
            <div className='loginButton'>
                <Button type="primary" size="large">เข้าสู่ระบบ</Button>
            </div>

        </nav>     
  )
}

export default Nav