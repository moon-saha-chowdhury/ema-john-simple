import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee, faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import './Product.css';

const Product = (props) => {
    // console.log(props);
    const {img,name,seller,price,stock}=props.product;
    //aikhane destructuring kora hoyeche. orthat product object er img property = img and name property =name//
    return (
        <div className="product">
            <div>
                <img src={img} />

            </div>
            <div>
                <h4 className="product-name">{name}</h4>
                <br/>
                <p><small>by {seller}</small></p>
                <p>${price}</p>
                <br/>
                <p>Only {stock} left in stock- Order Soon!</p>
                <button className="main-button" onClick={()=>props.handleAddProduct(props.product)}> 
                <FontAwesomeIcon icon={faShoppingCart} /> Add To Cart
                </button>
            </div>
        </div>
    );
};

export default Product;