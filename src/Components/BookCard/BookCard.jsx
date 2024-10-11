import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
const BookCard = ({ data, favorite }) => {
  const headers={
    id: localStorage.getItem("id"),
    authorization:`Bearer ${localStorage.getItem("token")}`,
    bookid: data._id
  };
  const removeBook=async()=>{
    const response= await axios.put("http://localhost:1090/api/v1/delete-book-from-favorite", {},{headers});
    alert(response.data.message);

  };
  return (
    <div className='rounded p-4 bg-zinc-100   flex flex-col'>
    <Link to={`/view-book-details/${data._id}`}>
      <div className='rounded p-4 bg-zinc-100   flex'>
        <div className='rounded bg-zinc-200 flex flex-col items-center justify-start p-4 gap-2 w-full'>
          <div className='flex-shrink-0'>
            <img src={data.url} alt='book cover' className='h-[25vh] rounded' />
          </div>
          <div className='flex-grow '>
            <p className='text-m text-center   text-zinc-600 font-semibold' style={{ minHeight: '46px', fontSize:'14px' }}>{data.title}</p>
            <p className='text-sm text-center text-zinc-400'>{data.author}</p>
            <p className='text-m text-center text-blue-500'>₹{data.price}</p>
          </div>

        
        </div>
       
      </div>
    </Link>
    {favorite && (
            <button className='bg-red-100  px-4 py-2 rounded-xl border border-red-500 text-red-500 hover:bg-red-300 transition-all duration-300' onClick={removeBook}>Remove From Favorites</button>
          )}
    </div>
  );
};

export default BookCard;
