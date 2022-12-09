import React, { useState } from "react";
import { GoogleOAuthProvider, useGoogleLogin, GoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';

import NavBar from "./components/universal/NavBar";

const navItems = [
    { navItemName: "Home", route: "/" },
    { navItemName: "Menu", route: "/menu" },
    { navItemName: "Find", route: "/find" }
];

/**
 * method to check login credentials
 * @method
 * @param navigate - method to redirect
 * @param {string} email - email of user
 * * @param {string} password - password of user
 * @author @AakashHaran
 */
const tryLogin = async (navigate, email, password) => {
    const getItemsAPI = "http://localhost:5001/login";
    console.log("TRYING LOGIN", email, password)

    const test = await fetch(getItemsAPI,
        {
            method: "POST",
            mode: "cors",
            cache: "no-cache",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "email": email,
                "password": password
            })
        }
    );

    console.log(test.json());
    //     .then((response) => response.json())
    //     .then((data) => {
    //         console.log("DATA", data);
    //         if (data.role === "manager") {
    //             console.log("MANAGER");
    //             sessionStorage.setItem("role", "manager");
    //             navigate('/manager');
    //         } else if (data.role === "server") {
    //             console.log("MANAGER");
    //             sessionStorage.setItem("role", "server");
    //             navigate('/server');
    //         } else {
    //             console.log("MANAGER");
    //             alert("Error in email/password combination!");
    //     }
    // })
}

/**
 * react component for login page
 * @function
 * @author @AakashHaran
 */
const Login = (props) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    return (
        <>
            <NavBar navItems={navItems} isCustomer={false} cart={props.cart} home={"/"} />
            <GoogleOAuthProvider clientId="243604614412-hdjn1eb24blri85d9apimi9tts2pe15u.apps.googleusercontent.com">
                <div className='form-container' style={{ width: '50%', position: "absolute", top: "12%", left: "50%", transform: "translate(-50%, 50%)" }}>
                    <GoogleLogin
                        onSuccess={credentialResponse => {
                            sessionStorage.setItem("role", "manager");
                            navigate('/server');
                            // TODO: make sure to change based on who logged in
                            console.log(credentialResponse);
                        }}
                        onError={() => {
                            console.log('Login Failed');
                        }}
                        text={"Sign in with Google"}
                        shape={"pill"}
                        theme={'filled_blue'}
                        width={"500"}
                        size={"large"}
                    />
                    <form style={{ marginTop: '3%', padding: '5%', boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px" }}>
                        <div class="mb-3">
                            <label for="exampleInputEmail1" class="form-label">Email address</label>
                            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                            <div id="emailHelp" class="form-text">Enter your employee assigned Chick-Fil-A email</div>
                        </div>
                        <div class="mb-3">
                            <label for="exampleInputPassword1" class="form-label">Password</label>
                            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} class="form-control" id="exampleInputPassword1" />
                        </div>
                        <div style={{ textAlign: 'center' }}>
                            <button type="submit" class="btn btn-primary btn-lg" style={{ backgroundColor: '#e60e33', border: 'none' }} onClick={() => { tryLogin(navigate, email, password) }}>Submit</button>
                        </div>
                    </form>
                </div>
            </GoogleOAuthProvider>;
        </>
    );
}

export default Login;