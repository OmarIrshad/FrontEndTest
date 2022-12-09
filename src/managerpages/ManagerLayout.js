import NavBar from "../components/universal/NavBar";
import ManagerHome from "./ManagerHome";
import ViewIngredients from "./ViewIngredients";
import ViewItems from "./ViewItems";
import ViewEmployees from "./ViewEmployees";
import ViewOrders from "./ViewOrders";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const navItems = [
    { navItemName: "Items", route: "/items" },
    { navItemName: "Stock", route: "/ingredients" },
    { navItemName: "Employees", route: "/employees" },
    { navItemName: "Orders", route: "/orders" }
];

/**
 * function to dynamically render components
 * depending on the path the user accesses
 * @function
 * @author @AakashHaran
 */
function placePage() {
    const path = window.location.pathname;
    switch (path) {
        case "/manager":
            return <ManagerHome />
        case "/items":
            return <ViewItems />
        case "/ingredients":
            return <ViewIngredients />
        case "/employees":
            return <ViewEmployees />
        case "/orders":
            return <ViewOrders />
    }
}

/**
 * method for validating whether a user is indeed the manager 
 * before accessing this page
 * @function
 * @param {method} navigate - the method used to navigate the user to different pages
 * @author @AakashHaran
 */
const validateManager = (navigate) => {
    if (sessionStorage.getItem("role") !== "manager") {
        navigate("/forbidden");
    }
}

/**
 * react component for templating the manager layout
 * @function
 * @author @AakashHaran
 */
const ManagerLayout = () => {
    const navigate = useNavigate();

    useEffect(() => {
        validateManager(navigate);
        console.log("HERE")
    }, [])

    return (
        <>
            <NavBar navItems={navItems} home={"/manager"} />
            {placePage()}
        </>
    );
}

export default ManagerLayout;