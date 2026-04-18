import React from "react";
import {NavLink} from "react-router-dom"


function Navbar(){
 
    return (
        <nav className="absolute top-0 left-0 w-full z-50 px-8 py-4 flex justify-between items-center border-b border-gray-800">
            
            <h1 className="text-white text-xl font-bold">MovieMirror</h1>

            <div className="flex gap-8">
                <NavLink 
                    to="/" 
                    className={({ isActive }) => 
                        isActive ? "text-purple-400 border-b-2 border-purple-400 pb-1 text-sm" : "text-gray-400 text-sm"
                    }>
                    Home
                </NavLink>

                <NavLink 
                    to="/favourites" 
                    className={({ isActive }) => 
                        isActive ? "text-purple-400 border-b-2 border-purple-400 pb-1 text-sm" : "text-gray-400 text-sm"
                    }>
                    Favourites
                </NavLink>

                
            </div>

        </nav>
    )

}

export default Navbar