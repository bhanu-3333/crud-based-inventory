import React from 'react'
import { useDispatch } from 'react-redux';
import baseUrl from '../../utils/baseurl';
import toast, { Toaster } from 'react-hot-toast';
// import { setProducts } from '../../Redux/products/productSlice';

const Modal = (props) => {
    // const dispatch = useDispatch();

    const handleDelete = async () => {
        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        let requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: JSON.stringify({
                "productId": props.pid
            }),
            redirect: 'follow',
            credentials: 'include' //!important
        };

        try {
            const response = await fetch(`${baseUrl}/delete`, requestOptions)
            const result = await response.json();
            if (result.status) {
                toast.success("Product deleted succesfully");
                // to refresh,
                props.fetchProducts();
                // dispatch(setProducts([]));
            } else {
                toast.error("Something went wrong! try again");
                console.log('Error::Modal Delete::result', result.message)
            }
        } catch (error) {
            console.log('error', error)
        }
    }
 return (
    <div>
        {/* Open the modal using document.getElementById('ID').showModal() method */}
        {/* <button className="btn" onClick={() => document.getElementById('my_modal_1').showModal()}>open modal</button> */}
        <dialog id={props.id} className="modal">
            <div className="modal-box bg-white rounded-2xl shadow-2xl border border-purple-100 p-8 max-w-md">
                <h3 className="font-semibold text-2xl text-gray-800 mb-6">{props.title}</h3>
                <p className="py-4 text-gray-600">{props.pid}</p>
                <div className="modal-action mt-8">
                    <form method="dialog">
                        {/* if there is a button in form, it will close the modal */}
                        <button className="btn mx-2 px-6 btn-sm bg-red-500 hover:bg-red-600 text-white font-medium py-3 rounded-lg transition-colors duration-200 shadow-sm border-none" onClick={handleDelete}>yes</button>
                        <button className="btn mx-2 px-6 btn-sm bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-3 rounded-lg transition-colors duration-200 border-none">No</button>
                    </form>
                </div>
            </div>
        </dialog>
        <Toaster />
    </div>
)
}

export default Modal