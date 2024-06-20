import React, { useState } from 'react';
import Header from './Header';
import './CreateAccount.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

function Forget() {
    const [formData, setFormData] = useState({
        username: "",
        email : "",
        password: "",
    });

    const handleInput = (e) => {
        const { id, value } = e.target;
        setFormData({ ...formData, [id]: value });
    };

   const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();    
         axios.post("http://localhost:3001/addRecored", formData)
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
            <main className="Main-content">
                <section className="Intro">
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="login">User Name</label>
                        <input 
                            type="text" 
                            id="username" 
                            placeholder="Username" 
                            value={formData.login} 
                            onChange={handleInput} 
                        />

                        <label htmlFor="email">Email</label>
                        <input 
                            type="email" 
                            id="email" 
                            placeholder="AsglobalSoftTech02@gmail.com" 
                            value={formData.email} 
                            onChange={handleInput} 
                        />
                        
                        <label htmlFor="password">Password</label>
                        <input 
                            type="password" 
                            id="password" 
                            placeholder="Password" 
                            value={formData.password} 
                            onChange={handleInput} 
                        />

                        <div className="Form-options">
                            <label>
                                <input type="checkbox" />
                                Remember me
                            </label>
                        </div>
                        <button type="submit">SignUp</button>
                        <div className='signin-button'>
                            <h3>If You Already Register Make SignIn </h3>
                            <Link to='/'><a>Signin</a></Link>
                        </div>
                        
                    </form>
                </section>
            </main>
        </>
    );
}

export default Forget;
