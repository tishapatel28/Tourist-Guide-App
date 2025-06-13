import React,{useState} from 'react'
import './Home.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { Store } from './Store';
import Login from './Login';
import { Link } from 'react-router-dom';
import Register from './User/Register';

function Home() {

    const [showRegister, setShowRegister] = useState(false);
    const handleShow = () => setShowRegister(true);
    const handleClose = () => setShowRegister(false);

    return (
        <>
            <Provider store={Store}>
                <Routes>
                    <Route path="/Login" element={<Login />} />
                    <Route path="/Register" element={<Register />} />
                </Routes>
            </Provider>

            <nav className="navbar">
                
                <div className="nav-links">
                    <Link to="/Login" className="nav-link">Login</Link>
                   
                    <button onClick={handleShow}>Register</button>
                    <Register show={showRegister} onHide={handleClose} />
                </div>
            </nav>


        </>

    )
}

export default Home