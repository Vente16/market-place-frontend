import React from 'react';
import styled from '@emotion/styled';
import { Link } from "react-router-dom";
const Product = ({product, handleAddtoCart}) => {

    const ImgProducto = styled.div`
        background-image: url(${product.image});
    `;

    const urlDetail = `/detail/${product._id}`;

    return (
        <div className="w-full p-2">
          <div className="bg-white shadow-lg hover:shadow-xl rounded-lg ">

          <ImgProducto className="bg-gray-400 h-64 rounded-t-lg p-4 bg-no-repeat bg-center bg-cover"></ImgProducto>
            <div className="flex justify-between items-start px-2 pt-2">
              <div className="p-2 flex-grow">
                <h1 className="font-medium text-xl font-poppins">{product.name}</h1>
                  <p className="text-gray-500 font-nunito">Category: {product.category}</p>
              </div>
              <div className="p-2 text-right">
             <div className="text-teal-500 font-semibold text-lg font-poppins">${product.price}</div>

              </div>
            </div>
            <div className="flex justify-center items-center px-2 pb-2">
              <div className="w-1/2 p-2">

              <Link to={urlDetail} className="block w-full bg-teal-500 hover:bg-teal-600 text-white border-2 border-teal-500 hover:border-teal-600 px-3 py-2 rounded uppercase font-poppins font-medium btn-detail" >
                  <i className="fa fa-eye" aria-hidden="true"></i>&nbsp;
                    Details
               </Link>

              </div>
              <div className="w-1/2 p-2">
                <button
                  onClick={ () => handleAddtoCart(product) }
                className="block w-full bg-white hover:bg-gray-100 text-teal-500 border-2 border-teal-500 px-3 py-2 rounded uppercase font-poppins font-medium add-card">
                  Add to cart
                </button>
              </div>
            </div>
          </div>
        </div>
    );
}

export default Product;