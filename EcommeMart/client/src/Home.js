import React from 'react';
import { useLocation } from 'react-router-dom';
import Ecommerce from './Ecommerce';

function Home() {
    const location = useLocation();
    const { username } = location.state || { username: 'Guest' };

    return (
        <>
        <div>
            <Ecommerce username={username}/>
        </div>
        </>
        
    );
}

export default Home;
