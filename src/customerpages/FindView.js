import NavBar from '../components/universal/NavBar';
import Map from '../components/universal/mapUI'
import React from 'react'
const navItems = [
  { navItemName: "Home", route: "/" },
  { navItemName: "Menu", route: "/menu" },
  { navItemName: "Find", route: "/find" }
];

/**
 * react component for the find feature of the customer
 * to show nearest Chick Fil A
 * @function
 * @author @OmarIrshad @ThucTran
 */
export default function FindPage(props) {
  return (
    <div>
      <NavBar navItems={navItems} cart = {props.cart} isCustomer={false} home={"/"} />
      <h1>Find Nearest Location</h1>
      <Map></Map>
    </div>
  );
};