import NavBar from "../components/universal/NavBar";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LineGraph from "../components/manager/graphs/LineGraph";
import BarChartGraph from "../components/manager/graphs/BarChartGraph";
import PieChartGraph from "../components/manager/graphs/PieChartGraph";
import "../styles/manager/managerhome.css";

/**
 * react component for manage home page
 * @function
 * @author @AakashHaran
 */
const ManagerHome = () => {
    const [sales, setSales] = useState(0);
    const [customers, setCustomers] = useState(0);

    useEffect(() => {
        setSales(1237.41);
        setCustomers(153);
    }, [])

    return (
        <>
            <div style={{ paddingLeft: '3%', paddingRight: '3%', marginBottom: '5%' }}>
                <div className={"row"} style={{ marginTop: '3%', height: '39vh' }}>
                    <div className={"col-4"}>
                        <BarChartGraph />
                    </div>
                    <div className={"col-5"}>
                        <PieChartGraph />
                    </div>
                    <div className={"col-3 fade-in-animation"}>
                        <div className={"row"} style={{ height: '40%', textAlign: 'center', boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px' }}>
                            <p class="fa-solid fa-2xl" style={{ marginTop: '7%' }}><i class="fa-solid fa-dollar-sign"></i>  {sales}</p>
                            <p class="text-secondary">Earned this month</p>
                        </div>
                        <div className={"row"} style={{ marginTop: '5%', height: '40%', textAlign: 'center', boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px' }}>
                            <p class="fa-solid fa-2xl" style={{ marginTop: '7%' }}><i class="fa-solid fa-user"></i>  {customers}</p>
                            <p class="text-secondary">Customers this month</p>
                        </div>
                    </div>
                </div>
                <div className={"row"} style={{ marginTop: '5%' }}>
                    <div style={{ height: '35vh', width: '100%' }}>
                        <LineGraph />
                    </div>
                </div>
            </div>
        </>
    );
}

export default ManagerHome;