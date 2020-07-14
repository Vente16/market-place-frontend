import React, { useState, useEffect, createContext } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children } ) => {

    const [cartData, setCartData] = useState(null);

    useEffect( () => {
        let data =
            (localStorage.getItem('cart')) ?
            JSON.parse(localStorage.getItem('cart')) : [];

        setCartData(data);

    }, []);

   return (
      <CartContext.Provider
            value={{
              cartData
          }}
      >
         { children }
      </CartContext.Provider>
    );


  }