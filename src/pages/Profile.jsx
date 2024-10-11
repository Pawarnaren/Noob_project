import React, { useEffect, useState } from 'react';
import Sidebar from '../Components/Profile/Sidebar';
import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';
import Loader from "../Components/Loader/Loader"
import MobileNav from '../Components/Profile/MobileNab';
const Profile = () => {
  
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
  const [Profile, setProfile]=useState();
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get("http://localhost:1090/api/v1/get-user-information", { headers });
      console.log(response.data);
      setProfile(response.data); // Log the response data for debugging
    };
    fetch();
  }, []);

  return (
    <div className='bg-zinc-900 px-2 md:px-12 flex flex-col md:flex-row h-screen py-8 gap-4 h-screen z-20 text-white'>
      {!Profile && <div className='w-full  flex items-center justify-center'>
         <Loader />
        </div>}
      {Profile &&  <>
      <div className='md:w-1/6  w-full '>
        <Sidebar data={Profile} />
        <MobileNav />
      </div>
      <div className='md:w-5/6 sm:w-full h-screen'>
        <Outlet />
      </div>
     </>}
    </div>
  );
}

export default Profile;
