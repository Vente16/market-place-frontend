import React, { useState, useEffect, Fragment} from 'react';
import { Link } from "react-router-dom";
import Product from '../components/Product';
import baseUrl from '../configapi.js';
import axios from 'axios';
import Header from '../components/Header';

const SearchProduct = ({ match }) => {

    const [products, setproducts] = useState([]);
    const [cart, setCart] = useState([]);

    const search = match.params.word;

    useEffect( () => {

        const getProduct = async () => {
          const url =  `${baseUrl}/product/word/${search}`;
          let info = await axios.get(url);
          setproducts(info.data);
        }

        const getCartItems =
            (localStorage.getItem('cart')) ?
            JSON.parse(localStorage.getItem('cart')) : [];

        setCart(getCartItems);
        getProduct();


    }, [search]);

    const handleAddtoCart = (product) => {

       let storage = JSON.parse(localStorage.getItem('cart'));
       let data = (storage) ? storage : [];
       let newData = {...product };
       newData.quantity = 1;
       if(data.length){
            let noexit = false;
            let ids = "";
            data.filter( (item) => {
                ids+=`${item._id} `;
                // If the product exists I do not add it, I add the quantity
                if(item._id === newData._id){
                    item.quantity = item.quantity + 1;
                }
            });
            // If the product does not exist in the cart I add it
            if(ids.indexOf(newData._id) === -1){
                data = [...data, newData];
            }

       }else{
          data.push(newData);
       }
        localStorage.setItem('cart', JSON.stringify(data));
        setCart(data);

    }

    const handleRestItem = (product) => {

        let data = [...cart];
        data.filter((item) => {
            if(item._id === product._id) {
               item.quantity = item.quantity - 1;
            }
        });

        localStorage.setItem('cart', JSON.stringify(data));
        setCart(data);
    }

    const handleSumItem = (product) => {

        let data = [...cart];
        data.filter((item) => {
            if(item._id === product._id) {
               item.quantity = item.quantity + 1;
            }
        });

        localStorage.setItem('cart', JSON.stringify(data));
        setCart(data);
    }

    const handleDeleteItem = (product) => {
        let newdata = [...cart].filter( (item) => item._id !== product._id );
        localStorage.setItem('cart', JSON.stringify(newdata));
        setCart(newdata);
    }


    return (
       <Fragment>
           <Header
               cart={cart}
               handleRestItem={handleRestItem}
               handleSumItem={handleSumItem}
               handleDeleteItem={handleDeleteItem}
            />
            <section className="color-1 mt-20">
                <h3>CATEGORIES</h3>
				<nav className="cl-effect-1">
                    <Link to="/" className="activeCategorie">All</Link>
					<Link to="/Car">Cars</Link>
					<Link to="/Kitchen">Kitchen</Link>
					<Link to="/Clothes">Clothes</Link>
					<Link to="/Technology">Technology</Link>
				</nav>
			</section>
            <div className="flex justify-center items-center">

            </div>
            <div className="flex justify-center items-center mt-20">


                <div className="wrapper">

                    { products.map(product => (
                        <Product
                            key={product._id}
                            product={product}
                            handleAddtoCart={handleAddtoCart}
                        />
                    ) )
                    }
                    {
                      (!products.length) ? <h3> Without results....</h3> : null
                    }
                </div>
            </div>
       </Fragment>

    );
}

export default SearchProduct;