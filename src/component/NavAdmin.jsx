import React from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const Sidebar = () => {
    const handleLogout = () => {
        const token = localStorage.getItem('token');
        if (token) {
          Swal.fire({
            title: 'Are you sure?',
            text: 'Apakah anda ingin logout ?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Ya',
            cancelButtonText: 'Batal',
          }).then((result) => {
            if (result.isConfirmed) {
              localStorage.removeItem('token');
              window.location.href = '/login';
            }
          });
        } else {
          window.location.href = '/login';
        }
      };
  return (
    <div className="fixed flex flex-col bg-gray-800 text-white w-80 h-screen">
      <div className="p-4">
        <h1 className="text-xl font-bold">Admin Dashboard</h1>
      </div>
      <nav className="flex-grow">
        <ul className="p-2">
          <li className="mb-2">
            <Link
              to="/admin/dashboard"
              className="block py-2 px-4 rounded hover:bg-gray-700"
            >
              Dashboard
            </Link>
          </li>
          <li className="mb-2">
            <Link
              to="/admin/form"
              className="block py-2 px-4 rounded hover:bg-gray-700"
            >
              Form
            </Link>
          </li>
          <li className="mb-2">
            <Link
              to="/admin/mahasiswa"
              className="block py-2 px-4 rounded hover:bg-gray-700"
            >
              Mahasiswa
            </Link>
          </li>
          <li className="mb-2">
            <button
              className="block py-2 px-4 rounded text-red-500 hover:bg-red-700 hover:text-white"
              onClick={handleLogout}
            >
              Logout
            </button>
          </li>
          {/* Add more navigation links here */}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
