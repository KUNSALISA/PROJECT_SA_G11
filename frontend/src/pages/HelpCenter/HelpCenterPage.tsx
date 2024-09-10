import React, { useState } from 'react';
import './HelpCenterPage.css';  // นำเข้าไฟล์ CSS

const HelpCenterPage = () => {
    const [activeTab, setActiveTab] = useState('request');
    const [expandedTopic, setExpandedTopic] = useState<string | null>(null);

    // ฟังก์ชันสำหรับ render เนื้อหาใน tab
    const renderContent = () => {
        if (activeTab === 'request') {
            return (
                <div>
                    {/* <h2>Mail Us Your Request</h2> */}
                    <form>
                        <label>
                            Category:
                            <select>
                                <option value="">Choose a category</option>
                                <option value="Check Status">Check Status</option>
                                <option value="Booking Issue">Booking Issue</option>
                                <option value="Payment">Payment</option>
                                <option value="Bug Report">Bug Report</option>
                                <option value="Others">Others</option>
                            </select>
                        </label>
                        <div>
                            <input type="text" placeholder="Firstname" />
                            <input type="text" placeholder="Lastname" />
                        </div>
                        <input type="email" placeholder="Email" />
                        <input type="text" placeholder="Subject" />
                        <input type="text" placeholder="Mobile Phone" />
                        <textarea placeholder="Message"></textarea>
                        <button className="submit-btn" type="submit">Submit</button>
                    </form>
                </div>
            );
        } else {
            return (
                <div>
                    {/* <h2>My Inbox</h2> */}
                    <ul>
                        <li>Notification 1</li>
                        <li>Notification 2</li>
                    </ul>
                </div>
            );
        }
    };

    const toggleTopic = (topic: string) => {
        setExpandedTopic(expandedTopic === topic ? null : topic);
    };

    return (
        <div>
            {/* <header>
                <h1>Help Center</h1>
            </header> */}
            <nav>
                <a href="/">Home</a>
                <a href="/flight">Flight</a>
                <a href="/benefits">Benefits</a>
                <a href="/help-center">Help Center</a>
            </nav>
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
                        {['Can I Change my flight?', 'Topic2', 'Topic3', 'Topic4', 'Topic5'].map(topic => (
                            <li key={topic} onClick={() => toggleTopic(topic)}>
                                {topic} {expandedTopic === topic ? '-' : '+'}
                                {expandedTopic === topic && (
                                    <div className="topic-details">
                                        <p>Details about {topic}...</p>
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
                    {renderContent()}
                </div>
            </div>
        </div>
    );
};

export default HelpCenterPage;
