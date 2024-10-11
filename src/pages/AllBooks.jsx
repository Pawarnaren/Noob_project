import React from 'react'
import BookCard from '../Components/BookCard/BookCard'
import Loader from '../Components/Loader/Loader'
import axios from "axios";
import { useState, useEffect } from 'react';
const AllBooks = () => {
  const [Data, setData] =useState();
  useEffect(()=>{
    const fetch =async()=>{
      const response=await axios.get("http://localhost:1090/api/v1/get-all-books");
      setData(response.data.data);
      
    };
    fetch();
  }, []);
  return (
    <div className='bg-zinc-900 px-4'>
      <h4 className=' text-4xl mt-4 text-blue-500 font-bold text-center'>
        BookShelf
      </h4>
      {!Data && (
        <div className='flex items-center justify-center my-8'> 
        <Loader />{" "}
        </div>
      )}
      <div className='my-8 grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-8 '>
        {
          Data &&
          Data.map((items,i )=>(
            <div key={i} >
              <BookCard data={items} />{" "}
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default AllBooks;
