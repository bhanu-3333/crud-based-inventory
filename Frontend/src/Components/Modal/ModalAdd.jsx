import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import toast, { Toaster } from 'react-hot-toast';
import baseUrl from '../../utils/baseurl';
// import { setProducts } from '../../Redux/products/productSlice';

const ModalAdd = (props) => {
    const products = useSelector((state) => state.product.products);
    // const dispatch = useDispatch();

    const { register, handleSubmit, formState: { errors } } = useForm({});

    const validateP_name = (p_name) => {
        if (!(String(p_name).trim())) {
            return "Name cannot be empty";
        };
    }
    const validateP_price = (p_price) => {
        if (!(String(p_price).trim())) {
            return "Price cannot be empty";
        };
        if (p_price <= 0) {
            return "Invalid Price";
        };
    }
    const validateP_stock = (p_stock) => {
        if (!(String(p_stock).trim())) {
            return "Stock cannot be empty";
        };
        if (p_stock < 0) {
            return "Invalid Stock";
        };
    }

    const onSubmit = async (data) => {
        console.log(data);

        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        let requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: JSON.stringify(data),
            redirect: 'follow',
            credentials: 'include' //!important
        };

        try {
            const response = await fetch(`${baseUrl}/insert`, requestOptions);
            const result = await response.json();
            if (result.status) {
                toast.success("Product added succesfully");
                // to refresh,
                props.fetchProducts();
                // dispatch(setProducts([]));
            } else {
                toast.error("Something went wrong! try again");
                console.log('Error::Modal Add::result', result.message)
            }
        } catch (error) {
            toast.error("Something went wrong! ty again");
            console.log('Error::Modal Add::', error)
        }
        finally {
            // close dialog
            const f = document.getElementById("addFormModal");
            f.reset();
            document.getElementById(props.id).close();
        }
    }

    const clearForm = (e) => {
        e.preventDefault();
        e.stopPropagation();
        const f = document.getElementById("addFormModal");
        f.reset();
        // close dialog
        document.getElementById(props.id).close();
    }

   return (
    <div>
        <dialog id={props.id} className="modal">
            <div className="modal-box bg-white rounded-2xl shadow-2xl border border-purple-100 p-8 max-w-md">
                <h3 className="font-semibold text-2xl text-gray-800 mb-6">{props.title}</h3>

                <form method="dialog" onSubmit={handleSubmit(onSubmit)} id='addFormModal'>
                    <div className="space-y-5">
                        <label className="form-control w-full lg:max-w-xs px-2">
                            <div className="label mb-2">
                                <span className="label-text text-sm font-medium text-gray-700">Product No</span>
                            </div>
                            <input type="text" placeholder="Type here" className="input input-bordered w-full lg:max-w-xs px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-500 cursor-not-allowed" disabled value={products.length + 1} />
                        </label>
                        <label className="form-control w-full lg:max-w-xs px-2">
                            <div className="label mb-2">
                                <span className="label-text text-sm font-medium text-gray-700">Product Name</span>
                            </div>
                            <input type="text"
                                {...register('p_name', { validate: validateP_name })}
                                name='p_name' placeholder="Type here" className="input input-bordered w-full lg:max-w-xs px-4 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all" />
                        </label>
                        {errors.p_name && <p className='text-xs text-red-500 ps-2 mt-1'>{errors.p_name.message}</p>}

                        <label className="form-control w-full lg:max-w-xs px-2">
                            <div className="label mb-2">
                                <span className="label-text text-sm font-medium text-gray-700">Enter Price</span>
                            </div>
                            <input type="number"
                                {...register('p_price', { validate: validateP_price })}
                                min={1} name='p_price' placeholder="Type here" className="input input-bordered w-full lg:max-w-xs px-4 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all" />
                        </label>
                        {errors.p_price && <p className='text-xs text-red-500 ps-2 mt-1'>{errors.p_price.message}</p>}


                        <label className="form-control w-full lg:max-w-xs px-2">
                            <div className="label mb-2">
                                <span className="label-text text-sm font-medium text-gray-700">Enter Stock</span>
                            </div>
                            <input type="number"
                                {...register('p_stock', { validate: validateP_stock })}
                                min={1} name='p_stock'
                                placeholder="Type here" className="input input-bordered w-full lg:max-w-xs px-4 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all" />
                        </label>
                        {errors.p_stock && <p className='text-xs text-red-500 ps-2 mt-1'>{errors.p_stock.message}</p>}
                    </div>
                    <div className="modal-action mt-8">
                        <div className="flex gap-3 w-full">
                            {/* if there is a button in form, it will close the modal */}
                            <button className="btn mx-2 px-6 btn-sm btn-primary flex-1 bg-purple-600 hover:bg-purple-700 text-white font-medium py-3 rounded-lg transition-colors duration-200 shadow-sm border-none">Add</button>
                            <button className="btn mx-2 px-6 btn-sm flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-3 rounded-lg transition-colors duration-200 border-none" onClick={clearForm}>Cancel</button>
                        </div>
                    </div>
                </form>
            </div>
        </dialog>

        <Toaster />
    </div>
)
}

export default ModalAdd