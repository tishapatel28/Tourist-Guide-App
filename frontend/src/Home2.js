import React, { useState } from 'react'
import './Home.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


function Home2() {

    const [showRegister, setShowRegister] = useState(false);
    const handleShow = () => setShowRegister(true);
    const handleClose = () => setShowRegister(false);
    const navigate = useNavigate();

    return (
        <>
            <nav className="navbar">

                <div className="nav-links">
                    <button onClick={() => {  localStorage.removeItem('user'); navigate('/Login'); }}>Logout</button>
                </div>
            </nav>
<p></p>

        </>

    )
}

export default Home2