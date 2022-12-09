import NavBar from '../components/universal/NavBar';
import React, { useState, useEffect } from "react";
import CartItemCard from '../components/customer/CartItemCard';
import '../styles/customer/cart.css'
import empcart from '../assets/emptycart.png';
import { useNavigate, Link } from "react-router-dom";

/**
 * function to add an order to the backend 
 * through an API call
 * @method
 * @author @OmarIrshad
 */
const server_addOrder = async (data, setCart) => {
    setCart([]);
    console.log(data);
    const server_addOrderURL = "http://localhost:5001/customer_addOrder"

    const response = await fetch(server_addOrderURL,
        {
            method: "POST",
            mode: "cors",
            cache: "no-cache",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        }
    )
}




const navItems = [
    { navItemName: "Home", route: "/" },
    { navItemName: "Menu", route: "/menu" },
    { navItemName: "Find", route: "/find" }
];

/**
 * react component to show the current state 
 * of the cart for the customer
 * @function
 * @param {Object} props - props passed down by parent component
 * @author @OmarIrshad @AhsanWaseem
 */
export default function CartView(props) {

    const SubTotal = props.cart.reduce((a, c) => a + c.item_price * c.item_quantity, 0)
    const TotalPrice = SubTotal * 1.0825;
    const [customerName, setCustomerName] = useState([]);

    return (
        <div style={{ overflow: 'hidden', height: 'fit-content', paddingBottom: '10%' }}>
            <NavBar navItems={navItems} cart = {props.cart} isCustomer={false} home={"/"} />
            <div className="cartgrid">
                <ul>
                    {props.cart.map((item) => { return <CartItemCard className="cartItem" item={item} cart={props.cart} setCart={props.setCart} incrementCartItem={props.incrementCartItem} decrementCartItem={props.decrementCartItem} ></CartItemCard> })}
                </ul>
            </div>

            {props.cart.length === 0 && (
                <>
                    <h1 className="EmptyCart" style={{ fontSize: '65px', fontFamily: 'serif', color: 'black' }}> Your Cart Is Empty!  </h1>
                    <div><img className={"empcart"} src={empcart} /></div>

                    <Link to="/menu">
                        <button className="orderbuttoncart">Order Now!</button>
                    </Link>
                </>
            )}


            {props.cart.length !== 0 && (
                <>
                    <div className="TotalSummary" >
                        <div style={{ fontFamily: 'serif', color: 'black' }}>Sub Total: ${SubTotal.toFixed(2)}</div>
                        <div style={{ fontFamily: 'serif', color: 'black' }}>Total: ${TotalPrice.toFixed(2)}</div>
                    </div>
                    {/* <button onClick = {() => props.sendOrder(props.cart, props.setCart, TotalPrice)} className = "Send_Order"> Place Order</button> */}
                    <input type="Name " value={customerName} onChange={(e) => setCustomerName(e.target.value)} placeholder="Customer Name" ></input>
                    <button onClick={() => server_addOrder({ items: props.cart, totalPrice: Number((TotalPrice).toFixed(2)), customerName: { customerName }, employeeName: "0000000" }, props.setCart)} className="Send_Order"> Place Order</button>
                </>

            )}
        </div>





    );
};
