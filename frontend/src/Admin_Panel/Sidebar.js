// import { useState } from 'react';
// import profileImage from './profileImage.jpg';

// const sidebar = () => {
//     const [showCarDropdown, setShowCarDropdown] = useState(false);
//     const [showFlightDropDown, setShowFlightDropDown] = useState(false);
//     const [showHotelDropDown, setShowHotelDropDown] = useState(false);
//     const [showUsers, setShowUsers] = useState(false);
//     const [showRestuarntDropDown, setShowRestuarntDropDown] = useState(false);
//     const [showlocation, setShowlocation] = useState(false);

//     return (
//         <>

           

//             <div className="sidebar">
//                 <div className="sidebar-logo">
//                 </div>
//                 <div className="sidebar-profile">
//                     <img src={profileImage} alt="Profile" className="profile-img" />
//                     <div>
//                         <p>Admin</p>
//                     </div>
//                 </div>

//                 <ul className="sidebar-nav">
//                     <li>
//                         <a href="#" className="active">
//                             <i className="bi bi-speedometer2"></i>
//                             Dashboard
//                         </a>
//                     </li>
//                     <li>
//                         <a
//                             href="#"
//                             className="nav-link text-white d-flex justify-content-between align-items-center"
//                             onClick={() => setShowCarDropdown(!showCarDropdown)}
//                         >
//                             <span>
//                                 <i class="bi bi-car-front"></i>
//                                 Car
//                             </span>
//                             <i className={`bi ${showCarDropdown ? 'bi-chevron-up' : 'bi-chevron-down'} ms-2`}></i>
//                         </a>

//                         {showCarDropdown && (
//                             <ul className="nav flex-column ms-4">
//                                 <li>
                                   
//                                 </li>
//                                 <li>
//                                     <a href="#" className="nav-link text-white">
//                                         Book Cars
//                                     </a>
//                                 </li>
//                             </ul>
//                         )}
//                     </li>


//                     <li>
//                         <a
//                             href="#"
//                             className="nav-link text-white d-flex justify-content-between align-items-center"
//                             onClick={() => setShowFlightDropDown(!showFlightDropDown)}
//                         >
//                             <span>
//                                 <i class="bi bi-airplane-fill"></i>
//                                 Flight
//                             </span>
//                             <i className={`bi ${showFlightDropDown ? 'bi-chevron-up' : 'bi-chevron-down'} ms-2`}></i>
//                         </a>

//                         {showFlightDropDown && (
//                             <ul className="nav flex-column ms-4">
//                                 <li>
//                                     <a href="#" className="nav-link text-white">
//                                         See Flights
//                                     </a>
//                                 </li>
//                                 <li>
//                                     <a href="#" className="nav-link text-white">
//                                         Book Flights
//                                     </a>
//                                 </li>
//                             </ul>
//                         )}
//                     </li>
//                     <li>
//                         <a
//                             href="#"
//                             className="nav-link text-white d-flex justify-content-between align-items-center"
//                             onClick={() => setShowHotelDropDown(!showHotelDropDown)}
//                         >
//                             <span>
//                                 <i class="bi bi-building"></i>
//                                 Hotel
//                             </span>
//                             <i className={`bi ${showHotelDropDown ? 'bi-chevron-up' : 'bi-chevron-down'} ms-2`}></i>
//                         </a>

//                         {showHotelDropDown && (
//                             <ul className="nav flex-column ms-4">
//                                 <li>
//                                     <a href="#" className="nav-link text-white">
//                                         See Hotels
//                                     </a>
//                                 </li>
//                                 <li>
//                                     <a href="#" className="nav-link text-white">
//                                         Book Hotels
//                                     </a>
//                                 </li>

//                             </ul>
//                         )}
//                     </li>
//                     <li>
//                         <a
//                             href="#"
//                             className="nav-link text-white d-flex justify-content-between align-items-center"
//                             onClick={() => setShowRestuarntDropDown(!showRestuarntDropDown)}
//                         >
//                             <span>
//                                 <i class="bi bi-fork-knife"></i>
//                                 Restaurants
//                             </span>
//                             <i className={`bi ${showRestuarntDropDown ? 'bi-chevron-up' : 'bi-chevron-down'} ms-2`}></i>
//                         </a>

//                         {showRestuarntDropDown && (
//                             <ul className="nav flex-column ms-4">
//                                 <li>
//                                     <a href="#" className="nav-link text-white">
//                                         See Restaurants
//                                     </a>
//                                 </li>
//                                 <li>
//                                     <a href="#" className="nav-link text-white">
//                                         Book Restaurants
//                                     </a>
//                                 </li>

//                             </ul>
//                         )}
//                     </li>
//                     <li>
//                         <a
//                             href="#"
//                             className="nav-link text-white d-flex justify-content-between align-items-center"
//                             onClick={() => setShowlocation(!showlocation)}
//                         >
//                             <span>
//                                 <i class="bi bi-geo-alt-fill"></i>
//                                 Location
//                             </span>
//                             <i className={`bi ${showlocation ? 'bi-chevron-up' : 'bi-chevron-down'} ms-2`}></i>
//                         </a>

//                         {showlocation && (
//                             <ul className="nav flex-column ms-4">
//                                 <li>
//                                     <a href="#" className="nav-link text-white">
//                                         Locations
//                                     </a>
//                                 </li>
//                             </ul>
//                         )}
//                     </li>
//                     <li>
//                         <a
//                             href="#"
//                             className="nav-link text-white d-flex justify-content-between align-items-center"
//                             onClick={() => setShowUsers(!showUsers)}
//                         >
//                             <span>
//                                 <i class="bi bi-person-fill"></i>
//                                 User
//                             </span>
//                             <i className={`bi ${showUsers ? 'bi-chevron-up' : 'bi-chevron-down'} ms-2`}></i>
//                         </a>

//                         {showUsers && (
//                             <ul className="nav flex-column ms-4">
//                                 <li>
//                                     <a href="#" className="nav-link text-white">
//                                         Users
//                                     </a>
//                                 </li>
//                             </ul>
//                         )}
//                     </li>
//                 </ul>
//             </div>
//         </>
//     )
// }

// export default sidebar