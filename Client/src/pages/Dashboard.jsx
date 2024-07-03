import React, { useState } from 'react';
import Nav from '../components/Nav';
import Home from '../components/Views/Home';
import Todo from '../components/Views/Todo';
import MyPage from '../components/Views/Mypage';
export default function Dashboard() {
    const [activeSection, setActiveSection] = useState(1);

    const renderSection = () => {
        switch (activeSection) {
            case 1:
                return <Todo />;
            case 2:
                return <Home />;
            case 3:
                return <MyPage />;
            default:
                return null;
        }
    };

    return (
        <div className='dashboard-container'>
            <header className='dashboard-header'></header>
            <nav className='dashboard-nav'>
                <Nav onSelectSection={setActiveSection} />
            </nav>
            <section className='dashboard-section'>
                {renderSection()}
            </section>
            <footer className='dashboard-footer'></footer>
        </div>
    );
}
