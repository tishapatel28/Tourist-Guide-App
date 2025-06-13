import logo from './logo.svg';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import { Store } from './Store';
import CarList from './Car/CarList';
import { Provider } from 'react-redux';
import { Link } from 'react-router-dom';
import LocationComponent from './Location/LocationComponent';
import LocationList from './Location/LocationList';
import DashboardBox from './Admin_Panel/DashboardBox';
import Mybar from './Admin_Panel/Mybar';
import Navbar from './Admin_Panel/Navbar';
import { FaDollarSign, FaThumbsUp, FaShareAlt, FaStar } from 'react-icons/fa';
import Home from './Home';
import Home2 from './Home2';
import { useEffect } from 'react';


function App() {
 
  
 
  return (

   

    <>

      <Routes>
        <Route path="/Mybar" element={<Mybar />} />
        <Route path="/Home2" element={<Home2/>}/>
      </Routes>

      {/* <Provider store={Store}>
       <RestaurantList/>
      </Provider> */}


      {/* <Navbar />
      <div style={{ display: 'flex', minHeight: '100vh', background: '#f4f6fa' }}>
        <Mybar />
        <div style={{ flex: 1, display: 'flex' }}>         
        </div>
      </div> */}


      <Home />

    </>
 

  );
}

export default App;



