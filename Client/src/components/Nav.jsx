import React, { useState } from 'react';
import '../assets/styles/commons/nav.scss';

export default function Nav({ sectionNumber = 1 }) {
    const [activeSection, setActiveSection] = useState(sectionNumber);

    const handleNavClick = (section) => {
        setActiveSection(section);
    };

    return (
        <nav className="nav-container">
            <ul className="nav-list">
                <li className={`nav-item ${activeSection === 1 ? 'active' : ''}`} onClick={() => handleNavClick(1)}>
                    투두리스트
                </li>
                <li className={`nav-item ${activeSection === 2 ? 'active' : ''}`} onClick={() => handleNavClick(2)}>
                    홈
                </li>
                <li className={`nav-item ${activeSection === 3 ? 'active' : ''}`} onClick={() => handleNavClick(3)}>
                    마이페이지
                </li>
            </ul>
            <hr />
        </nav>
    );
}
