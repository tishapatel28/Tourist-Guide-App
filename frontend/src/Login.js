import React, { useState } from 'react';
import axios from 'axios';
import { Url } from './URL/Url';
import { useNavigate } from 'react-router-dom';

function Login() {
    const [email, setemail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handlesubmit = async (e) => {
        e.preventDefault();

        try {
            // Call API
            const res = await axios.post(
                Url.Login,
                { email: email, PasswordHash: password },
                { headers: { 'Content-Type': 'application/json' } }
            );

            console.log('Login response:', res.data);

            if (res.data) {
                const user = {
                    email: email,
                    token: res.data.token,
                    name: res.data.Name 
                };
                localStorage.setItem('user', JSON.stringify(user));
                console.log('User logged in');
                console.log('Name is',res.data.Name);

                if (email === 'admin@gmail.com' && password === 'Admin@12') {
                    navigate('/Mybar');
                } else {
                    navigate('/Home2');
                }
            } else {
                alert('Invalid credentials');
            }
        } catch (err) {
            console.error(err.response?.data || err.message);
            alert('Login failed. Check credentials.');
        }
    };

    return (
        <>
            <h2>Login</h2><br />
            <label>Email</label>
            <input type="email" onChange={(e) => setemail(e.target.value)} /><br />

            <label>Password</label>
            <input type="password" onChange={(e) => setPassword(e.target.value)} /><br />

            <button onClick={handlesubmit}>Login</button>
        </>
    );
}

export default Login;
