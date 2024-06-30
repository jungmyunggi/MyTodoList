import React from 'react';
import { useState } from 'react';
import Clock from '../Clock';
import Logo from '../assets/images/logo.png';

import '../assets/styles/home/home.scss';
export default function Home() {
    return (
        <div className="home-container">
            <header className="home-header">
                <h1 className="home-header-title">MTDL</h1>
            </header>
            <nav className="home-nav"></nav>
            <section className="home-section">
                <Clock classname={'home-section-clock'} />
                <img src={Logo} className="home-section-logo"></img>
            </section>
            <footer></footer>
        </div>
    );
}
