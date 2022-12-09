import ViewOrderRow from "../components/manager/VIewOrderRow";
import { useState, useEffect } from "react";

/**
 * method to get orders from the backend
 * @method
 * @param {method} setItems - the method used to set the state of the items
 * @author @AhsanWaseem
 */
export const getOrders = async (setItems) => {
    const getItemsAPI = "http://localhost:5001/allorders";
    await fetch(getItemsAPI)
        .then((response) => response.json())
        .then((data) => setItems(data));
}

/**
 * method to filter out certain orders based on specified criteria
 * @method
 * @author @OmarIrshad
 */
const filter = (setOrders, allOrders, minPrice, maxPrice, minDate, maxDate, empId) => {
    let newOrders = allOrders;

    if (minPrice !== "")
        newOrders = newOrders.filter((order) => order.total_price >= parseFloat(minPrice))

    if (maxPrice !== "")
        newOrders = newOrders.filter((order) => order.total_price <= parseFloat(maxPrice))

    if (maxDate !== "")
        newOrders = newOrders.filter((order) => order.created_at.slice(0, 10) <= maxDate)


    if (minDate !== "")
        newOrders = newOrders.filter((order) => order.created_at.slice(0, 10) >= minDate)

    if (empId !== "")
        newOrders = newOrders.filter((order) => String(order.employee) === empId)


    setOrders(newOrders)
}

/**
 * react component for viewing all the past orders
 * @function
 * @author @AakashHaran
 */
const ViewOrders = () => {
    const [orders, setOrders] = useState([])
    const [allOrders, setAllOrders] = useState([])

    const [minPrice, setMinPrice] = useState("");
    const [maxPrice, setMaxPrice] = useState("");

    const [minDate, setMinDate] = useState("");
    const [maxDate, setMaxDate] = useState("");

    const [empId, setEmpId] = useState("");

    useEffect(() => {
        getOrders(setOrders);
        getOrders(setAllOrders)
    }, [])

    return (
        <>
            <div className={"container"} style={{ marginTop: '5%' }}>
                <div className="row mb-5">
                    <div className="col-3">
                        <input type="text" class="form-control" value={minPrice} onChange={(e) => setMinPrice(e.target.value)} placeholder="Min Price: '#.##'" aria-label="Dollar amount (with dot and two decimal places)" />
                        <input type="text" class="form-control" value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} placeholder="Max Price: '#.##'" aria-label="Dollar amount (with dot and two decimal places)" />
                    </div>
                    <div className="col-3">
                        <input type="text" class="form-control" value={minDate} onChange={(e) => setMinDate(e.target.value)} placeholder="Min Date: 'MM-DD-YYYY'" aria-label="Dollar amount (with dot and two decimal places)" />
                        <input type="text" class="form-control" value={maxDate} onChange={(e) => setMaxDate(e.target.value)} placeholder="Max Date: 'MM-DD-YYYY'" aria-label="Dollar amount (with dot and two decimal places)" />
                    </div>
                    <div className="col-3">
                        <input type="text" class="form-control" value={empId} onChange={(e) => setEmpId(e.target.value)} placeholder="Employee ID" aria-label="Dollar amount (with dot and two decimal places)" />
                    </div>
                    <div className="col-3"><button onClick={() => filter(setOrders, allOrders, minPrice, maxPrice, minDate, maxDate, empId)}>Submit</button></div>
                </div>
                <table class="table">
                    <thead>
                        <tr>
                            <th scope="col">Order ID</th>
                            <th scope="col">Customer Name</th>
                            <th scope="col">Transaction Price</th>
                            <th scope="col">Transaction Date</th>
                            <th scope="col">Done by Employee</th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order) => {
                            return <ViewOrderRow order={order} />
                        })}
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default ViewOrders;