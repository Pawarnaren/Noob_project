import React, { useEffect, useState } from 'react';
import Loader from '../Components/Loader/Loader';
import emptycart from "../Components/images/emptycart.png";
import { TiDelete } from "react-icons/ti";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get("http://localhost:1090/api/v1/get-user-cart", { headers });
        setCart(response.data.data);
      } catch (error) {
        console.error("Error fetching cart:", error);
      }
    };
    fetch();
  }, []);

  const deleteItem = async (bookid) => {
    try {
      const response = await axios.put("http://localhost:1090/api/v1/delete-from-cart", {}, {
        headers: {
          ...headers,
          bookid
        }
      });
      alert(response.data.message);
      setCart(cart.filter(item => item._id !== bookid)); // Update the cart state
    } catch (error) {
      console.error("Error deleting item from cart:", error);
    }
  };

  useEffect(() => {
    if (cart && cart.length > 0) {
      let sum = 0;
      cart.forEach((items) => {
        sum += items.price;
      });
      setTotal(sum);
    }
  }, [cart]);

  const PlaceOrder = async () => {
    try {
      const response = await axios.post("http://localhost:1090/api/v1/place-order", { order: cart }, { headers });
      alert(response.data.message);
      navigate("/profile/orderHistory");
    } catch (error) {
      console.error("Error placing order:", error);
      alert(`Error placing order: ${error.response?.data?.message || error.message}`);
    }
  };

  return (
    <div className='bg-zinc-900 h-[100vh]'>
      {!cart && <Loader />}
      {cart && cart.length === 0 && (
        <div className='h-screen bg-zinc-900'>
          <div className='h-[100%] flex items-center justify-center flex-col'>
            <img src={emptycart} alt="Empty Cart" />
          </div>
        </div>
      )}
      {cart && cart.length > 0 && (
        <div className='bg-zinc-900'>
          <h1 className="text-3xl font-bold text-zinc-500 mb-8 text-center pt-3">Your Cart</h1>
          {cart.map((items, i) =>
            <div className='w-[95vw] my-4 rounded flex flex-col md:flex-row p-4 bg-zinc-800 justify-start items-center gap-8 m-4' key={i}>
              <img src={items.url} alt="/" className='h-[20vh] md:h-[10vh] object-cover' />
              <div className='w-full md:w-auto flex-1'>
                <h1 className='text-2xl text-zinc-100 font-semibold text-start mt-2 md:mt-0'>{items.title}</h1>
                <p className='text-normal text-zinc-300 mt-2 hidden lg:block'>{items.desc.slice(0, 100)}...</p>
                <p className='text-normal text-zinc-300 mt-2 md:block lg:hidden'>{items.desc.slice(0, 65)}...</p>
              </div>
              <div className='flex mt-4 w-full md:w-auto items-center justify-center'>
                <h2 className='text-zinc-100 text-3xl font-semibold flex'>₹ {items.price}</h2>
                <button className='bg-red-100 text-red-700 border border-red-700 rounded p-2 ms-12' onClick={() => deleteItem(items._id)}>
                  <TiDelete />
                </button>
              </div>
            </div>
          )}
        </div>
      )}
      {cart && cart.length > 0 && (
        <div className='w-full flex items-center justify-end bg-zinc-900'>
          <div className='p-8 bg-zinc-800 rounded mr-12'>
            <h1 className='text-3xl text-zinc-100 font-semibold'>Total Amount</h1>
            <div className='mt-3 flex items-center justify-between text-xl text-zinc-400'>
              <h2>{cart.length} books</h2>
              <h2>₹ {total}</h2>
            </div>
            <div className='w-[100%] mt-3'>
              <button className='bg-green-300 rounded px-4 py-2 flex justify-center w-full text-green-700 font-semibold hover:bg-green-400 border border-green-700' onClick={PlaceOrder}>
                Place Your Order
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
