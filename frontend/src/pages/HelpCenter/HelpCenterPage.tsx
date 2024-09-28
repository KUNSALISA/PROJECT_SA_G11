/* import React, { useState, useEffect } from 'react'; 
import './HelpCenterPage.css';  
import logo from '../../assets/logo.png';
import emailjs from 'emailjs-com'; 
import { GetNotifications, sendDataToBackend } from '../../Service/helpindex'; 
import { MyinboxInterface } from '../../interfaces/myinbox'; 

const HelpCenterPage = () => {
    const [activeTab, setActiveTab] = useState('request');
    const [expandedTopic, setExpandedTopic] = useState<string | null>(null);
    const [notifications, setNotifications] = useState<MyinboxInterface[]>([]); 
    const [isDropdownOpen, setIsDropdownOpen] = useState(false); 

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    // สถานะสำหรับข้อมูลฟอร์ม
    const [formData, setFormData] = useState({
        category: '',
        firstname: '',
        lastname: '',
        email: '',
        subject: '',
        mobile: '',
        message: '',
    });

    // ดึงชื่อจริงของผู้ใช้จาก local storage
    const firstname = localStorage.getItem("firstname") || "User"; // ถ้าไม่พบให้ตั้งค่าเป็น "User"

    const topicDetails: Record<string, string> = {
        'ฉันสามารถเปลี่ยนเที่ยวบินได้หรือไม่?': 'คุณสามารถเปลี่ยนเที่ยวบินได้...',
        'ฉันจะแก้ไขข้อมูลนักเดินทางได้อย่างไร?': 'คุณสามารถแก้ไขข้อมูลนักเดินทาง...',
        'ฉันสามารถยกเลิกตั๋วของฉันหรือตั๋วของหนึ่งในนักเดินทางได้หรือไม่?': 'สามารถยกเลิกตั๋วได้...',
        'หลังจากที่ทำการชำระเงินเสร็จสิ้น ไม่ได้รับการยืนยัน': 'หากคุณไม่ได้รับการยืนยัน...',
        'ฉันต้องการเพิ่มกระเป้าหมายเกินน้ำหนัก': 'คุณสามารถเพิ่มน้ำหนักกระเป๋า...'
    };

    useEffect(() => {
        const fetchNotifications = async () => {
            if (activeTab === 'inbox') {
                const memberId = localStorage.getItem("memberId");
                if (memberId) {
                    try {
                        const response = await GetNotifications(memberId);
                        if (response && response.data) {
                            setNotifications(response.data);
                        }
                    } catch (error) {
                        console.error('Error fetching notifications:', error);
                    }
                }
            }
        };
        fetchNotifications();
    }, [activeTab]);

    const handleNotificationClick = async (id: number) => {
        const updatedNotifications = notifications.map(notification => 
            notification.ID === id ? { ...notification, Read: true } : notification
        );
        setNotifications(updatedNotifications);
    };

    const renderContent = () => {
        if (activeTab === 'request') {
            return (
                <div>
                    <form onSubmit={handleSubmit}>
                        <label>
                            Category:
                            <select value={formData.category} onChange={e => setFormData({ ...formData, category: e.target.value })}>
                                <option value="" disabled>Choose a category</option>
                                <option value="Check Status">Check Status</option>
                                <option value="Booking Issue">Booking Issue</option>
                                <option value="Payment">Payment</option>
                                <option value="Bug Report">Bug Report</option>
                                <option value="Others">Others</option>
                            </select>
                        </label>
                        <div>
                            Firstname:
                            <input type="text" placeholder="Enter your firstname" value={formData.firstname} onChange={e => setFormData({ ...formData, firstname: e.target.value })} />
                        </div>
                        <div>
                            Lastname:
                            <input type="text" placeholder="Enter your lastname" value={formData.lastname} onChange={e => setFormData({ ...formData, lastname: e.target.value })} />
                        </div>
                        <div>
                            Email:
                            <input type="email" placeholder="emailAddress@email.com" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} />
                        </div>
                        <div>
                            Subject:
                            <input type="text" placeholder="Enter a subject" value={formData.subject} onChange={e => setFormData({ ...formData, subject: e.target.value })} />
                        </div>
                        <div>
                            Mobile Phone:
                            <input type="text" placeholder="ex. 0987654321" value={formData.mobile} onChange={e => setFormData({ ...formData, mobile: e.target.value })} />
                        </div>
                        <div>
                            Message:
                            <textarea placeholder="Message" value={formData.message} onChange={e => setFormData({ ...formData, message: e.target.value })}></textarea>
                        </div>
                        <button className="submit-btn" type="submit">Submit</button>
                    </form>
                </div>
            );
        } else {
            return (
                <div>
                    <ul>
                        {notifications.length > 0 ? (
                            notifications.map(notification => (
                                <li 
                                    key={notification.ID}
                                    onClick={() => handleNotificationClick(notification.ID!)} 
                                    style={{ cursor: 'pointer', fontWeight: notification.Read ? 'normal' : 'bold' }}
                                >
                                    {notification.Context}
                                </li>
                            ))
                        ) : (
                            <li>No notifications found.</li>
                        )}
                    </ul>
                </div>
            );
        }
    };

    const toggleTopic = (topic: string) => {
        setExpandedTopic(expandedTopic === topic ? null : topic);
    };

    const validateEmail = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const validatePhone = (phone: string) => {
        const mobileRegex = /^(08|09)\d{8}$/; 
        const landlineRegex = /^0\d{7,8}$/; 
        return mobileRegex.test(phone) || landlineRegex.test(phone);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const { category, firstname, lastname, email, subject, mobile, message } = formData;

        if (!category || !firstname || !lastname || !email || !subject || !mobile || !message) {
            alert("Please fill in all required fields.");
            return;
        }

        if (!message.trim()) {
            alert("Message cannot be empty.");
            return;
        }

        if (!validateEmail(email)) {
            alert("Please enter a valid email address.");
            return;
        }

        if (!validatePhone(mobile)) {
            alert("Please enter a valid mobile phone number (starts with 08 or 09 and has 10 digits) or a landline number (0 followed by 7-8 digits).");
            return;
        }

        try {
            await emailjs.send('service_d959ncb', 'template_6dn09so', formData, 'hQoGaRJYy6M3H-1Pg');
            console.log('Email sent successfully!');

            const backendResponse = await sendDataToBackend({
                Category: category,
                FirstName: firstname,
                LastName: lastname,
                Email: email,
                Subject: subject,
                MobilePhone: mobile,
                Message: message,
            });
            console.log('Data saved successfully:', backendResponse);

            alert("Your request has been sent and saved successfully!");
            setFormData({
                category: '',
                firstname: '',
                lastname: '',
                email: '',
                subject: '',
                mobile: '',
                message: '',
            });

        } catch (error) {
            console.error('Error submitting form:', error);
            alert("Failed to send request. Please try again later.");
        }
    };

    return (
        <div>
            <header>
                <img alt="logo" src={logo} className="logo" />
                <nav>
                    <a href="/">Home</a>
                    <a href="/flight">Flight</a>
                    <a href="/benefits">Benefits</a>
                    <a href="/HelpCenterPage">Help Center</a>
                </nav>

                <div className="navRight">
                    <div className="userMenu">
                        <button onClick={toggleDropdown} className="userButton">
                            {firstname}
                        </button>
                        {isDropdownOpen && (
                            <div className="dropdownMenu">
                                <a href="/logout">Logout</a>
                            </div>
                        )}
                    </div>
                </div>
            </header>
            <div className="banner">
                <h2>Hi, how can we help you?</h2>
            </div>
            <div className="search-bar">
                <input type="text" placeholder="Type any question or keyword" />
                <button>Search</button>
            </div>
            <div className="container">
                <div className="sidebar featured-topics">
                    <h3>Most Featured Topics</h3>
                    <ul>
                        {Object.keys(topicDetails).map(topic => (
                            <li key={topic} className="topic-item" onClick={() => toggleTopic(topic)}>
                                <span>{topic}</span>
                                <span style={{ float: 'right' }}>{expandedTopic === topic ? '-' : '+'}</span>
                                {expandedTopic === topic && (
                                    <div className="topic-details">
                                        <p>{topicDetails[topic]}</p>
                                    </div>
                                )}
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="content">
                    <div className="tab">
                        <button className={activeTab === 'request' ? 'active' : ''} onClick={() => setActiveTab('request')}>
                            Mail Us Your Request
                        </button>
                        <button className={activeTab === 'inbox' ? 'active' : ''} onClick={() => setActiveTab('inbox')}>
                            My Inbox
                        </button>
                    </div>
                    <div className="tab-content">
                        {renderContent()}
                    </div>
                </div>
            </div>
            <footer>
                <p>&copy; {new Date().getFullYear()} FlyAwaywithSA. All Rights Reserved.</p>
            </footer>
        </div>
    );
};

export default HelpCenterPage; */

