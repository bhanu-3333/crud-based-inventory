import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ModalDelete from '../../Components/Modal/ModalDelete';
import ModalUpdate from '../../Components/Modal/ModalUpdate';
import { useSelector, useDispatch } from 'react-redux'
import { Bars3BottomLeftIcon, MagnifyingGlassIcon, PlusCircleIcon } from '@heroicons/react/24/outline';
import ModalAdd from '../../Components/Modal/ModalAdd';
import baseUrl from '../../utils/baseurl';
import { setProducts } from '../../Redux/products/productSlice';
import Aside from '../../Components/Aside/Aside';

const Dashboard = () => {
    const isLogin = useSelector((state) => state.login.loginStatus)
    const navigate = useNavigate();

    
    // get all products from store:
    const products = useSelector((state) => state.product.products);
    const [isFetchFinished, setisFetchFinished] = useState(false);
    const dispatch = useDispatch();

    // fetch products:
    const fetchProducts = async () => {
        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        let requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow',
            credentials: 'include' //!important
        };

        const response = await fetch(`${baseUrl}/products`, requestOptions);
        const result = await response.json();
        if (result.status) {
            console.log("Product recived succesfully");
            dispatch(setProducts(result.data));
        } else {
            alert("Something went wrong! try again");
            console.log('Error::Dashboard::result', result.message)
        }
        setisFetchFinished(true);
    }


    useEffect(() => {
        // check if login:
        if (!isLogin) {
            navigate("/login")
        } else if (products.length <= 0 && !isFetchFinished) {
            //asyc fetch data and save result to store
            fetchProducts();
        }
    }, [products])


    const showAdd = () => {
        document.getElementById('add_modal').showModal();
    }

    const [updateObj, setupdateObj] = useState({
        pid: "",
        index: "",
        p_name: "",
        p_price: "",
        p_stock: ""
    });

    const showUpdate = (id, i, p_name, p_price, p_stock) => {
        setupdateObj({
            pid: id,
            index: i,
            p_name: p_name,
            p_price: p_price,
            p_stock: p_stock
        })
        document.getElementById('update_modal').showModal();
    }

    const [pid, setpid] = useState(""); //used for selecting current id that will help in delete items
    const showDelete = (id) => {
        setpid(id);
        document.getElementById('delete_modal').showModal();
    }

    // exec only if login:
   return (isLogin &&
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
                        <h2 className='text-2xl font-semibold text-gray-800'>Products</h2>
                        {/* search bar */}
                        <div className='hidden md:flex items-center w-1/2 gap-2'>
                            <input type="text" placeholder="Search Product" className="input input-bordered rounded-full h-10 lg:w-full px-4 py-2 bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all" />
                            <button type="submit" className='p-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors duration-200 shadow-sm'>
                                <MagnifyingGlassIcon className='w-6 h-6' />
                            </button>
                        </div>
                        {/* search bar */}
                        {/* add btn */}
                        <button onClick={showAdd} className='p-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors duration-200 shadow-sm ms-2'>
                            <PlusCircleIcon className='w-6 h-6' />
                        </button>
                    </div>

                    {/* search bar mobile*/}
                    <div className='flex md:hidden items-center w-full mt-4 mb-6 gap-2'>
                        <input type="text" placeholder="Search Product" className="input input-bordered rounded-full h-10 w-full px-4 py-2 bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all" />
                        <button type="submit" className='p-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors duration-200 shadow-sm ms-2'>
                            <MagnifyingGlassIcon className='w-6 h-6' />
                        </button>
                    </div>
                    {/* search bar */}

                    {/* table start */}
                    <div className="overflow-auto max-h-[80vh]">
                        <table className="table bg-white rounded-xl border border-purple-100 shadow-sm">
                            {/* head */}
                            <thead className='bg-gray-50 border-b border-gray-200'>
                                <tr>
                                    <th className='text-gray-700 font-semibold'>S.No</th>
                                    <th className='text-gray-700 font-semibold'>Name</th>
                                    <th className='text-gray-700 font-semibold'>Price</th>
                                    <th className='text-gray-700 font-semibold'>Stock</th>
                                    <th className='text-gray-700 font-semibold'>Action</th>
                                </tr>
                            </thead>
                            <tbody>

                                {products && products.length > 0 && [...products].reverse().map((elem, i, arr) => {
                                    return (
                                        <tr className="hover hover:bg-purple-50 transition-colors border-b border-gray-100" key={i}>
                                            <th className='text-gray-600'>{i + 1}</th>
                                            <td className='text-gray-800'>{elem.p_name}</td>
                                            <td className='text-gray-600'>Rs.{elem.p_price}</td>
                                            <td className='text-gray-600'>{elem.p_stock}</td>
                                            <td className='flex gap-2'>
                                                <button className='btn btn-primary bg-purple-600 hover:bg-purple-700 text-white border-none btn-sm px-4 py-2 rounded-lg transition-colors duration-200 shadow-sm font-medium' onClick={() => {
                                                    showUpdate(elem._id, i, elem.p_name, elem.p_price, elem.p_stock)
                                                }}>Update</button>

                                                <button className='btn btn-error bg-red-500 hover:bg-red-600 text-white border-none btn-sm px-4 py-2 rounded-lg transition-colors duration-200 shadow-sm font-medium' onClick={() => {
                                                    showDelete(elem._id)
                                                }}>Delete</button>
                                            </td>
                                        </tr>
                                    )
                                })}

                            </tbody>
                        </table>
                    </div>
                    {isFetchFinished && products.length <= 0 && <div className='text-sm px-2 text-center py-8 text-gray-500 bg-white rounded-xl border border-gray-200 mt-4'>No Items Found!<br/>Click on plus to Get Started!</div>}
                    {/* table end */}
                </div>

                <div className="drawer-side md:h-[80vh] h-full">
                    <label htmlFor="sidebar_drawer" aria-label="close sidebar" className="drawer-overlay"></label>

                    {Aside && <Aside/>}
                    
                </div>
            </div>
            {/* main end */}

            {/* modal */}
            {ModalAdd && <ModalAdd id="add_modal" title="Add Product" fetchProducts={fetchProducts} />}
            {ModalDelete && <ModalDelete id="delete_modal" pid={pid} title="Are u sure to delete?" fetchProducts={fetchProducts}/>}
            {ModalUpdate && <ModalUpdate id="update_modal" title="Update Details" updateObj={updateObj} fetchProducts={fetchProducts} />}
        </div>
    )
}

export default Dashboard