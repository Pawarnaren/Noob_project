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
            const response= await axios.get(`http://localhost:1090/api/v1/get-book-by-id/${id}`);
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
      const response =await axios.put("http://localhost:1090/api/v1/add-book-to-favorite",{},{headers});

      alert(response.data.message);
    }

    const handleCart=async()=>{
      const response=await axios.put("http://localhost:1090/api/v1/add-book-to-cart", {}, {headers});

      alert(response.data.message);
    }
    const delete_book=async()=>{
      const response =await axios.delete("http://localhost:1090/api/v1/delete-book",{headers});
      alert(response.data.message);
      navigate('/all-books');
    }
    
  return (
   < >
   {Data && (
     <div className=' px-4 md:px-12 py-8 bg-zinc-900 flex flex-col justify-center items-center md:flex-row gap-8'>
     <div className='bg-zinc-800 rounded p-4 h-[60vh] md:h-[84vh] w-3/6 flex flex-col p-3 gap-6 items-center justify-center'>
     {" "}
     <div className='flex flex-col justify-center gap-4 items-center'>
      {" "}
     <img src={Data.url} alt="" className=' h-[50vh] md:h-[70vh] rounded' />
     {isLoggedIn===true && role==="user" &&(
      <div className='flex gap-3'>
      <button className='bg-white rounded-full p-3 text-xl text-red-500' onClick={setFavorite}>
        <FaHeart/>
        </button><button className='bg-white rounded-full p-3 text-xl text-blue-500'onClick={handleCart} >
          <FaCartShopping />
        </button>
     </div>
     )}
     {isLoggedIn===true && role==="admin" &&(
      <div className='flex gap-3'>
      <Link className='bg-white rounded-full p-3 text-xl text-red-500' to={`/updatebook/${id}`}>
        <FaEdit/>
        </Link><button className='bg-white rounded-full p-3 text-xl text-blue-500' onClick={delete_book}>
          <MdDeleteOutline />
        </button>
     </div>
     )}
     </div>
     </div>
     <div className='p-4 w-full lg:w-3/6'>
     <h1 className='text-4xl text-zinc-200 font-semibold'>{Data.title}</h1>
     <p className='text-zinc-400 text-right text-2xl'>{Data.author}</p>
     <p className='text-zinc-400 mt-5 text-xl'>{Data.desc}</p>
     <p className='text-zinc-400 flex items-center justify-end'>
       <GrLanguage className='me-2' />
       {Data.language}</p>
     <p className='text-blue-500 mt-10 text-3xl'>₹{Data.price}{" "}</p>
     </div>
   </div>
   )}
   {!Data && <div className='h-screen bg-zinc-900 flex items-center justify-center'> <Loader/></div>}
   </>
  )
}

export default ViewBookDetails
