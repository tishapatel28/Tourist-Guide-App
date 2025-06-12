import React from 'react'
import './Navbar.css'

const Navbar = () => {
    return (
        <div>
            <div className="top-navbar">
                {/* <span>Tourist Guide System</span> */}
                <button className="logout-btn">
                    <i class="bi bi-box-arrow-right"></i>
                Logout</button>
            </div>
        </div>
    )
}

export default Navbar