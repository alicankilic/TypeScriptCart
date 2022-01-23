import React from "react";
import Button from "@material-ui/core/Button";

//Types

import { CartItemType } from "../App";

//Styles

import { Wrapper } from "./CartItem.styles";

interface Props {
  item: CartItemType;
  addToCart: (clikedItem: CartItemType) => void;
  removeFromCart: (id: number) => void;
}

const CartItem: React.FC<Props> = (Props) => {
  // Obj Destructing
  const { item, addToCart, removeFromCart } = Props;

  return (
    <Wrapper>
      <div>
        <h3>{item.title}</h3>
        <div className="information">
          <p>Price: ${item.price}</p>
          <p>Total: ${(item.amount * item.price).toFixed(2)}</p>
        </div>
        <div className="buttons">
          <Button
            size="small"
            disableElevation
            variant="contained"
            onClick={() => removeFromCart(item.id)}
          > - </Button>
          <p>
              {item.amount}
          </p>
          <Button
            size="small"
            disableElevation
            variant="contained"
            onClick={() => addToCart(item)}
          > + </Button>
        </div>
      </div>
      <div>
          <img src={item.image} alt={item.title} />
      </div>
    </Wrapper>
  );
};

export default CartItem;
