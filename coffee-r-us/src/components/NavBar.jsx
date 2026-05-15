import React from 'react'
import { NavLink } from 'react-router-dom'

function NavBar() {


    return (
        <>
            <div className="main-nav-container">

                <nav className="nav-container">

                    <NavLink className="nav-link" to="/" >Home </NavLink>
                    <NavLink className="nav-link" to="/shop" >Shop </NavLink>
                    <NavLink className="nav-link" to="/admin-portal" >Admin Portal </NavLink>

                </nav>

            </div>
        </>
    )
}

export default NavBar