import { ArchiveBoxIcon, ArrowLeftEndOnRectangleIcon, ChartBarIcon, PlusCircleIcon, UserCircleIcon } from '@heroicons/react/24/outline';
import React from 'react'
import { Link, useLocation } from 'react-router-dom';
import baseUrl from '../../utils/baseurl';

const Aside = () => {
    const location = useLocation();
    const showAdd = () => {
        document.getElementById('add_modal').showModal();
    }
    const logoutUser = async () => {
        if (window.confirm("Are you sure to logout?")) {
            let myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            let requestOptions = {
                method: 'GET',
                headers: myHeaders,
                redirect: 'follow',
                credentials: 'include' //!important
            };
            const response = await fetch(`${baseUrl}/logout`, requestOptions);
            const result = await response.json();
            if (result.status) {
                console.log("Logout Success");
                window.location.reload();
            } else {
                alert("Something went wrong! try again");
            }
        }

    }
 return (
    <div className="relative min-h-full w-72 overflow-hidden">
        {/* Grid Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-50/30 to-white">
            {/* Vertical lines */}
            <div className="absolute inset-0" style={{
                backgroundImage: 'linear-gradient(to right, rgba(156, 163, 175, 0.1) 1px, transparent 1px)',
                backgroundSize: '40px 40px'
            }}></div>
            {/* Horizontal lines */}
            <div className="absolute inset-0" style={{
                backgroundImage: 'linear-gradient(to bottom, rgba(156, 163, 175, 0.1) 1px, transparent 1px)',
                backgroundSize: '40px 40px'
            }}></div>
        </div>

        {/* Menu Content */}
        <ul className="relative menu text-base-content min-h-full w-72 p-4 backdrop-blur-sm">
            <div className="text-lg pb-3 border-b border-gray-200 text-gray-800 font-semibold mb-3">
                Manage Products
            </div>
            {/* show add product btn only on home page: */}
            {location.pathname === "/" && (
                <li className='mt-2'>
                    <button onClick={showAdd} className="hover:bg-purple-50 transition-colors rounded-lg">
                        <PlusCircleIcon className='h-5 w-5 text-purple-600' />
                        <span className="text-gray-700">Add Product</span>
                    </button>
                </li>
            )}
            <li className='mb-4 mt-2'>
                <Link to={"/"} className="hover:bg-purple-50 transition-colors rounded-lg">
                    <ArchiveBoxIcon className='h-5 w-5 text-purple-600' />
                    <span className="text-gray-700">My Products</span>
                </Link>
            </li>

            <div className="text-lg pb-3 border-b border-gray-200 text-gray-800 font-semibold mb-3">
                Manage Sales
            </div>
            <li className='mt-2'>
                <Link to={"/newSales"} className="hover:bg-purple-50 transition-colors rounded-lg">
                    <PlusCircleIcon className='h-5 w-5 text-purple-600' />
                    <span className="text-gray-700">New Sales</span>
                </Link>
            </li>
            <li className='mb-4 mt-2'>
                <Link to={"/viewSales"} className="hover:bg-purple-50 transition-colors rounded-lg">
                    <ChartBarIcon className='h-5 w-5 text-purple-600' />
                    <span className="text-gray-700">View Sales</span>
                </Link>
            </li>

            <div className="text-lg pb-3 border-b border-gray-200 text-gray-800 font-semibold mb-3">
                Manage Account
            </div>
            <li className='mt-2'>
                <Link to={"/profile"} className="hover:bg-purple-50 transition-colors rounded-lg">
                    <UserCircleIcon className='h-5 w-5 text-purple-600' />
                    <span className="text-gray-700">Profile</span>
                </Link>
            </li>
            <li className='mb-4 mt-2'>
                <button onClick={logoutUser} className="hover:bg-purple-50 transition-colors rounded-lg">
                    <ArrowLeftEndOnRectangleIcon className='h-5 w-5 text-purple-600' />
                    <span className="text-gray-700">Logout</span>
                </button>
            </li>
        </ul>
    </div>
)
}
export default Aside;