import React, { useEffect, useState } from 'react'
import axios from "axios";
import BookCard from "../BookCard/BookCard";
const Favorites = () => {
  const [favoriteBooks, setFavoriteBooks]=useState([]);
  const headers={
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };
  useEffect(()=>{
    const fetch= async()=>{
      const response =await axios.get("http://localhost:1090/api/v1/get-favorite-books", {headers});
      setFavoriteBooks(response.data.data);
    }
    fetch();
  },[favoriteBooks]);
  return (
    <div className='grid grid-cols-4 gap-4'>
      {favoriteBooks.length===0 && <div className='text-zinc-800 text-5xl flex items-center justify-center w-[75vw] h-screen font-semibold'>No Favorites </div>}
      {
        favoriteBooks && favoriteBooks.map((items,i)=><div key={i}>
        <BookCard data={items} favorite={true}/>
        </div>)
      }
    </div>
  )
}

export default Favorites
