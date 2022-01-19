import React from "react";
import { useState } from "react";
import { useQuery } from "react-query";

//Components
import Drawer from "@material-ui/core/Drawer";
import { LinearProgress } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import { Badge } from "@material-ui/core";

//Styles

import { Wrapper } from "./App.styles";
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
  const { data, isLoading, error } = useQuery<CartItemType[]>(
    "products",
    getProducts
  );

  const [serhat,setSerhat] = useState<String>("Serhat AK")
 
  console.log(data);
   
  const getTotalItems =  () => null;
  const handleAddToCart = () => null;

  const handleRemoveCart = () => null;   

  if(isLoading) return <LinearProgress />;
  if(error) return <div>Something Went Wrong</div>;

  return <div className="App"></div>;
};

export default App;
