import React, { useState, useEffect } from 'react';
import CartItem from './CartItem';

const Cart = ({cart, handleRestItem, handleSumItem, handleDeleteItem}) => {

    const [info, setInfo] = useState({});

    useEffect( () => {
        const calculeTotal = () => {
            let totalItems = 0;
            let totalPrices = 0
            cart.map( (item) => {
                totalItems+=item.quantity;
                totalPrices+= (item.price) * item.quantity;
            });

            setInfo({
                'numberItems' : totalItems,
                'totalPrices': totalPrices
            });
        }

        calculeTotal();

    }, [cart]);

    return (

    <div className="dropdown-cart show-dropdown-cart" id="dropdown-cart">

    <div className="shopping-cart">
    <div className="shopping-cart-header">
      <span> <i className="fa fa-shopping-cart cart-icon"></i><span className="badge">
          { (!info.numberItems) ? 'The cart is empty' : info.numberItems }
          </span></span>
      <div className="shopping-cart-total">
        <span className="lighter-text">Total:</span>
        <span className="main-color-text">${info.totalPrices}</span>
      </div>
    </div>

    <ul className="shopping-cart-items">
    {   cart.map( (item) => (
            <CartItem
               key={item._id}
               item={item}
               handleRestItem={handleRestItem}
               handleSumItem={handleSumItem}
               handleDeleteItem={handleDeleteItem}
            />
         ))
    }

    </ul>

    { (info.numberItems) ?
       (
          <a href="#" className="block w-full bg-teal-600 border-2
            border-teal-500 hover:border-teal-600 px-3 py-2
            rounded uppercase font-poppins font-medium btn-checkout"
          >Checkout</a>
        ) : null
    }


       </div>
    </div>
  );
}

export default Cart;