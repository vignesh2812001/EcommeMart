import React, { useState } from 'react';
import './MainContent.css';
import LoginForm from './LoginForm';
import Header from './Header';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

function MainContent() {
    const [formData, setFormData] = useState({
        login: "",
        password: "",
    });
    const navigate = useNavigate();

    const handleInput = (e) => {
        const { id, value } = e.target;
        setFormData({ ...formData , [id] : value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios
            .get("http://localhost:3001/viewData")
            .then((res) => {
                console.log(res.data);
                const users = res.data;
                const user = users.find(
                     (user)  => (user.username === formData.login ) && (user.password === formData.password)
                )
                if(user){
                    console.log("you have loged in successfully");
                     navigate("/home", { state: { username: user.username } })
                }
                else{
                    console.log("Enter correct credentials");
                }
            })
            .catch((error) => {
                console.log("Error", error);
            });
    };

    return (
        <>
            <div className='body'>
                <Header />
            <main className="main-content">
                <section className="intro">
                    <h1>Get Crazy with Savings, Shop Now! </h1>
                    <h2>" Click, Buy, Smile – Your Electronics Delivered! "</h2>
                    <div className="create-account">
                        <p>Don't have an account?</p>
                       <Link to='create-account'> Create account →</Link>
                    </div>
                </section>
                <section className="login-section">
                    <LoginForm data={formData} handleInput={handleInput} handleSubmit={handleSubmit} />
                </section>
            </main>
            </div>
        </>
    );
}

export default MainContent;
