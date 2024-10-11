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
        response = await axios.put('http://localhost:1090/api/v1/update-book', Data, { headers });
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
   const response =await axios.get(`http://localhost:1090/api/v1/get-bbok-by-id/${id}`);
   set
   }
 });
  return (
    <div className='p-0 md:p-4 mb-24'>
      <h1 className='text-2xl md:text-4xl font-semibold text-zinc-500 mb-8'>
        UPDATE BOOK
      </h1>
      <div className='p-4 bg-zinc-800 rounded'>
        <div>
          <label htmlFor="" className='text-zinc-400'>
            Image
          </label>
          <input
            type='text'
            className='w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none'
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
            className='w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none'
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
            className='w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none'
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
              className='w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none'
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
              className='w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none'
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
            className='w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none'
            placeholder='Description'
            name='desc'
            required
            value={Data.desc}
            onChange={change}
            rows='5'
          />
        </div>
        <button className='mt-4 px-3 bg-blue-500 rounded py-2 font-semibold text-white hover:bg-blue-600 transition-all duration-300' onClick={submit}>Submit</button>
      </div>
    </div>
  );
}

export default UpdateBook;
