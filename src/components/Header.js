import React, { useState, useEffect } from 'react';
import Cart from './Cart';
import SearchProduct from './SearchProduct';
import { Link } from "react-router-dom";

const Header = ({cart, handleRestItem, handleSumItem, handleDeleteItem}) => {

    const [showCart, setShowCart] = useState(false);
    const [totalItemsCart, settotalItemsCart] = useState(0);

    const handleCart = () => {
        setShowCart(!showCart);
    }

    useEffect(() => {
        const calculeItems = () => {
            let totalItems = 0;
            cart.map( (item) => {
                totalItems+=item.quantity;
            });

            settotalItemsCart(totalItems);
        }

        calculeItems();

    }, [cart]);

    return (
   <div className="navigation">
    <div className="logo">

        <Link to="/" className="no-underline" >Market Place</Link>
    </div>
    <div className="navigation-search-container">
        <SearchProduct/>
    </div>
    <div className="navigation-icons">


      <a className="navigation-link notifica" onClick={handleCart}>
      <i className="fa fa-shopping-cart"></i>
        <div className="notification-bubble-wrapper">
            <div className="notification-bubble">
                <span className="notifications-count">
                    {totalItemsCart}&nbsp;&nbsp;
                    </span>
            </div>
          </div>
      </a>

      {  showCart ?
         <Cart
            cart={cart}
            handleRestItem={handleRestItem}
            handleSumItem={handleSumItem}
            handleDeleteItem={handleDeleteItem}
         />
        : null
       }


    </div>
  </div>
  );
}

export default Header;