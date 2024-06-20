import React, { useRef, useState } from 'react';
import './LoginForm.css';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

function LoginForm({ data, handleInput, handleSubmit }) {
    const [passwordVisible, setPasswordVisible] = useState(false);
    const passwordRef = useRef(null);

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
        if (passwordRef.current) {
            passwordRef.current.type = passwordVisible ? 'password' : 'text';
        }
    };

    return (
       <>
        <div className="login-form">
            <h3 className="login-form-title">Login to your account</h3>
            <form onSubmit={handleSubmit} className="login-form-container">
                <input 
                    type="text" 
                    id="login" 
                    className="login-form-input" 
                    placeholder="Username" 
                    value={data.login} 
                    onChange={handleInput} 
                />
                <div className='login-form-pass'>
                    <input 
                        type="password" 
                        id="password" 
                        className="login-form-password" 
                        placeholder="Password" 
                        value={data.password} 
                        onChange={handleInput} 
                        ref={passwordRef} 
                    />
                    <div className='login-form-visibleIcon' onClick={togglePasswordVisibility}>
                        <FontAwesomeIcon icon={passwordVisible ? faEyeSlash : faEye} />
                    </div>
                </div>
                <div className="login-form-options">
                    <label className="login-form-remember">
                        <input type="checkbox" className="login-form-checkbox"/>
                        Remember me
                    </label>
                    <Link to='/forget-pass' className="login-form-forgetPass">Forgot your password?</Link>
                </div>
                <button type="submit" className="login-form-button">Login</button>
            </form>
        </div>
       </>
    );
}

export default LoginForm;
