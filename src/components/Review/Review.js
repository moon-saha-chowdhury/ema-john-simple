import React, { useEffect, useState } from 'react';
import fakeData from '../../fakeData';
import { getDatabaseCart, processOrder, removeFromDatabaseCart } from '../../utilities/databaseManager';
import Cart from '../Cart/Cart';
import ReviewItems from '../ReviewItems/ReviewItems';
import happyImage from '../../images/giphy.gif';

const Review  = () => {
    const[cart, setCart] = useState([]);
    const[orderPlaced, setOrderPlaced]= useState(false);
    const handlePlaceOrder =()=>{
        setCart([]);
        setOrderPlaced(true);
        processOrder();

    }

    const removeProduct = (productKey)=>{
        const newCart = cart.filter(pd => pd.key !== productKey);
        //er mane j product ta k remove korte chai seta bade baki j ki ache sob filter kore newCart a rakhlam
        setCart(newCart);
        removeFromDatabaseCart(productKey);
        //jehetu database management file theke method niye kaj korchi tai loclal storage theke
        //remove korar jonno database er method call kore productkey pass kore diyechi jeno seta database thekeu remove hoy

    }
    useEffect(() =>{
        const savedCart = getDatabaseCart();
        const productKeys = Object.keys(savedCart);
        const cartProducts = productKeys.map(key => {
            const product = fakeData.find(pd => pd.key === key);
            product.quantity = savedCart[key];
            return product;
        });

        setCart(cartProducts);
    },[])

    let thankYou;
    if(orderPlaced){
        thankYou = <img src={happyImage} alt=""/>

    }
    return (
        <div className="twin-container">
            <div className="product-container">
            {
                cart.map(pd => <ReviewItems product={pd} removeProduct={removeProduct} key={pd.key}></ReviewItems>)
            }
            {
                thankYou
            }
            </div>
            <div className="card-container">
                <Cart cart={cart}>
                    <button onClick={handlePlaceOrder} className="main-button">Place Order</button>
                </Cart>

            </div>
        </div>
    );
};

export default Review;