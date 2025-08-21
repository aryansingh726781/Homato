

// import React, { useState } from 'react';
// import { Link, NavLink } from 'react-router-dom';
// import { FaHome, FaCartPlus, FaSignInAlt, FaUserPlus, FaBars, FaUserFriends, FaUser } from 'react-icons/fa';
// // import './Navbar.css'; // Import your CSS file

// const navLinks = [
//   { name: 'Home', path: '/', icon: <FaHome /> },
//   { name: 'Cart', path: '/cart', icon: <FaCartPlus /> },
//   { name: 'Login', path: '/login', icon: <FaSignInAlt /> },
//   { name: 'Register', path: '/register', icon: <FaUserPlus /> },
//   { name: 'Profile', path: '/profile', icon: <FaUser /> },
// ];

// const Navbar = () => {
//   const [isOpen, setIsOpen] = useState(false);

//   return (
//     <nav className="navbar">
//       <div className="navbar-container">
//         <Link to="/" className="logo">
//           Foodie
//         </Link>

//         <div className={`nav-links ${isOpen ? 'open' : ''}`}>
//           {navLinks.map((link) => (
//             <NavLink
//               key={link.name}
//               to={link.path}
//               className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
//               onClick={() => setIsOpen(false)}
//             >
//               <span className="icon">{link.icon}</span>
//               {link.name}
//             </NavLink>
//           ))}
//         </div>

//         <div className="menu-icon" onClick={() => setIsOpen(!isOpen)}>
//           <FaBars />
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;




import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import {
  FaHome,
  FaCartPlus,
  FaSignInAlt,
  FaUserPlus,
  FaBars,
  FaUser,
  FaSignOutAlt,
  FaPlus,
} from 'react-icons/fa';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  const guestLinks = [
    { name: 'Home', path: '/', icon: <FaHome /> },
    { name: 'Login', path: '/login', icon: <FaSignInAlt /> },
    { name: 'Register', path: '/register', icon: <FaUserPlus /> },
  ];

  const userLinks = [
    { name: 'Home', path: '/', icon: <FaHome /> },
    { name: 'Cart', path: '/cart', icon: <FaCartPlus /> },
    { name: 'Profile', path: '/profile', icon: <FaUser /> },
    { name: 'Add Item', path: '/AddItem', icon: <FaPlus /> },
  ];

  return (
    <nav className="navbar bg-purple-700 text-white p-4">
      <div className="navbar-container flex justify-between items-center">
        <Link to="/" className="logo text-2xl font-bold">
          Foodie
        </Link>

        <div className={`nav-links ${isOpen ? 'open' : ''} md:flex space-x-4 hidden`}>
          {(user ? userLinks : guestLinks).map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              className={({ isActive }) => `nav-link flex items-center gap-1 ${isActive ? 'text-yellow-300' : ''}`}
              onClick={() => setIsOpen(false)}
            >
              {link.icon}
              {link.name}
            </NavLink>
          ))}

          {user && (
            <button onClick={handleLogout} className="flex items-center gap-1">
              <FaSignOutAlt />
              Logout
            </button>
          )}
        </div>

        {/* Mobile menu icon */}
        <div className="menu-icon text-xl md:hidden" onClick={() => setIsOpen(!isOpen)}>
          <FaBars />
        </div>
      </div>

      {/* Mobile menu dropdown */}
      {isOpen && (
        <div className="mobile-menu flex flex-col md:hidden mt-2 bg-purple-800 p-2 rounded shadow">
          {(user ? userLinks : guestLinks).map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              className="nav-link py-2 flex items-center gap-2 text-white"
              onClick={() => setIsOpen(false)}
            >
              {link.icon}
              {link.name}
            </NavLink>
          ))}

          {user && (
            <button onClick={handleLogout} className="py-2 flex items-center gap-2 text-white">
              <FaSignOutAlt />
              Logout
            </button>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
