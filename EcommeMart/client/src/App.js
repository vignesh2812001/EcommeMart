import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainContent from './MainContent';
import Home from './Home';
import CreateAccount from './CreateAccount';
import Forget from './Forget';
import Admin from './admin/Admin';
import AdminHome from './admin/AdminHome';
import AddProducts from './admin/AddProducts';
import AdminProduts from './admin/AdminProduts';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<MainContent />} />
                <Route path="/home" element={<Home />} />
                <Route path="/create-account" element={<CreateAccount />} />
                <Route path="/forget-pass" element={<Forget/>} />
                <Route path='/admin-login' element={<Admin/>}/>
                <Route path='/admin' element={<AdminHome/>}/>
                <Route path="/admin-add-products" element={<AddProducts/>}/>
                <Route path="/adminProduts" element={<AdminProduts/>}/>
            </Routes>
        </Router>
    );
}

export default App;
