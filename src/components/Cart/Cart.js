import React from 'react';
const Cart = (props) => {
    const cart = props.cart;
    // console.log(cart);
    // const totalPrice = cart.reduce((total,prd) => total + prd.price,0);
    let total = 0;
    for (let i = 0; i < cart.length; i++) {
        const product = cart[i];
        console.log(product.price, product.quantity)
        total = total + product.price * product.quantity || 1;
        //keno error hoche bujhar jonno debug dev tool jeno oi place a hit kore orthat error place a
        //jeno hit kore tai sei place er niche debugger likhe dibo tahole react devtool seikhane hit korbe
        //debugger;
        
    }

    let shipping = 0;
    if(total>35){
        shipping = 0;
    }
    else if(total>15){
        shipping = 4.99;
    }
    else if(total>0){
        shipping = 12.99;
    }

    const tax = total/10;
    // const tax = (total/10).toFixed(2); mane 2 decimal obdi dekhate chai decimal a dile total price er age Number(er vitor total price hobe)
    const grandTotal =(total+shipping+ Number(tax)).toFixed(2);

    const formatNumber = num =>{
        const precision = num.toFixed(2);
        return Number(precision);
    }
    return (
        <div>
            <h4 className='text-warning'>Order summary</h4>
            <p>Items Ordered: {cart.length}</p>
            <p>Product Price: {formatNumber(total)}</p>
            <p><small>Shipping Cost: {shipping }</small></p>
            <p><small>Tax: {formatNumber(tax)}</small></p>
            <p>Total Price: {grandTotal} </p>
            <br/>
            {
                props.children
            }

           
        </div>
    );
};

export default Cart;