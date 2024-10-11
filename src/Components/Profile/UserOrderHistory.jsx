import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Loader from '../Loader/Loader';
import noorders from '../images/noorders.jpg';
import { Link } from 'react-router-dom';

const UserOrderHistory = () => {
  const [orderHistory, setOrderHistory] = useState();
  const headers = {
    id: localStorage.getItem('id'),
    authorization: `Bearer ${localStorage.getItem('token')}`,
  };

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get('http://localhost:1090/api/v1/get-order-history', { headers });
        
        setOrderHistory(response.data.data);
      } catch (error) {
        console.error('Error fetching order history:', error);
      }
    };
    fetchOrders();
  }, []);

  return (
    <div>
      {!orderHistory && (
        <div className='flex items-center justify-center'>
          <Loader />
        </div>
      )}

      {orderHistory && orderHistory.length === 0 && (
        <div className='flex items-center h-[90vh] bg-zinc-900 justify-center'>
          <img src={noorders} alt='' className='bg-zinc-900' />
        </div>
      )}

      {orderHistory && orderHistory.length > 0 && (
        <div className='sm:w-full md:p-4 text-zinc-100'>
          <h1 className='text-3xl md:text-5xl font-semibold text-zinc-500 mb-8'>Your Order History</h1>
          <div className='mt-4 bg-zinc-800 w-full rounded overflow-x-auto'>
            <table className='min-w-full divide-y divide-zinc-700'>
              <thead className='bg-zinc-900'>
                <tr>
                  <th className='py-3 px-6 text-left text-zinc-100'>Sr.</th>
                  <th className='py-3 px-6 text-left text-zinc-100'>Books</th>
                  <th className='py-3 px-6 text-left text-zinc-100'>Description</th>
                  <th className='py-3 px-6 text-left text-zinc-100'>Price</th>
                  <th className='py-3 px-6 text-left text-zinc-100'>Status</th>
                  <th className='py-3 px-6 text-left text-zinc-100 hidden md:table-cell'>Mode</th>
                </tr>
              </thead>
              <tbody className='bg-zinc-800 divide-y divide-zinc-700'>
                {orderHistory.map((item, index) => (
                  <tr key={index} className='hover:bg-zinc-900 hover:cursor-pointer'>
                    <td className='py-4 px-6'>{index + 1}</td>
                    <td className='py-4 px-6'>
                      <Link to={`/view-book-details/${item.book._id}`} className='hover:text-blue-300'>
                        {item.book.title}
                      </Link>
                    </td>
                    <td className='py-4 px-6'>{item.book.desc.slice(0, 50)}...</td>
                    <td className='py-4 px-6'>₹{item.book.price}</td>
                    <td className='py-4 px-6 font-semibold'>
                      {item.status === 'Order Placed' ? (
                        <span className='text-yellow-500'>{item.status}</span>
                      ) : item.status === 'Cancelled' ? (
                        <span className='text-red-500'>{item.status}</span>
                      ) : (
                        <span>{item.status}</span>
                      )}
                    </td>
                    <td className='py-4 px-6 hidden md:table-cell'>
                      <span className='text-sm text-zinc-400'>COD</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserOrderHistory;
