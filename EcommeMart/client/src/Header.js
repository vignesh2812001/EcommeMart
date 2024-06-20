import React from 'react';
import './Header.css';
import { faCartPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


function Header() {
    return (
        <header className="header">
            <div className="header-logo"><FontAwesomeIcon icon={faCartPlus} className="faCartPlus1" />Ecomme Mart</div>
            <nav className="header-nav">
                <ul className="header-nav-list">
                    <li className="header-nav-item">Home</li>
                    <li className="header-nav-item">Products</li>
                    <li className="header-nav-item">Catagories</li>
                    <li className="header-nav-item">About Us</li>
                </ul>
            </nav>
            <div className="header-login-container">
                <button className="header-login-button">Exit</button>
            </div>
        </header>
    );
}

export default Header;
