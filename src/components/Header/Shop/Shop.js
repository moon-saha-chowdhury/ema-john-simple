import React, { useEffect, useState } from 'react';
import { addToDatabaseCart, getDatabaseCart } from '../../../utilities/databaseManager';
import Cart from '../../Cart/Cart';
import Product from '../Product/Product';
import { Link } from 'react-router-dom';
import './Shop.css';

const Shop = () => {
    // const first10 = fakeData.slice(0, 10);
    const [products, setProducts] = useState([]);

    const [cart, setCart] = useState([]);
    //Load Data from MongoDb database
    useEffect(()=>{
        fetch('http://localhost:5000/products')
        .then(res => res.json())
        .then(data => setProducts(data))
    },[])

    useEffect(()=> {
        const savedCart = getDatabaseCart();
        const productKeys = Object.keys(savedCart);

        fetch('http://localhost:5000/productByKeys',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'

            },
            body:JSON.stringify(productKeys)
        })
        .then(res => res.json())
        .then(data => setCart(data))


        // console.log(products,productKeys);
        // if(products.length){
        //     const previousCart = productKeys.map( existingKey =>{
        //         const product = products.find(pd => pd.key === existingKey)
        //         product.quantity = savedCart[existingKey]
        //         return product;
        //     })
        //     setCart(previousCart);
        // }

    },[]);

    const handleAddProduct= (product) =>{
        // console.log('Product clicked');
        const toBeAddedKey = product.key;
        const sameProduct = cart.find(pd => pd.key === toBeAddedKey);
        let newCart;
        let count = 1;
        if(sameProduct){
            count = sameProduct.quantity + 1;
            sameProduct.quantity = count;
            const others = cart.filter(pd => pd.key !== toBeAddedKey);
            newCart =[...others, sameProduct]
        }
        else{
            product.quantity =1;
            newCart =[...cart,product];
        }
       
        setCart(newCart);
        addToDatabaseCart(product.key, count);

    }
    return (
        <div className="twin-container">
            <div className="product-container">
                {
                    products.map(pd => <Product 
                        key={pd.key}
                        showAddToCart={true}
                        product={pd} 
                        handleAddProduct ={handleAddProduct}>
                        </Product>)
                }
        </div>
            <div className="card-container">
                <Cart cart={cart}></Cart>
            <Link to="/review">
            <button className="main-button">Review Order</button>
            </Link>
            </div>

        </div>
    );
};

export default Shop;