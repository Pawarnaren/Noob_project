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
        const response = await axios.get('https://noob-project-backend.onrender.com/api/v1/get-order-history', { headers });
        
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
          <h1 className='mb-8 text-3xl font-semibold md:text-5xl text-zinc-500'>Your Order History</h1>
          <div className='w-full mt-4 overflow-x-auto rounded bg-zinc-800'>
            <table className='min-w-full divide-y divide-zinc-700'>
              <thead className='bg-zinc-900'>
                <tr>
                  <th className='px-6 py-3 text-left text-zinc-100'>Sr.</th>
                  <th className='px-6 py-3 text-left text-zinc-100'>Books</th>
                  <th className='px-6 py-3 text-left text-zinc-100'>Description</th>
                  <th className='px-6 py-3 text-left text-zinc-100'>Price</th>
                  <th className='px-6 py-3 text-left text-zinc-100'>Status</th>
                  <th className='hidden px-6 py-3 text-left text-zinc-100 md:table-cell'>Mode</th>
                </tr>
              </thead>
              <tbody className='divide-y bg-zinc-800 divide-zinc-700'>
                {orderHistory.map((item, index) => (
                  <tr key={index} className='hover:bg-zinc-900 hover:cursor-pointer'>
                    <td className='px-6 py-4'>{index + 1}</td>
                    <td className='px-6 py-4'>
                      <Link to={`/view-book-details/${item.book._id}`} className='hover:text-blue-300'>
                        {item.book.title}
                      </Link>
                    </td>
                    <td className='px-6 py-4'>{item.book.desc.slice(0, 50)}...</td>
                    <td className='px-6 py-4'>₹{item.book.price}</td>
                    <td className='px-6 py-4 font-semibold'>
                      {item.status === 'Order Placed' ? (
                        <span className='text-yellow-500'>{item.status}</span>
                      ) : item.status === 'Cancelled' ? (
                        <span className='text-red-500'>{item.status}</span>
                      ) : (
                        <span>{item.status}</span>
                      )}
                    </td>
                    <td className='hidden px-6 py-4 md:table-cell'>
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
