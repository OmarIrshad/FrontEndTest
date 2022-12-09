import { useState, useEffect } from "react";

/**
 * method to add order
 * on the server side
 * @function
 * @author @OmarIrshad
 */
const server_addOrder = async (data, setCart) => {
    setCart([]);
    console.log(data);
    const server_addOrderURL = "http://localhost:5001/server_addOrder"

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

/**
 * method to delete item from cart
 * @function
 * @author @OmarIrshad @AhsanWaseem
 */
const deleteItem = (setCart, item_id) => {
    setCart((cart) => cart.filter((cartItem) => cartItem.item.item_id !== item_id))
}

/**
 * react component to show receipt panel
 * @function
 * @author @OmarIrshad
 */
const ReceiptPanel = ({ cart, setCart, setSubPrice, subPrice, setTotalPrice, totalPrice }) => {
    useEffect(() => {
        console.log("Panel ", cart)
        const price = cart.reduce((a, cartItem) => {
            return a + cartItem.item.item_price * cartItem.quantity;
        }, 0)
    
        setSubPrice(price);
        setTotalPrice(price * 1.0825);
    }, [cart])

    const [customerName, setCustomerName] = useState([]);
    const [employeeName, setEmployeeName] = useState([]);

    return (
        <>
            <div style={{ display: "grid", gridTemplateColumns: "auto" }}>
                <button onClick={() => setCart([])}>Clear</button>
                <div className="row" style={{ marginTop: '15px' }}>
                    <div className="col"><h5>Order Item</h5></div>
                </div>
                {cart.map(cartItem => {
                    return (
                        <div className="row">
                            <div className="col">{cartItem.item.item_name}</div>
                            <div className="col">{cartItem.quantity}</div>
                            <div className="col"><button onClick={() => deleteItem(setCart, cartItem.item.item_id)}>Delete</button></div>
                        </div>
                    )
                })}
                <h5 style={{ marginTop: '15%' }}>Total Price: {Number((totalPrice).toFixed(2))}</h5>
                <h5>SubTotal: {Number((subPrice).toFixed(2))}</h5>
                {/* <input type="tfext" placeholder="Employee ID"></input> */}
                <input  type="tfext " value = {employeeName} onChange={(e) => setEmployeeName(e.target.value)}  placeholder="Employee ID" ></input>
                {/* <input type="tfext" placeholder="Customer Name"></input> */}
                <input  type="tfext" value = {customerName} onChange={(e) => setCustomerName(e.target.value)}  placeholder="Customer Name" ></input>
                {/* <button onClick={() => setCart([])}>Place Order</button> */}

                <button onClick = {() => server_addOrder( {items: cart, totalPrice: Number((totalPrice).toFixed(2)), customerName: {customerName}, employeeName: {employeeName} }, setCart )}  className = ""> Place Order</button>

            </div>
        </>
    );
}

export default ReceiptPanel;