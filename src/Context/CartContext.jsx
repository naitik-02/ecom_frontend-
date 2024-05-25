import { createContext, useContext, useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { server } from "../main";
import axios from "axios";
import { fetchCart } from "../../../backend/controller/cart";

const CartContext = createContext();

export const CartContextProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [totalItem, setTotalItem] = useState(0);
  const [cart, setCart] = useState([]);
  const [subTotal, setSubTotal] = useState(0);

  const token = localStorage.getItem("token");

  async function FetchCart() {
    try {
      const { data } = await axios.get(`${server}/api/cart/all`, {
        headers: {
          token,
        },
      });

      setCart(data.cart);
      setSubTotal(data.subTotal);
      setTotalItem(data.totalItem);
    } catch (error) {
      console.log(error);
    }
  }

  async function addToCart(product) {
    try {
      const { data } = await axios.post(
        `${server}/api/cart/new`,
        {
          product,
        },
        {
          headers: {
            token,
          },
        }
      );

      if (data.message) {
        toast.success(data.message);
        FetchCart();
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function updateCart(action , id){
    try {

      const {data} = await axios.put(`${server}/api/cart?action=${action}`,{id},{
        headers:{
          token,
        }
      })
      FetchCart();
    } catch (error) {
      toast.error(error.response.data.message)
      
    }
  }

async function removeFromCart(id){
try {
  const {data} = await axios.delete(`${server}/api/cart/${id}`,{
    headers:{
      token
    }
  })
  toast.success(data.message)

  FetchCart()
  
} catch (error) {
  toast.error(error.response.data.message)
  
}
}

  useEffect(() => {
    FetchCart();
  }, []);

  return (
    <CartContext.Provider value={{ cart, totalItem, subTotal, addToCart ,updateCart,removeFromCart,FetchCart}}>
      {children}
      <Toaster />
    </CartContext.Provider>
  );
};

export const CartData = () => useContext(CartContext);
