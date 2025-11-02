import { BuildingStorefrontIcon, MoonIcon, SunIcon } from '@heroicons/react/24/outline'
import React from 'react'

const Navbar = () => {
    const toggleDarkMode = () => {
        const mode = document.body.parentElement.getAttribute("data-theme");
        if (mode === "dark") {
            document.body.parentElement.setAttribute("data-theme", "cupcake")
            localStorage.setItem("isDarkMode", "false")
        } else {
            document.body.parentElement.setAttribute("data-theme", "dark")
            localStorage.setItem("isDarkMode", "true")
        }
    }
   return (
        <div className="navbar h-16 bg-white border-b-2 border-purple-100 shadow-sm mb-6">
            <div className='md:w-[80%] md:mx-auto flex justify-center items-center w-full'>
                <div className='flex items-center gap-3'>
                    <div className="icon">
                        <BuildingStorefrontIcon className='w-8 h-8 text-purple-600' />
                    </div>
                    <a className="text-xl font-semibold text-gray-800">ShopFlow</a>
                </div>
            </div>
        </div>
    )
}

export default Navbar

