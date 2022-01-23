import React from "react";
import { useState } from "react";
import { useQuery } from "react-query";

//Components
import Item from "./Item/Item";
import Drawer from "@material-ui/core/Drawer";
import Cart from "./Cart/Cart";
import { LinearProgress } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import { Badge } from "@material-ui/core";

//Styles

import { Wrapper } from "./App.styles";
import { StyledButton } from "./App.styles";
// Types

export interface CartItemType {
  id: number;
  category: string;
  description: string;
  image: string;
  price: number;
  title: string;
  amount: number;
}

const getProducts = async (): Promise<CartItemType[]> => {
  const response = await fetch("https://fakestoreapi.com/products");
  const data = await response.json();
  console.log(data);
  console.log("you are welcome");
  return data;
};

const App: React.FC = () => {
  const [cartOpen, setCartOpen] = useState<boolean>(false);
  const [cartItems, setCartItems] = useState<CartItemType[]>([]);
  const { data, isLoading, error } = useQuery<CartItemType[]>(
    "products",
    getProducts
  );

  console.log(data);

  const getTotalItems = (items: CartItemType[]) => {
    return items.reduce((ack: number, item) => ack + item.amount, 0);
  };
  const handleAddToCart = (clickedItem: CartItemType) => {
    setCartItems((previous) => {
      const isItemInCart = previous.find((item) => item.id === clickedItem.id);
      if (isItemInCart) {
        return previous.map((item: CartItemType) => {
          return item.id === clickedItem.id
            ? { ...item, amount: item.amount + 1 }
            : item;
        });
      }

      return [...previous, { ...clickedItem, amount: 1 }];
    });
  };

  const handleRemoveCart = () => null;

  if (isLoading) return <LinearProgress />;
  if (error) return <div>Something Went Wrong</div>;

  return (
    <Wrapper>
      <Drawer anchor="right" open={cartOpen} onClose={() => setCartOpen(false)}>
        <Cart
          cartItems={cartItems}
          addToCart={handleAddToCart}
          removeFromCart={handleRemoveCart}
        />
      </Drawer>
      <StyledButton onClick={() => setCartOpen(true)}>
        <Badge badgeContent={getTotalItems(cartItems)} color="error">
          <AddShoppingCartIcon />
        </Badge>
      </StyledButton>
      <Grid container spacing={3}>
        {data?.map((item: CartItemType) => {
          return (
            <Grid item key={item.id} xs={12} sm={4}>
              <Item item={item} handleAddToCart={handleAddToCart} />
            </Grid>
          );
        })}
      </Grid>
    </Wrapper>
  );
};

export default App;
