import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Bars3BottomLeftIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import Aside from '../../Components/Aside/Aside';
import baseUrl from '../../utils/baseurl';
import ModalInvoice from '../../Components/Modal/ModalInvoice';
import toast, { Toaster } from 'react-hot-toast';
import { setSale } from '../../Redux/sales/saleSlice';

const ViewSales = () => {
  const navigate = useNavigate();
  const isLogin = useSelector((state) => state.login.loginStatus);
  const salesList = useSelector((state) => state.sale.sales);
  const dispatch = useDispatch();
  const [printInvoiceData, setPrintInvoiceData] = useState({
    "custmrDetails": {
      cust_id: "",
      cust_order_id: "",
      cust_name: "",
      cust_email: "",
      cust_contact: "",
      "cartItems": []
    }
  })

  const getSales = async () => {
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    let requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
      credentials: 'include' //!important
    };

    try {
      const response = await fetch(`${baseUrl}/getsales`, requestOptions);
      const result = await response.json()

      if (result.status) {
        dispatch(setSale(result.data));
      } else {
        console.log('Error::new sales::result', result.message);
      }
    } catch (error) {
      console.log('Error::new sales::', error);
    }
  }


  const handleDelete = async(id) => {
    if (window.confirm("Are u sure to delete?")) {
      let myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      let requestOptions = {
        method: 'POST',
        body: JSON.stringify({ salesId: id }),
        headers: myHeaders,
        redirect: 'follow',
        credentials: 'include' //!important
      };
      try {
        const response = await fetch(`${baseUrl}/deletesales`, requestOptions);
        const result = await response.json();

        if (result.status) {
          toast.success("Delete Success");
          // to refresh sales list
          getSales();
        } else {
          toast.error("Something went wrong! try again");
          console.log('Error::new sales::result', result.message);
        }
      } catch (error) {
        console.log('Error::new sales::', error)
      }
    }
  }

  useEffect(() => {
    // check if login:
    if (!isLogin) {
      // not login, take to login page:
      navigate("/login")
    } else {
      // get sales
      if (salesList.length <= 0) {
        getSales()
      }
    }
  }, [])

 return (
    <div className='md:w-[80%] md:mx-auto'>

      {/* main */}
      <div className="drawer lg:drawer-open">
        <input id="sidebar_drawer" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content px-4">
          <div className="flex items-center justify-between mb-6">
            {/* Page content here */}
            <label htmlFor="sidebar_drawer" className="drawer-button lg:hidden p-2 hover:bg-purple-50 rounded-lg transition-colors cursor-pointer">
              <Bars3BottomLeftIcon className='w-6 h-6 text-gray-700' />
            </label>
            <h2 className='text-2xl font-semibold w-full text-center md:text-start text-gray-800'>My Sales</h2>
            {/* search bar */}
            <div className='hidden md:flex items-center w-1/2 gap-2'>
              <input 
                type="text" 
                placeholder="Search in sales" 
                className="input input-bordered rounded-full h-10 lg:w-full px-4 py-2 bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all" 
              />
              <button type="submit" className='p-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors duration-200 shadow-sm'>
                <MagnifyingGlassIcon className='w-6 h-6' />
              </button>
            </div>
            {/* search bar */}
          </div>

          {/* search bar mobile*/}
          <div className='flex md:hidden items-center w-full mt-4 mb-6 gap-2'>
            <input 
              type="text" 
              placeholder="Search in sales" 
              className="input input-bordered rounded-full h-10 w-full px-4 py-2 bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all" 
            />
            <button type="submit" className='p-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors duration-200 shadow-sm'>
              <MagnifyingGlassIcon className='w-6 h-6' />
            </button>
          </div>
          {/* search bar */}

          {/* table start */}
          {salesList.length <= 0 ? 
            <div className='text-sm px-2 text-center py-8 text-gray-500 bg-white rounded-xl border border-gray-200'>
              No Items Found
            </div>
            :
            <div className='overflow-auto bg-white rounded-xl border border-purple-100 shadow-sm'>
              <table className="table w-full">
                {/* head */}
                <thead className='bg-gray-50 border-b border-gray-200'>
                  <tr>
                    <th className='text-gray-700 font-semibold'>S.No</th>
                    <th className='text-gray-700 font-semibold'>Cust Name</th>
                    <th className='text-gray-700 font-semibold'>Cust contact</th>
                    <th className='text-gray-700 font-semibold'>Cust email</th>
                    <th className='text-gray-700 font-semibold'>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {/* row 1 */}
                  {[...salesList].reverse().map((elem, inx) => {
                    return (
                      <tr className="hover:bg-purple-50 transition-colors border-b border-gray-100" key={inx}>
                        <th className='text-gray-600'>{inx + 1}</th>
                        <td className='text-gray-800'>{elem.cust_name}</td>
                        <td className='text-gray-600'>{elem.cust_contact}</td>
                        <td className='text-gray-600'>{elem.cust_email}</td>
                        <td>
                          <button
                            onClick={() => {
                              setPrintInvoiceData({
                                "custmrDetails": {
                                  cust_id: elem._id,
                                  cust_order_id: (salesList.length - inx),
                                  cust_name: elem.cust_name,
                                  cust_email: elem.cust_email,
                                  cust_contact: elem.cust_contact,
                                  "cartItems": elem.cartItems
                                }
                              })
                              document.getElementById("invoice_modal").showModal();
                            }}
                            className='btn btn-sm bg-purple-600 hover:bg-purple-700 text-white border-none px-4 py-2 rounded-lg transition-colors duration-200 shadow-sm font-medium'>
                            print invoice
                          </button>
                          <button
                            onClick={() => { handleDelete(elem._id) }}
                            className='btn btn-sm bg-red-500 hover:bg-red-600 text-white border-none ms-2 px-4 py-2 rounded-lg transition-colors duration-200 shadow-sm font-medium'>
                            Delete
                          </button>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          }
          {/* table end */}
        </div>

        <div className="drawer-side md:h-[80vh] h-full">
          <label htmlFor="sidebar_drawer" aria-label="close sidebar" className="drawer-overlay"></label>
          {Aside && <Aside />}
        </div>
      </div>
      {/* main end */}

      {ModalInvoice && <ModalInvoice id="invoice_modal" title="Download Invoice" InvoiceDetails={printInvoiceData} />}
      {Toaster && <Toaster />}
    </div>
  )
}

export default ViewSales