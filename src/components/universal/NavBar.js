import '../../styles/navbar.css';
import chickfila from '../../assets/navbar-loog.png';
import { useNavigate, Link } from "react-router-dom";
import App from '../../App.js';
import React, { useState, useEffect } from "react";
import { googleLogout } from '@react-oauth/google';

/**
 * method to google log out the user
 * @function
 * @author @AakashHaran
 */
function logOut() {
    googleLogout();
    sessionStorage.setItem("role", "logged_out");
}

/**
 * react component to render the menu items for the server
 * @param {boolean} isLogged - boolean variable indicating whether a user is logged in 
 * @function
 * @author @AakashHaran
 */
function placeLoginButton(isLogged) {
    if (!isLogged)
        return <a href="/login" className={"elem accessibility"}>Login</a>
    else
        return <button className={"elem accessibility"} onClick={() => logOut()}><a href="/">Logout</a></button>
}

/**
 * react component for the universal navbar
 * @param {Object} props - the data objects passed down by the parent component
 * @function
 * @author @AakashHaran
 */
const NavBar = (props) => {
    const navigate = useNavigate();
    function placeCart() {
        if (sessionStorage.getItem("role") === "logged_out")
            return <button className={"elem accessibility"} onClick={() => navigate("/cart")}><i class="fa-solid fa-cart-shopping fa-2xl"></i>{props.cart.length}</button>
    }

    const [isLogged, setLogged] = useState(false);


    useEffect(() => {
        if (sessionStorage.getItem("role") === null) {
            sessionStorage.setItem("role", "logged_out");
        }
        setLogged(sessionStorage.getItem("role") === "manager" || sessionStorage.getItem("role") === "server");
    }, [])

    return (
        <div className={"topnav"}>
            {props.navItems.map(navItem => {
                return <Link className={"elem"} replace to={navItem.route}>{navItem.navItemName}</Link>
            })}
            {placeCart(!isLogged)}
            {placeLoginButton(isLogged)}
            { }
            {/* <button className={"elem accessibility"} onClick={toggleTheme}>Color</button> */}
        </div>
    );
};

export default NavBar;