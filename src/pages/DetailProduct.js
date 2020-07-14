
import './detail.css';
import React, { useState, useEffect, Fragment} from 'react';
import { Link } from "react-router-dom";
import baseUrl from '../configapi.js';
import axios from 'axios';
import Header from '../components/Header';
import Notiflix from 'notiflix-react';

const DetailProduct = ({ match }) => {

    const [product, setproduct] = useState([]);
    const [cart, setCart] = useState([]);

    const search = match.params.id;

    useEffect( () => {

        const getProduct = async () => {
          const url =  `${baseUrl}/product/${search}`;
          let info = await axios.get(url);
          setproduct(info.data);
        }

        const getCartItems =
            (localStorage.getItem('cart')) ?
            JSON.parse(localStorage.getItem('cart')) : [];

        setCart(getCartItems);
        getProduct();
        Notiflix.Notify.Init({});
        Notiflix.Notify.Init({
            width:'300px',
            position:'right-top',
            distance:'15px',
        });


    }, [search]);

    const handleAddtoCart = () => {

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
        Notiflix.Notify.Success('Product successfully removed');

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


          <main>
            <div className="container">

              { (!product.name)  ?
              <div className="grid second-nav">
                <div className="column-xs-12">
                  <nav>
                    <ol className="breadcrumb-list">

                      <li className="breadcrumb-item active">Without results....</li>
                    </ol>
                  </nav>
                </div>
              </div>  :

              <div className="grid product">
                <div className="column-xs-12 column-md-7">
                  <div className="product-gallery">
                    <div className="product-image">
                      <img className="active" src={product.image}/>
                    </div>

                  </div>
                </div>
                <div className="column-xs-12 column-md-5">
                  <h1>{product.name}</h1>
                  <h2>${product.price}</h2>
                  <div className="description">
                    <p>There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some
                      form, by injected humour, or randomised words which don't look even slightly believable.
                      If you are going to use a passage of Lorem Ipsum, you need to be sure
                       there isn't anything embarrassing hidden in the middle of text.
                       All the Lorem Ipsum generators on the Internet tend to repeat predefined
                       chunks as necessary, making this the first true generator on the Internet.
                       It uses a dictionary of over 200 Latin words, combined with a handful of
                       model sentence structures, to generate Lorem Ipsum which looks reasonable  </p>
                  </div>
                  <button className="add-to-cart" onClick={handleAddtoCart}>Add To Cart</button>
                </div>
              </div>

                 }

            </div>
          </main>

      </Fragment>
    );
}

export default DetailProduct;