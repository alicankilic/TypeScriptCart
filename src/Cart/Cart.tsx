import React from "react";
import CartItem from "../CartItem/CartItem";
import Button from "@material-ui/core/Button";


//Styles
import { Wrapper } from "./Cart.styles";
//Types
import { CartItemType } from "../App";

interface Props {
  cartItems: CartItemType[];
  addToCart: (clickedItem: CartItemType) => void;
  removeFromCart: (id: number) => void;
}

const Cart: React.FC<Props> = ({ cartItems, addToCart, removeFromCart }) => {
  
  const calculateTotalMoney  = (items:CartItemType[]) => {
      return(
          items.reduce((ack:number,items) => {
            return ack+items.amount*items.price;
          },0)
      )
  }



  return (
    <Wrapper>
      <h2>Your Shopping Cart</h2>
      {cartItems.length === 0 ? <p>No Items in Cart.</p> : undefined}
      {cartItems.map((item) => {
        return (
          <CartItem
            key={item.id}
            item={item}
            addToCart={addToCart}
            removeFromCart={removeFromCart}
          />
        );
      })}
      <div>
          <strong>Total Price Of The Cart</strong>
          <Button variant="text" size="small">Price : ${calculateTotalMoney(cartItems).toFixed(3)}</Button>
      </div>
    </Wrapper>
  );
};

export default Cart;