import React, { useState, useEffect } from 'react'; 
import './HelpCenterPage.css';  
import logo from '../../assets/logo.png';
import emailjs from 'emailjs-com'; 
import { GetNotifications, sendDataToBackend } from '../../Service/helpindex'; 
import { MyinboxInterface } from '../../interfaces/myinbox'; 
import { Member } from '../../interfaces/member.interface'; 

const HelpCenterPage = () => {
    const [activeTab, setActiveTab] = useState('request');
    const [expandedTopic, setExpandedTopic] = useState<string | null>(null);
    const [notifications, setNotifications] = useState<MyinboxInterface[]>([]); 
    const [isDropdownOpen, setIsDropdownOpen] = useState(false); 

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    // สถานะสำหรับข้อมูลฟอร์ม
    const [formData, setFormData] = useState({
        Category: '',
        FirstName: '',
        LastName: '',
        Email: '',
        Subject: '',
        MobilePhone: '',
        Message: '',
    });

    // ดึงชื่อจริงของผู้ใช้จาก local storage
    const firstname = localStorage.getItem("FirstName") || "User"; // ถ้าไม่พบให้ตั้งค่าเป็น "User"

    const topicDetails: Record<string, string> = {
        'ฉันสามารถเปลี่ยนเที่ยวบินได้หรือไม่?': 'คุณสามารถเปลี่ยนเที่ยวบินได้...',
        'ฉันจะแก้ไขข้อมูลนักเดินทางได้อย่างไร?': 'คุณสามารถแก้ไขข้อมูลนักเดินทาง...',
        'ฉันสามารถยกเลิกตั๋วของฉันหรือตั๋วของหนึ่งในนักเดินทางได้หรือไม่?': 'สามารถยกเลิกตั๋วได้...',
        'หลังจากที่ทำการชำระเงินเสร็จสิ้น ไม่ได้รับการยืนยัน': 'หากคุณไม่ได้รับการยืนยัน...',
        'ฉันต้องการเพิ่มกระเป้าหมายเกินน้ำหนัก': 'คุณสามารถเพิ่มน้ำหนักกระเป๋า...'
    };

    useEffect(() => {
        const fetchNotifications = async () => {
            if (activeTab === 'inbox') {
                const MemberId = localStorage.getItem("MemberId");
                if (MemberId) {
                    try {
                        const response = await GetNotifications(MemberId);
                        if (response && response.data) {
                            setNotifications(response.data);
                        }
                    } catch (error) {
                        console.error('Error fetching notifications:', error);
                    }
                }
            }
        };
        fetchNotifications();
    }, [activeTab]);

    const handleNotificationClick = async (id: number) => {
        const updatedNotifications = notifications.map(notification => 
            notification.ID === id ? { ...notification, Read: true } : notification
        );
        setNotifications(updatedNotifications);
    };

    const renderContent = () => {
        if (activeTab === 'request') {
            return (
                <div>
                    <form onSubmit={handleSubmit}>
                        <label>
                            Category:
                            <select value={formData.Category} onChange={e => setFormData({ ...formData, Category: e.target.value })}>
                                <option value="" disabled>Choose a category</option>
                                <option value="Check Status">Check Status</option>
                                <option value="Booking Issue">Booking Issue</option>
                                <option value="Payment">Payment</option>
                                <option value="Bug Report">Bug Report</option>
                                <option value="Others">Others</option>
                            </select>
                        </label>
                        <div>
                            Firstname:
                            <input type="text" placeholder="Enter your firstname" value={formData.FirstName} onChange={e => setFormData({ ...formData, FirstName: e.target.value })} />
                        </div>
                        <div>
                            Lastname:
                            <input type="text" placeholder="Enter your lastname" value={formData.LastName} onChange={e => setFormData({ ...formData, LastName: e.target.value })} />
                        </div>
                        <div>
                            Email:
                            <input type="email" placeholder="emailAddress@email.com" value={formData.Email} onChange={e => setFormData({ ...formData, Email: e.target.value })} />
                        </div>
                        <div>
                            Subject:
                            <input type="text" placeholder="Enter a subject" value={formData.Subject} onChange={e => setFormData({ ...formData, Subject: e.target.value })} />
                        </div>
                        <div>
                            Mobile Phone:
                            <input type="text" placeholder="ex. 0987654321" value={formData.MobilePhone} onChange={e => setFormData({ ...formData, MobilePhone: e.target.value })} />
                        </div>
                        <div>
                            Message:
                            <textarea placeholder="Message" value={formData.Message} onChange={e => setFormData({ ...formData, Message: e.target.value })}></textarea>
                        </div>
                        <button className="submit-btn" type="submit">Submit</button>
                    </form>
                </div>
            );
        } else {
            return (
                <div>
                    <ul>
                        {notifications.length > 0 ? (
                            notifications.map(notification => (
                                <li 
                                    key={notification.ID}
                                    onClick={() => handleNotificationClick(notification.ID!)} 
                                    style={{ cursor: 'pointer', fontWeight: notification.Read ? 'normal' : 'bold' }}
                                >
                                    {notification.Context}
                                </li>
                            ))
                        ) : (
                            <li>No notifications found.</li>
                        )}
                    </ul>
                </div>
            );
        }
    };

    const toggleTopic = (topic: string) => {
        setExpandedTopic(expandedTopic === topic ? null : topic);
    };

    const validateEmail = (Email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(Email);
    };

    const validatePhone = (MobilePhone: string) => {
        const mobileRegex = /^(08|09)\d{8}$/; 
        const landlineRegex = /^0\d{7,8}$/; 
        return mobileRegex.test(MobilePhone) || landlineRegex.test(MobilePhone);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const { Category, FirstName, LastName, Email, Subject, MobilePhone, Message } = formData;
    
        if (!Category || !FirstName || !LastName || !Email || !Subject || !MobilePhone || !Message) {
            alert("Please fill in all required fields.");
            return;
        }
    
        if (!Message.trim()) {
            alert("Message cannot be empty.");
            return;
        }
    
        if (!validateEmail(Email)) {
            alert("Please enter a valid email address.");
            return;
        }
    
        if (!validatePhone(MobilePhone)) {
            alert("Please enter a valid mobile phone number.");
            return;
        }
    
        try {
            // Send email
            await emailjs.send('service_d959ncb', 'template_6dn09so', formData, 'hQoGaRJYy6M3H-1Pg');
            console.log('Email sent successfully!');
    
            // Save data to backend
            const backendResponse = await sendDataToBackend(formData);
            console.log('Data saved successfully:', backendResponse);
    
            alert("Your request has been sent and saved successfully!");
            setFormData({
                Category: '',
                FirstName: '',
                LastName: '',
                Email: '',
                Subject: '',
                MobilePhone: '',
                Message: '',
            });
    
        } catch (error) {
            console.error('Error submitting form:', error);
            alert("Failed to send request. Please try again later.");
        }
    };
    
    return (
        <div>
            <header>
                <img alt="logo" src={logo} className="logo" />
                <nav>
                    <a href="/">Home</a>
                    <a href="/flight">Flight</a>
                    <a href="/benefits">Benefits</a>
                    <a href="/HelpCenterPage">Help Center</a>
                </nav>

                <div className="navRight">
                    <div className="userMenu">
                        <button onClick={toggleDropdown} className="userButton">
                            {firstname}  {/* แสดงชื่อจริงของผู้ใช้ */}
                        </button>
                        {isDropdownOpen && (
                            <div className="dropdownMenu">
                                <a href="/logout">Logout</a>
                            </div>
                        )}
                    </div>
                </div>
            </header>
            <div className="banner">
                <h2>Hi, how can we help you?</h2>
            </div>
            <div className="search-bar">
                <input type="text" placeholder="Type any question or keyword" />
                <button>Search</button>
            </div>
            <div className="container">
                <div className="sidebar featured-topics">
                    <h3>Most Featured Topics</h3>
                    <ul>
                        {Object.keys(topicDetails).map(topic => (
                            <li key={topic} className="topic-item" onClick={() => toggleTopic(topic)}>
                                <span>{topic}</span>
                                <span style={{ float: 'right' }}>{expandedTopic === topic ? '-' : '+'}</span>
                                {expandedTopic === topic && (
                                    <div className="topic-details">
                                        <p>{topicDetails[topic]}</p>
                                    </div>
                                )}
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="content">
                    <div className="tab">
                        <button className={activeTab === 'request' ? 'active' : ''} onClick={() => setActiveTab('request')}>
                            Mail Us Your Request
                        </button>
                        <button className={activeTab === 'inbox' ? 'active' : ''} onClick={() => setActiveTab('inbox')}>
                            My Inbox
                        </button>
                    </div>
                    <div className="tab-content">
                        {renderContent()}
                    </div>
                </div>
            </div>
            <footer>
                <p>&copy; {new Date().getFullYear()} FlyAwaywithSA. All Rights Reserved.</p>
            </footer>
        </div>
    );
};

export default HelpCenterPage;