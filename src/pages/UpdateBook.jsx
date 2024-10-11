import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {  useNavigate, useParams } from 'react-router-dom';

const UpdateBook = () => {
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
    bookid:id
  };
  const [Data, setData] = useState({
    url: "",
    title: "",
    author: "",
    price: "",
    desc: "",
    language: "",
  });
  const {id}=useParams();
  

  const change = (e) => {
    const { name, value } = e.target;
    setData({ ...Data, [name]: value });
  };
  const navigate=useNavigate();
  const submit = async () => {
    let response; // Initialize response at the start
    try {
      if (
        Data.url === '' ||
        Data.title === '' ||
        Data.author === '' ||
        Data.price === '' ||
        Data.desc === '' ||
        Data.language === ''
      ) {
        alert('All fields are required');
      } else {
        response = await axios.put('https://booknaren.onrender.com/api/v1/update-book', Data, { headers });
        setData({
          url: "",
          title: "",
          author: "",
          price: "",
          desc: "",
          language: "",
        });
        alert(response.data.message);
        navigate('/view-book-details');
      }
    } catch (error) {
      console.log(error.response ? error.response.data.message : error.message);
    }
  };
 useEffect(()=>{
   const fetch= async()=>{
   const response =await axios.get(`https://booknaren.onrender.com/api/v1/get-bbok-by-id/${id}`);
   set
   }
 });
  return (
    <div className='p-0 mb-24 md:p-4'>
      <h1 className='mb-8 text-2xl font-semibold md:text-4xl text-zinc-500'>
        UPDATE BOOK
      </h1>
      <div className='p-4 rounded bg-zinc-800'>
        <div>
          <label htmlFor="" className='text-zinc-400'>
            Image
          </label>
          <input
            type='text'
            className='w-full p-2 mt-2 outline-none bg-zinc-900 text-zinc-100'
            placeholder='Image'
            name='url'
            required
            value={Data.url}
            onChange={change}
          />
        </div>
        <div className='mt-4'>
          <label htmlFor="" className='text-zinc-400'>
            Title
          </label>
          <input
            type='text'
            className='w-full p-2 mt-2 outline-none bg-zinc-900 text-zinc-100'
            placeholder='Title'
            name='title'
            required
            value={Data.title}
            onChange={change}
          />
        </div>
        <div className='mt-4'>
          <label htmlFor="" className='text-zinc-400'>
            Author
          </label>
          <input
            type='text'
            className='w-full p-2 mt-2 outline-none bg-zinc-900 text-zinc-100'
            placeholder='Author'
            name='author'
            required
            value={Data.author}
            onChange={change}
          />
        </div>
        <div className='flex items-center justify-between mt-4'>
          <div className='w-[48%]'>
            <label htmlFor="" className='text-zinc-400'>
              Language
            </label>
            <input
              type='text'
              className='w-full p-2 mt-2 outline-none bg-zinc-900 text-zinc-100'
              placeholder='Language'
              name='language'
              required
              value={Data.language}
              onChange={change}
            />
          </div>
          <div className='w-[48%]'>
            <label htmlFor="" className='text-zinc-400'>
              Price
            </label>
            <input
              type='number'
              className='w-full p-2 mt-2 outline-none bg-zinc-900 text-zinc-100'
              placeholder='Price'
              name='price'
              required
              value={Data.price}
              onChange={change}
            />
          </div>
        </div>
        <div className='mt-4'>
          <label htmlFor="" className='text-zinc-400'>
            Description
          </label>
          <textarea
            type='text'
            className='w-full p-2 mt-2 outline-none bg-zinc-900 text-zinc-100'
            placeholder='Description'
            name='desc'
            required
            value={Data.desc}
            onChange={change}
            rows='5'
          />
        </div>
        <button className='px-3 py-2 mt-4 font-semibold text-white transition-all duration-300 bg-blue-500 rounded hover:bg-blue-600' onClick={submit}>Submit</button>
      </div>
    </div>
  );
}

export default UpdateBook;
