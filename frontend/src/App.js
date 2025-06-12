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
import RestaurantList from './Restaurant/RestaurantList';

function App() {
  return (

    <>
      <Provider store={Store}>
        <CarList/>
      </Provider>
      

    {/* <Navbar />
      <div style={{ display: 'flex', minHeight: '100vh', background: '#f4f6fa' }}>
        <Mybar />
        <div style={{ flex: 1, display: 'flex' }}>         
        </div>
      </div> */}


    </>


  );
}

export default App;
