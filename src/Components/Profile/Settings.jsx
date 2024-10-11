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
      const response=await axios.get('https://booknaren.onrender.com/api/v1/get-user-information', {headers});
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
  const response =await axios.put("https://booknaren.onrender.com/api/v1/update-address", value,{headers});
  alert(response.data.message);
 }
  return (
    <div>
     {!profileData && <Loader />}{" "}
     {profileData && (
      <div className='h-[100%] p-0 md:p-4 text-zinc-100'>
        <h1 className='mb-8 text-3xl font-semibold md:text-5xl text-zinc-500'>
          Settings
        </h1>
        <div className='flex gap-12'>
          <div className=''>
            <label htmlFor=""> Username</label>
            <p className='p-2 mt-2 font-semibold rounded bg-zinc-800'>{profileData.username}</p>
          </div>
          <div className=''>
            <label htmlFor="">Email</label>
            <p className='flex-1 p-2 mt-2 font-semibold rounded bg-zinc-800'>{profileData.email}</p>
            </div>
            </div>
            <div className='flex flex-col mt-4 '>
              <label htmlFor="">Address</label>
              <textarea name="address" id="" className='p-2 mt-2 font-semibold rounded bg-zinc-800' rows='5' value={value.address}onChange={change}></textarea>
           
            <div className='flex justify-end mt-4'>
              <button className='px-3 py-2 font-semibold transition-all duration-300 bg-yellow-200 rounded text-zinc-900 hover:bg-yellow-400' onClick={submitAddress}>
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
