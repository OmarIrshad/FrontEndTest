// import Head from 'next/head'
// import Image from 'next/image'
import cfaHomeSand from './assets/cfaHomeSand.png';
import cfaHomeCoke from './assets/cfaHomeCoke.png';
import NavBar from './components/universal/NavBar'
import './styles/homepage.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './Home';
import MenuView from './customerpages/MenuView';
import { createContext, useState, useEffect } from 'react';
import CartView from './customerpages/CartView';
import Login from './Login';
import ServerHome from './serverpages/ServerHome';
import Forbidden from './Forbidden';
import ManagerLayout from './managerpages/ManagerLayout';
import FindView from './customerpages/FindView';

export const ThemeContext = createContext(null);

export default function App() {
  const [theme, setTheme] = useState("normal");
  const toggleTheme = () => {
    setTheme((curr) => {
      if (curr === "normal"){
        localStorage.setItem("theme", "blind")
        return "blind"
      }
      else{
        localStorage.setItem("theme", "normal")
        return "normal"
      }
    })
  };
  useEffect(() => {
    const state = localStorage.getItem("theme");
    setTheme(state)
  }, []);
  const [cart, setCart] = useState([]);

  //Add Items in cart -> MenuView -> MenuItemCard
  function addToCart(item, cart, setCart, id) {
    console.log("we are in add to cart");
    const cartCopy = [...cart]
    const iteminCart = cartCopy.find(item => item.item_id === id)
    const index = cartCopy.findIndex(item => item.item_id === id)
    if (iteminCart) {
      console.log("Item Found")
      const updatedItem = { ...iteminCart, item_quantity: iteminCart.item_quantity + 1 };
      cartCopy[index] = updatedItem
      console.log("Cart Copy")
      setCart(cartCopy)
    }
    else {
      console.log("Item Not Found")
      setCart(previousCart => {
        const newCart = [...previousCart, item]
        return newCart
      });
    }

    console.log(cart)
  }
  //Increment Items in cart -> CartView -> CartItemCard
  function incrementCartItem(cart, setCart, id) {
    const cartCopy = [...cart]
    const iteminCart = cartCopy.find(item => item.item_id === id)
    const index = cartCopy.findIndex(item => item.item_id === id)
    console.log("Incrementing Item")
    const updatedItem = { ...iteminCart, item_quantity: iteminCart.item_quantity + 1 };
    cartCopy[index] = updatedItem
    setCart(cartCopy)

  }
  //Decrement Items in cart -> CartView -> CartItemCard
  function decrementCartItem(cart, setCart, id) {
    const cartCopy = [...cart]
    const iteminCart = cartCopy.find(item => item.item_id === id)
    const index = cartCopy.findIndex(item => item.item_id === id)
    console.log("Decrementing Item")
    if (iteminCart.item_quantity === 1) {
      console.log("Deleting Last item")
      cartCopy.splice(index, 1);
      setCart(cartCopy)
    }
    else {
      const updatedItem = { ...iteminCart, item_quantity: iteminCart.item_quantity - 1 };
      cartCopy[index] = updatedItem
      setCart(cartCopy)
    }
  }

  function sendOrder(cart, setCart, order_price) {
    cart = []
    console.log("Sending Order");
    console.log(order_price);
    setCart(cart);
  }
  var translateAdded = false;
  const googleTranslateElementInit = () => {
    if (!translateAdded)
    {
      translateAdded = true
      new window.google.translate.TranslateElement({
        pageLanguage: "en",
        layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE
      }, "google_translate_element");
    }
  };
  useEffect(() => {
    var addTraslate = document.createElement("script");
    addTraslate.setAttribute(
      "src", "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
    );
    document.body.appendChild(addTraslate);
    window.googleTranslateElementInit = googleTranslateElementInit;
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div id={theme}>
      <div id = "google_translate_element"/>
      <button className={"elem accessibility"} onClick={() => toggleTheme()}>Color</button>
        <BrowserRouter>
        
          <Routes>
            <Route path="/" element={<Home cart = {cart}/>}></Route>
            <Route path="/menu" element={<MenuView cart={cart} addToCart={addToCart} setCart={setCart} />}></Route>
            <Route path="/login" element={<Login cart = {cart}/>}></Route>
            <Route path="/server" element={<ServerHome />}></Route>
            <Route path="/cart" element={<CartView cart={cart} setCart={setCart} incrementCartItem={incrementCartItem} decrementCartItem={decrementCartItem} sendOrder={sendOrder} />}></Route>
            <Route path="/manager" element={<ManagerLayout />}></Route>
            <Route path="/forbidden" element={<Forbidden />}></Route>
            <Route path="/items" element={<ManagerLayout />}></Route>
            <Route path="/ingredients" element={<ManagerLayout />}></Route>
            <Route path="/employees" element={<ManagerLayout />}></Route>
            <Route path="/orders" element={<ManagerLayout />}></Route>
            <Route path="/find" element={<FindView cart = {cart}/>}></Route>
          </Routes>
        </BrowserRouter>
      </div>
    </ThemeContext.Provider>
  );

};
