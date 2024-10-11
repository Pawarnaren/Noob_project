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
        const response = await axios.get("https://noob-project-backend.onrender.com/api/v1/get-user-cart", { headers });
        setCart(response.data.data);
      } catch (error) {
        console.error("Error fetching cart:", error);
      }
    };
    fetch();
  }, []);

  const deleteItem = async (bookid) => {
    try {
      const response = await axios.put("https://noob-project-backend.onrender.com/api/v1/delete-from-cart", {}, {
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
      const response = await axios.post("https://noob-project-backend.onrender.com/api/v1/place-order", { order: cart }, { headers });
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
          <h1 className="pt-3 mb-8 text-3xl font-bold text-center text-zinc-500">Your Cart</h1>
          {cart.map((items, i) =>
            <div className='w-[95vw] my-4 rounded flex flex-col md:flex-row p-4 bg-zinc-800 justify-start items-center gap-8 m-4' key={i}>
              <img src={items.url} alt="/" className='h-[20vh] md:h-[10vh] object-cover' />
              <div className='flex-1 w-full md:w-auto'>
                <h1 className='mt-2 text-2xl font-semibold text-zinc-100 text-start md:mt-0'>{items.title}</h1>
                <p className='hidden mt-2 text-normal text-zinc-300 lg:block'>{items.desc.slice(0, 100)}...</p>
                <p className='mt-2 text-normal text-zinc-300 md:block lg:hidden'>{items.desc.slice(0, 65)}...</p>
              </div>
              <div className='flex items-center justify-center w-full mt-4 md:w-auto'>
                <h2 className='flex text-3xl font-semibold text-zinc-100'>₹ {items.price}</h2>
                <button className='p-2 text-red-700 bg-red-100 border border-red-700 rounded ms-12' onClick={() => deleteItem(items._id)}>
                  <TiDelete />
                </button>
              </div>
            </div>
          )}
        </div>
      )}
      {cart && cart.length > 0 && (
        <div className='flex items-center justify-end w-full bg-zinc-900'>
          <div className='p-8 mr-12 rounded bg-zinc-800'>
            <h1 className='text-3xl font-semibold text-zinc-100'>Total Amount</h1>
            <div className='flex items-center justify-between mt-3 text-xl text-zinc-400'>
              <h2>{cart.length} books</h2>
              <h2>₹ {total}</h2>
            </div>
            <div className='w-[100%] mt-3'>
              <button className='flex justify-center w-full px-4 py-2 font-semibold text-green-700 bg-green-300 border border-green-700 rounded hover:bg-green-400' onClick={PlaceOrder}>
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
