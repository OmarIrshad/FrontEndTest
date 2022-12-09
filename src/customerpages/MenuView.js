import '../styles/customer/menu.css'
import MenuNavBar from '../components/customer/MenuNavBar';
import MenuItemCard from '../components/customer/MenuItemCard';
import NavBar from '../components/universal/NavBar';
import React, { useEffect, useState } from "react";
import { getItems } from '../managerpages/ViewItems';

const navItems = [
    { navItemName: "Home", route: "/" },
    { navItemName: "Menu", route: "/menu" },
    { navItemName: "Find", route: "/find" }
];

/**
 * react component to show the menu page
 * on the customer side
 * @function
 * @param {Object} props - props passed down by parent component
 * @author @OmarIrshad @AhsanWaseem
 */
export default function MenuView(props) {
    const [myitems, setItems] = useState([]);
    const [allitems, setAllItems] = useState([]);

    useEffect(() => {
        getItems(setAllItems);
        const newitems = allitems.filter((item) => item.item_type === "Entrees");
        console.log("NEW ITEMS", allitems)
        setItems(newitems);
    }, []);

    return (
        <div style={{ overflow: 'hidden', height: 'fit-content', paddingBottom: '10%' }}>
            <NavBar navItems={navItems} isCustomer={false} cart = {props.cart} home={"/"} />
            <MenuNavBar menuNavBar allitems={allitems} myitems={myitems} setItems={setItems} ></MenuNavBar>

            <div className={"gridcontainer"}>
                {myitems.map((item) => { return <MenuItemCard className={"griditem"} item={item} addToCart={props.addToCart} cart={props.cart} setCart={props.setCart} ></MenuItemCard> })}
            </div>
        </div>
    );
};
