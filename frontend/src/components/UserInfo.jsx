import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa';  // Importing arrow icon from react-icons

const UserInfo = () => {
    const storedUserId = localStorage.getItem('userId');
    const role = localStorage.getItem('role');
    const [user, setUser] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        handleSearch();
    }, []);

    const handleSearch = async () => {
        if (role === 'user') {
            try {
                const response = await axios.get(`http://localhost:4000/User/GetUserByID/${storedUserId}`);
                if (response.data) {
                    setUser(response.data.data);
                } else {
                    console.error('Invalid API response:', response.data);
                }
            } catch (error) {
                console.log('Error fetching data:', error);
            }
        }
        if (role === 'owner') {
            try {
                const response = await axios.get(`http://localhost:4000/GroundOwner/GetOwnerById/${storedUserId}`);
                if (response.data) {
                    setUser(response.data.data);
                } else {
                    console.error('Invalid API response:', response.data);
                }
            } catch (error) {
                console.log('Error fetching data:', error);
            }
        }
    };

    // Default user avatar image URL
    const defaultAvatar = 'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y';

    const handleLogout = () => {
        // Implement your logout logic here
        // For example, clear user data from localStorage and redirect to login page
        localStorage.removeItem('userId');
        localStorage.removeItem('userName');
        localStorage.removeItem('role');
        navigate('/login');
    };

    return (
        <div className="relative">
            <div className="max-w-xl mx-auto mt-10 bg-white p-6 rounded-lg shadow-xl">
                <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold text-gray-800 ml-52">User Profile</h2>
                    <button
                        onClick={handleLogout}
                        className="text-white bg-red-500 px-4 py-2 rounded-md hover:bg-red-600 focus:outline-none"
                    >
                        Logout
                    </button>
                </div>
                <div className="flex justify-center items-center mt-4 mb-14">
                    <img
                        src={defaultAvatar}
                        alt="Profile"
                        className="w-24 h-24 rounded-full object-cover"
                    />
                </div>
                <div className="ml-44">
                    <div className="flex mb-4">
                        <p className="w-24 text-gray-600 font-semibold">Name:</p>
                        <p>{user.FirstName} {user.LastName}</p>
                    </div>
                    <div className="flex mb-4">
                        <p className="w-24 text-gray-600 font-semibold">Username:</p>
                        <p>{user.UserName}</p>
                    </div>
                    <div className="flex mb-4">
                        <p className="w-24 text-gray-600 font-semibold">Email:</p>
                        <p>{user.email}</p>
                    </div>
                    <div className="flex mb-4">
                        <p className="w-24 text-gray-600 font-semibold">Phone No:</p>
                        <p>{user.PhoneNo}</p>
                    </div>
                </div>
            </div>
            
        </div>
    );
};

export default UserInfo;
