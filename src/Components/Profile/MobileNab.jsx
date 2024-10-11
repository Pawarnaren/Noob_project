import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux';
import { authActions } from '../../store/auth';
const MobileNab = () => {
  const role=useSelector((state)=>state.auth.role);
  return (
    <>
    {role==='user' && (<div className='w-full flex items-center justify-between mt-4 lg:hidden'>
      <Link to="/profile" className='text-zinc-100 font-semibold w-full py-2 text-center hover:bg-zinc-900 rounded mt-2
     transition-all'> Favorites</Link>
     <Link to="/profile/orderHistory" className='text-zinc-100 font-semibold w-full py-2 text-center hover:bg-zinc-900 rounded mt-4 transition-all'> Order History</Link>
     <Link to="/profile/settings" className='text-zinc-100 font-semibold w-full py-2 text-center hover:bg-zinc-900 rounded mt-4 transition-all'> Settings</Link>

   </div>)}
   {role==='admin' && (<div className='w-full flex items-center justify-between mt-4 lg:hidden'>
      <Link to="/profile" className='text-zinc-100 font-semibold w-full py-2 text-center hover:bg-zinc-900 rounded mt-2
     transition-all'> All Orders</Link>
     <Link to="/profile/addbook" className='text-zinc-100 font-semibold w-full py-2 text-center hover:bg-zinc-900 rounded mt-4 transition-all'> Add Book</Link>
    

   </div>)}
   </>
  )
}

export default MobileNab
