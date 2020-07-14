import React from 'react';

const CartItem = ({item, handleRestItem, handleSumItem, handleDeleteItem}) => {

    const restOpertaion = () => {

        if(item.quantity > 1){
           handleRestItem(item);
        }
    }

    const sumOperations = () => {
        handleSumItem(item);
    }

    const removeItem = () => {
        handleDeleteItem(item);
    }

    return (
        <li className="clearfix">
            <img className="img-item-cart" src={item.image} alt={item.image}/>
            <div className="item-cart-info">
            <span className="item-name">{item.name}</span><br/>
            <span className="item-price">${item.price}</span><br/>
            <span className="item-quantity"><strong>Quantity: </strong>{item.quantity}</span><br/>
            <div className="buttons-item">
            <button className="btn-quantity bg-orange-500 text-white font-bold"
                onClick={restOpertaion}> -
            </button>
            <button className="btn-quantity bg-green-500 text-white font-bold"
                onClick={sumOperations}> +
            </button>
            <button onClick={removeItem} className="btn-quantity bg-red-500 text-white font-bold"
            ><i className="fa fa-trash" aria-hidden="true"></i></button>
            </div>
            </div>
        </li>
     );
}

export default CartItem;