import React, { useRef, useState } from "react";
import Header from "../Header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import {  useNavigate } from "react-router-dom";
import axios from "axios";
import "./Admin.css";

function Admin() {
    const [userData, setUserData] = useState({
        adminName: "",
        password: "",
        role: "admin"
    });
    const [passwordVisible, setPasswordVisible] = useState(false);
    const passwordRef = useRef(null);

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
        if (passwordRef.current) {
            passwordRef.current.type = passwordVisible ? 'password' : 'text';
        }
    };

    const usenavigate = useNavigate();

    const handleInput = (e) => {
        const { id, value } = e.target;
        setUserData({ ...userData, [id]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        axios.get("http://localhost:3001/viewData").then((res) => {
            const admin = res.data;
            const adminLogin = admin.find(
                (adminLogin) => 
                    (adminLogin.username === userData.adminName) &&
                    (adminLogin.password === userData.password) &&
                    (adminLogin.role === userData.role)
            );
            if (adminLogin) {
                usenavigate('/admin');
            } else {
                console.log("The admin was not logged in");
            }
        }).catch((error) => {
            console.log("Error: ", error);
        });
    };

    return (
        <>
        <div className="body">
            <Header />
            <div className="admin-login-form">
                <h3>Login to your Admin Pannel </h3>
                <form onSubmit={handleSubmit} className="admin-form">
                    <input
                        type="text"
                        id="adminName"
                        className="admin-input"
                        placeholder="Admin"
                        value={userData.adminName}
                        onChange={handleInput}
                    />
                    <div className="admin-pass">
                        <input
                            type="password"
                            id="password"
                            className="admin-password-input"
                            placeholder="Password"
                            value={userData.password}
                            onChange={handleInput}
                            ref={passwordRef}
                        />
                        <div className="admin-visible-icon" onClick={togglePasswordVisibility}>
                            <FontAwesomeIcon icon={passwordVisible ? faEyeSlash : faEye} />
                        </div>
                    </div>
                    <button type="submit" className="admin-submit-button">Login</button>
                </form>
            </div>

        </div>
        </>
    );
}

export default Admin;
