// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import { FaUserCircle } from 'react-icons/fa';

// const ProfilePage = () => {
//   const navigate = useNavigate();
//   const user = JSON.parse(localStorage.getItem('user'));

//   const handleLogout = () => {
//     localStorage.removeItem('user');
//     navigate('/login');
//   };

//   if (!user) {
//     return (
//       <div className="text-center mt-10">
//         <p className="text-xl text-gray-600">User not logged in.</p>
//         <button
//           onClick={() => navigate('/login')}
//           className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
//         >
//           Go to Login
//         </button>
//       </div>
//     );
//   }


//   return (
//     <div className="max-w-md mx-auto mt-10 p-6 shadow-lg rounded-lg bg-white">
//       <div className="flex flex-col items-center">
//         <FaUserCircle className="text-6xl text-indigo-500 mb-4" />
//         <h2 className="text-2xl font-bold text-gray-800">{user.name}</h2>
//         <p className="text-gray-600">{user.email}</p>
//         <button
//           onClick={handleLogout}
//           className="mt-6 px-6 py-2 bg-red-500 text-white rounded hover:bg-red-600"
//         >
//           Logout
//         </button>
//       </div>
//     </div>
//   );
// };

// export default ProfilePage;














import React from 'react';

const ProfilePage = () => {
  const user = JSON.parse(localStorage.getItem('user'));

  if (!user) {
    return <p className="text-center mt-10">Please log in to view your profile.</p>;
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold mb-4">👤 Profile</h1>
      <p><strong>Name:</strong> {user.name}</p>
      <p><strong>Email:</strong> {user.email}</p>
    </div>
  );
};

export default ProfilePage;
