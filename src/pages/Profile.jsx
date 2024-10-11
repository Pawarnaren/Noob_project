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
      const response = await axios.get("/api/v1/get-user-information", { headers });
      console.log(response.data);
      setProfile(response.data); // Log the response data for debugging
    };
    fetch();
  }, []);

  return (
    <div className='z-20 flex flex-col h-screen gap-4 px-2 py-8 text-white bg-zinc-900 md:px-12 md:flex-row'>
      {!Profile && <div className='flex items-center justify-center w-full'>
         <Loader />
        </div>}
      {Profile &&  <>
      <div className='w-full md:w-1/6 '>
        <Sidebar data={Profile} />
        <MobileNav />
      </div>
      <div className='h-screen md:w-5/6 sm:w-full'>
        <Outlet />
      </div>
     </>}
    </div>
  );
}

export default Profile;
