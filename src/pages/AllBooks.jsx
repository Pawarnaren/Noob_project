import React from 'react'
import BookCard from '../Components/BookCard/BookCard'
import Loader from '../Components/Loader/Loader'
import axios from "axios";
import { useState, useEffect } from 'react';
const AllBooks = () => {
  const [Data, setData] =useState();
  useEffect(()=>{
    const fetch =async()=>{
      const response=await axios.get("/api/v1/get-all-books");
      setData(response.data.data);
      
    };
    fetch();
  }, []);
  return (
    <div className='px-4 bg-zinc-900'>
      <h4 className='mt-4 text-4xl font-bold text-center text-blue-500 '>
        BookShelf
      </h4>
      {!Data && (
        <div className='flex items-center justify-center my-8'> 
        <Loader />{" "}
        </div>
      )}
      <div className='grid grid-cols-1 gap-8 my-8 sm:grid-cols-3 md:grid-cols-4 '>
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
