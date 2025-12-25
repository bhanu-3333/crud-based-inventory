import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Aside from '../../Components/Aside/Aside';
import { useSelector } from 'react-redux';
import { UserCircleIcon } from '@heroicons/react/24/outline';
import baseUrl from '../../utils/baseurl';
const Profile = () => {
  const isLogin = useSelector((state) => state.login.loginStatus);
  const [user,setUser] = useState({
    email:"",
    products:[],
    sales:[]
  })
  const navigate = useNavigate();

  const getUser = async () => {
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    let requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
      credentials: 'include' //!important
    };
    const response = await fetch(`${baseUrl}/getUser`, requestOptions);
    const result = await response.json();
    console.log(result);
    if (result.status) {
      setUser(result.data)
    } else {
      alert("Something went wrong! try again");
      console.log('Error::profile::result', result.message)
    }
  }
  useEffect(() => {
    // check if login:
    if (!isLogin) {
      // not login, take to login page:
      navigate("/login")
    } else {
      // get user details:
      getUser()
    }
  }, [])
  return (
    <div className='md:w-[80%] md:mx-auto'>
      {/* main */}
      <div className="drawer lg:drawer-open">
        <input id="sidebar_drawer" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content px-4">
          <h3 className='flex items-center gap-x-2 mb-6'>
            <span className='font-semibold text-2xl text-gray-800'>Profile</span>
          </h3>
          <div className='mb-20'>
            <div className="box mt-4 rounded-2xl shadow-lg bg-white border border-purple-100">
              <div className="w-full h-full items-center p-6">
                <div className='flex items-center gap-4 mb-6'>
                  <UserCircleIcon className="w-16 h-16 text-purple-600" />
                  <div className='text-gray-700 text-lg font-medium'>{user.email}</div>
                </div>

                <div className="section mt-8 text-sm flex gap-4">
                  <div className="products h-24 border border-gray-200 rounded-xl p-4 w-1/2 bg-gradient-to-br from-purple-50 to-white hover:shadow-md transition-shadow duration-200">
                    <div className='text-gray-600 font-medium mb-2'>Total Products:</div>
                    <div className='text-3xl font-bold text-purple-600'>{user.products.length}</div>
                  </div>
                  <div className="sales h-24 border border-gray-200 rounded-xl p-4 w-1/2 bg-gradient-to-br from-purple-50 to-white hover:shadow-md transition-shadow duration-200">
                    <div className='text-gray-600 font-medium mb-2'>Total Sales:</div>
                    <div className='text-3xl font-bold text-purple-600'>{user.sales.length}</div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>

        <div className="drawer-side md:h-[80vh] h-full">
          <label htmlFor="sidebar_drawer" aria-label="close sidebar" className="drawer-overlay"></label>
          {Aside && <Aside />}
        </div>
      </div>
      {/* main end */}
    </div>
  )
}

export default Profile