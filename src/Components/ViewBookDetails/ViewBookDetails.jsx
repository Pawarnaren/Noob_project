import React ,{useEffect, useState} from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Loader from '../Loader/Loader';
import {GrLanguage} from 'react-icons/gr';
import { FaHeart } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";
import { useSelector } from 'react-redux';
import { FaEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import { Link } from 'react-router-dom';


const ViewBookDetails = () => {
    const isLoggedIn=useSelector((state)=>state.auth.isLoggedIn);
    const role=useSelector((state)=>state.auth.role);
    const {id}= useParams();
    // console.log(id);
    const [Data, setData]=useState();
    const navigate=useNavigate();
    useEffect(()=>{
        const fetch=async()=>{
            const response= await axios.get(`https://noob-project-backend.onrender.com/api/v1/get-book-by-id/${id}`);
            // console.log(response);
            setData(response.data.data);
        };
        fetch();
    },[]);
    const headers= {
      id: localStorage.getItem("id"),
      authorization: `Bearer ${localStorage.getItem("token")}`,
      bookid: id
    };
    const setFavorite= async()=>{
      const response =await axios.put("https://noob-project-backend.onrender.com/api/v1/add-book-to-favorite",{},{headers});

      alert(response.data.message);
    }

    const handleCart=async()=>{
      const response=await axios.put("https://noob-project-backend.onrender.com/api/v1/add-book-to-cart", {}, {headers});

      alert(response.data.message);
    }
    const delete_book=async()=>{
      const response =await axios.delete("https://noob-project-backend.onrender.com/api/v1/delete-book",{headers});
      alert(response.data.message);
      navigate('/all-books');
    }
    
  return (
   < >
   {Data && (
     <div className='flex flex-col items-center justify-center gap-8 px-4 py-8 md:px-12 bg-zinc-900 md:flex-row'>
     <div className='bg-zinc-800 rounded p-4 h-[60vh] md:h-[84vh] w-3/6 flex flex-col p-3 gap-6 items-center justify-center'>
     {" "}
     <div className='flex flex-col items-center justify-center gap-4'>
      {" "}
     <img src={Data.url} alt="" className=' h-[50vh] md:h-[70vh] rounded' />
     {isLoggedIn===true && role==="user" &&(
      <div className='flex gap-3'>
      <button className='p-3 text-xl text-red-500 bg-white rounded-full' onClick={setFavorite}>
        <FaHeart/>
        </button><button className='p-3 text-xl text-blue-500 bg-white rounded-full'onClick={handleCart} >
          <FaCartShopping />
        </button>
     </div>
     )}
     {isLoggedIn===true && role==="admin" &&(
      <div className='flex gap-3'>
      <Link className='p-3 text-xl text-red-500 bg-white rounded-full' to={`/updatebook/${id}`}>
        <FaEdit/>
        </Link><button className='p-3 text-xl text-blue-500 bg-white rounded-full' onClick={delete_book}>
          <MdDeleteOutline />
        </button>
     </div>
     )}
     </div>
     </div>
     <div className='w-full p-4 lg:w-3/6'>
     <h1 className='text-4xl font-semibold text-zinc-200'>{Data.title}</h1>
     <p className='text-2xl text-right text-zinc-400'>{Data.author}</p>
     <p className='mt-5 text-xl text-zinc-400'>{Data.desc}</p>
     <p className='flex items-center justify-end text-zinc-400'>
       <GrLanguage className='me-2' />
       {Data.language}</p>
     <p className='mt-10 text-3xl text-blue-500'>₹{Data.price}{" "}</p>
     </div>
   </div>
   )}
   {!Data && <div className='flex items-center justify-center h-screen bg-zinc-900'> <Loader/></div>}
   </>
  )
}

export default ViewBookDetails
