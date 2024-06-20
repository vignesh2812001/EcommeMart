import React, { useState } from 'react';
import Header from './Header';
import './CreateAccount.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

function CreateAccount() {
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
    });

    const handleInput = (e) => {
        const { id, value } = e.target;
        setFormData({ ...formData, [id]: value });
    };

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();    
        axios.post("http://localhost:3001/formData", formData)
            .then((res) => {
                console.log(res.data);
                console.log("The data is added successfully");
                navigate("/");
            })
            .catch((error) => {
                console.log("Error", error);
            });
        console.log(formData);
    };

    return (
        <>
            <Header />
            <div className='createAccount'>
                <main className="main-content">
                <section className="intro">
                    <form onSubmit={handleSubmit} className="create-account-form">
                        <label htmlFor="username" className="form-label">User Name</label>
                        <input 
                            type="text" 
                            id="username" 
                            className="form-input" 
                            placeholder="Username" 
                            value={formData.username} 
                            onChange={handleInput} 
                        />

                        <label htmlFor="email" className="form-label">Email</label>
                        <input 
                            type="email" 
                            id="email" 
                            className="form-input" 
                            placeholder="AsglobalSoftTech02@gmail.com" 
                            value={formData.email} 
                            onChange={handleInput} 
                        />
                        
                        <label htmlFor="password" className="form-label">Password</label>
                        <input 
                            type="password" 
                            id="password" 
                            className="form-input" 
                            placeholder="Password" 
                            value={formData.password} 
                            onChange={handleInput} 
                        />

                        <div className="form-options">
                            <label className="form-remember-me">
                                <input type="checkbox" className="form-checkbox"/>
                                Remember me
                            </label>
                        </div>
                        <button type="submit" className="form-submit-button">SignUp</button>
                        <div className="signin-section">
                            <h3 className="signin-text">If You Already Register Make SignIn</h3>
                            <Link to="/" className="signin-link">Signin</Link>
                        </div>
                    </form>
                </section>
            </main>
            </div>
        </>
    );
}

export default CreateAccount;
