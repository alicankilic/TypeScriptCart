import React from "react";
import CartItem from  "../CartItem/CartItem";

//Styles
import { Wrapper } from "./Cart.styles";
//Types
import { CartItemType } from "../App";

interface Props{
    cartItems:CartItemType[];
    addToCart: (clickedItem:CartItemType) => void;
    removeFromCart: (id:number) => void;
};

const Cart:React.FC<Props> = ({cartItems,addToCart,removeFromCart}) => {
    
    return(
        <Wrapper>
            <h2>Your Shopping Cart</h2>
            {cartItems.length === 0 ? <p>No Items in Cart.</p> : undefined}
            {cartItems.map((item) => {
                return(
                    <CartItem />
                )
            })}
        </Wrapper>
    )


}

export default Cart;