import React from 'react';
import logo from "../images/logo.png";
import { Link } from 'react-router-dom';
import {FaGripLines} from "react-icons/fa"
import { useState } from 'react';
import {useSelector} from 'react-redux'
const Navbar = () => {
  const links = [
    {
      title: "Home",
      link: "/",
    },
    
    {
      title: "All Books",
      link: "/all-books",
    },
    {
      title: "Cart",
      link: "/cart",
    },
    {
      title: "Profile",
      link: "/profile",
    },
    {
      title: "Admin Profile",
      link: "/profile",
    },
    
  ];
  const isLoggedIn=useSelector((state)=>
    state.auth.isLoggedIn);
  const role=useSelector((state)=>
    state.auth.role);
  if(isLoggedIn===false)
  {
    links.splice(2,3);
  }
  if(isLoggedIn===true && role==='user')
  {
    links.splice(4,1);
  }
  if(isLoggedIn===true && role==='admin')
    {
      links.splice(3,1);
    }
  // console.log(isLoggedIn);
  const [MobileNav, setMobileNav]=useState("hidden");
  return (
    <>
    <nav className=' z-50 relative bg-zinc-800 text-white px-4 lg:px-8 py-2 flex items-center justify-between'>
      {/* Left section with logo and brand name */}
      <div className='flex items-center space-x-3'>
        <img src={logo} alt="logo" className='w-12 h-12' />
        <h1 className='text-lg lg:text-xl font-bold text-blue-500'>BookVerse</h1>
      </div>

      {/* Right section with navigation links and buttons */}
      <div className='flex gap-3 items-center justify-center'>
      <div className='hidden md:block items-center space-x-4'>
        {/* Navigation Links */}
        {links.map((item, i) => (
          <Link to={item.link} key={i} className='font-sans hover:text-blue-500 transition-all duration-300'>{item.title}</Link>
        ))}
       </div>
        {/* Sign In and Sign Up Buttons */}
        <div className='md:flex hidden  space-x-4'>
         {isLoggedIn===false && (<>
          <Link to='/signin' className='px-4 py-2 border border-blue-500 rounded hover:bg-white hover:text-blue-500 transition-all duration-300'>Sign In</Link>
          <Link to='signup' className='px-4 py-2 bg-blue-500 text-white hover:bg-white hover:text-zinc-800 transition-all dura tion-300 rounded'>Sign Up</Link>
         </>)}
        </div>
        <button className='md:hidden sm:block text-white text-2 xl' onClick={()=>(MobileNav==="hidden"? setMobileNav("block"):setMobileNav("hidden"))}><FaGripLines/></button>
      </div>
      

      
    </nav>
    <div className={`${MobileNav} bg-zinc-800 h-screen absolute top-0 left-0 w-full z-40 flex flex-col items-center justify-center`}>
    {links.map((item, i) => (
          <Link to={item.link} key={i} className='font-sans text-white text-4xl font-semibold hover:text-blue-500 transition-all duration-300 mb-8' onClick={()=>(MobileNav==="hidden"? setMobileNav("block"):setMobileNav("hidden"))}>{item.title}</Link>
        ))}
        {isLoggedIn===false &&(
          <>
          <Link to='/signin'  className='px-4 py-2 border border-blue-500 border-4 font-semibold rounded-xl text-white hover:bg-white text-4xl hover:text-blue-500 mb-8 transition-all duration-300' onClick={()=>(MobileNav==="hidden"? setMobileNav("block"):setMobileNav("hidden"))}>Sign In</Link>
          <Link to='signup' className='px-4 py-2 bg-blue-500 text-4xl text-white font-semibold hover:bg-white hover:text-zinc-800 transition-all duration-300 rounded-xl mb-8' onClick={()=>(MobileNav==="hidden"? setMobileNav("block"):setMobileNav("hidden"))}>Sign Up</Link>
          </>
        )}
    </div>
    </>
  );
}

export default Navbar;
