import React, { useEffect, useState } from 'react';
import './Header.css';
import SearceModul from './SearchModul/SearceModul';
import re from '../../assets/re.jpg'
import Nav from './Nav/Nav';
import './Nav/์Nav.css'

export const Home = () => {

  return (
    <div className='dark-nav'>
    <Nav/>
    <div className='Home'>
      <div className='image'>
        <h1>จองเลย!</h1>
        <h2>ค้นหาเที่ยวบินมากมายจากทั่วทุกมุมโลก</h2>
      </div>
      <SearceModul/>
    </div>

    <div className='recomment'>
        
        <div className="recom">
            <h1>สถานที่แนะนำ</h1>
        </div>
        <div className="cart">
            <img src={re}/>
            <h1>sdgfhgkjkl;'dxfhhkjkl</h1>
            <h2>sdgfhgkjkl;'dxfhhkjkl</h2>    
        </div>
        <div className="cart">
            <img src={re}/>
            <h1>sdgfhgkjkl;'dxfhhkjkl</h1>
            <h2>sdgfhgkjkl;'dxfhhkjkl</h2>    
        </div>
        <div className="cart">
            <img src={re}/>
            <h1>sdgfhgkjkl;'dxfhhkjkl</h1>
            <h2>sdgfhgkjkl;'dxfhhkjkl</h2>    
        </div>
        <div className="cart">
            <img src={re}/>
            <h1>sdgfhgkjkl;'dxfhhkjkl</h1>
            <h2>sdgfhgkjkl;'dxfhhkjkl</h2>    
        </div>
        <div className="cart">
            <img src={re}/>
            <h1>sdgfhgkjkl;'dxfhhkjkl</h1>
            <h2>sdgfhgkjkl;'dxfhhkjkl</h2>    
        </div>
        <div className="cart">
            <img src={re}/>
            <h1>sdgfhgkjkl;'dxfhhkjkl</h1>
            <h2>sdgfhgkjkl;'dxfhhkjkl</h2>    
        </div>
        <div className="cart">
            <img src={re}/>
            <h1>sdgfhgkjkl;'dxfhhkjkl</h1>
            <h2>sdgfhgkjkl;'dxfhhkjkl</h2>    
        </div>
        <div className="cart">
            <img src={re}/>
            <h1>sdgfhgkjkl;'dxfhhkjkl</h1>
            <h2>sdgfhgkjkl;'dxfhhkjkl</h2>    
        </div>
    </div>
    </div>
  );
}

export default Home;
