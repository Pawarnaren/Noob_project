import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Loader from '../Loader/Loader';
const Settings = () => {
  const headers={
    id: localStorage.getItem("id"),
    authorization:`Bearer ${localStorage.getItem('token')}`
  };
 const[value,setValue] =useState({address:" "});
 const[profileData, setProfileData]=useState();
  useEffect(()=>{
    const fetch= async ()=>{
      const response=await axios.get('http://localhost:1090/api/v1/get-user-information', {headers});
      setProfileData(response.data);
      setValue({address: response.data.address});
    };
    fetch();
  },[]);
 const change=(e)=>{
const {name, value}=e.target;
setValue({...value, [name]: value});
 };

 const submitAddress=async()=>{
  const response =await axios.put("http://localhost:1090/api/v1/update-address", value,{headers});
  alert(response.data.message);
 }
  return (
    <div>
     {!profileData && <Loader />}{" "}
     {profileData && (
      <div className='h-[100%] p-0 md:p-4 text-zinc-100'>
        <h1 className='text-3xl md:text-5xl font-semibold text-zinc-500 mb-8'>
          Settings
        </h1>
        <div className='flex gap-12'>
          <div className=''>
            <label htmlFor=""> Username</label>
            <p className='p-2 rounded bg-zinc-800 mt-2 font-semibold'>{profileData.username}</p>
          </div>
          <div className=''>
            <label htmlFor="">Email</label>
            <p className='p-2 rounded bg-zinc-800 mt-2 font-semibold  flex-1'>{profileData.email}</p>
            </div>
            </div>
            <div className='mt-4 flex flex-col '>
              <label htmlFor="">Address</label>
              <textarea name="address" id="" className='p-2 rounded bg-zinc-800 mt-2 font-semibold' rows='5' value={value.address}onChange={change}></textarea>
           
            <div className='mt-4 flex justify-end'>
              <button className='bg-yellow-200 text-zinc-900 font-semibold px-3 py-2 rounded hover:bg-yellow-400 transition-all duration-300' onClick={submitAddress}>
                Update
              </button>
            </div>
            </div>
            </div>
        
     )}
    </div>
  )
}

export default Settings
