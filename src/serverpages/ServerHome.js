import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/universal/NavBar";
import ReceiptPanel from "../components/server/ReceiptPanel";
import MenuItems from "../components/server/MenuItems";

/**
 * react component for home page of the server
 * this is the server's landing point
 * @function
 * @author @AakashHaran
 */
const ServerHome = () => {
    const navigate = useNavigate();
    const [cart, setCart] = useState([]);
    const [subTotal, setSubPrice] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        if (sessionStorage.getItem("role") !== "server" && sessionStorage.getItem("role") !== "manager") {
            navigate("/forbidden");
            sessionStorage.setItem("role", "logged_out");
        }
    });

    return (
        <>
            <NavBar navItems={[]} />
            <div className="row" style={{ marginTop: '15px', marginRight: '15px', marginLeft: '15px' }}>
                <div className="col-8">
                    <MenuItems cart={cart} setCart={setCart} />
                </div>
                <div className="col">
                    <ReceiptPanel cart={cart} setCart={setCart} setSubPrice={setSubPrice} subPrice={subTotal} setTotalPrice={setTotalPrice} totalPrice={totalPrice} />
                </div>
            </div>
        </>
    );
}

export default ServerHome;