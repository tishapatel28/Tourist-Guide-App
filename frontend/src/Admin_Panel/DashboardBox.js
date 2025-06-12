import React from 'react';
import './DashboardBox.css';


const data = [
  { title: 'Cars', iconClass: 'bi bi-car-front-fill', backgroundColor: '	#E53935' },
  { title: 'Flights', iconClass: 'bi bi-airplane', backgroundColor: '#3F51B5' },
  { title: 'Hotel', iconClass: 'bi bi-building', backgroundColor: '	#27AE60' },
  { title: 'Restaurants', iconClass: 'bi bi-fork-knife', backgroundColor: '#EC7063' },
  { title: 'Users', iconClass: 'bi bi-people-fill', backgroundColor: '#2980B9' },
  { title: 'Location', iconClass: 'bi bi-geo-alt-fill', backgroundColor: '#D35400' },
];

const DashboardBox = () => {
  return (
    <div className="dashboard-container">
      {data.map(({ title, iconClass, backgroundColor }, index) => (
        <div
          key={index}
          className="dashboard-box"
          style={{ backgroundColor }}
        >
          <div className="dashboard-box-header">
            <span className="title">{title}</span>
            <i className={iconClass}></i>
          </div>
        </div>
      ))}
    </div>
  );
};
// const DashboardBox = () => (
//   <div style={{
//     margin: 'auto',
//     marginTop: '3rem',
//     width: '60%',
//     background: '#fff',
//     borderRadius: '12px',
//     boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
//     padding: '2rem',
//     textAlign: 'center'
//   }}>
//     <h2>Dashboard</h2>
//     <p>Welcome to your dashboard!</p>
//   </div>
// );


export default DashboardBox;
