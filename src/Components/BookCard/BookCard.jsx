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
    const response= await axios.put("/api/v1/delete-book-from-favorite", {},{headers});
    alert(response.data.message);

  };
  return (
    <div className='flex flex-col p-4 rounded bg-zinc-100'>
    <Link to={`/view-book-details/${data._id}`}>
      <div className='flex p-4 rounded bg-zinc-100'>
        <div className='flex flex-col items-center justify-start w-full gap-2 p-4 rounded bg-zinc-200'>
          <div className='flex-shrink-0'>
            <img src={data.url} alt='book cover' className='h-[25vh] rounded' />
          </div>
          <div className='flex-grow '>
            <p className='font-semibold text-center text-m text-zinc-600' style={{ minHeight: '46px', fontSize:'14px' }}>{data.title}</p>
            <p className='text-sm text-center text-zinc-400'>{data.author}</p>
            <p className='text-center text-blue-500 text-m'>₹{data.price}</p>
          </div>

        
        </div>
       
      </div>
    </Link>
    {favorite && (
            <button className='px-4 py-2 text-red-500 transition-all duration-300 bg-red-100 border border-red-500 rounded-xl hover:bg-red-300' onClick={removeBook}>Remove From Favorites</button>
          )}
    </div>
  );
};

export default BookCard;
