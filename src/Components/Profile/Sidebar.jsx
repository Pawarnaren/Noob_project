import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FaArrowRightFromBracket } from "react-icons/fa6";
import { useDispatch, useSelector } from 'react-redux';
import {authActions} from '../../store/auth'

const Sidebar = ({data}) => {
  const dispatch=useDispatch();
  const history=useNavigate();
  const role=useSelector((state)=>state.auth.role);
  return (
    <div className='bg-zinc-800 p-4 rounded flex flex-col items-center justify-between h-auto lg:h-[100%]'>
      <div className='flex flex-col items-center justify-center p-4 rounded bg-zinc-800'> 
      <img src="../images/download.png" alt="hello"  className='h-[10vh] '/>
      <p className='mt-1 text-xl font-semibold text-zinc-100'>{data.username}</p>
      
      <p className='mt-1 text-normal text-zinc-300'>{data.email}</p>
      <div className='w-full mt-4 h-[1px] bg-zinc-500 hidden lg:block'></div>
      </div>
      {role==='user' && (<div className='flex flex-col items-center justify-center hidden w-full lg:flex '>
      <Link to="/profile" className='w-full py-2 mt-2 font-semibold text-center transition-all rounded text-zinc-100 hover:bg-zinc-900'> Favorites</Link>
      <Link to="/profile/orderHistory" className='w-full py-2 mt-4 font-semibold text-center transition-all rounded text-zinc-100 hover:bg-zinc-900'> Order History</Link>
      <Link to="/profile/settings" className='w-full py-2 mt-4 font-semibold text-center transition-all rounded text-zinc-100 hover:bg-zinc-900'> Settings</Link>
      </div>)}
      {role==='admin' &&(<div className='flex flex-col items-center justify-center hidden w-full lg:flex '>
      <Link to="/profile" className='w-full py-2 mt-2 font-semibold text-center transition-all rounded text-zinc-100 hover:bg-zinc-900'> All Orders</Link>
      <Link to="/profile/addbook" className='w-full py-2 mt-4 font-semibold text-center transition-all rounded text-zinc-100 hover:bg-zinc-900'> Add Book</Link>
      
      </div>)}
      <button className="flex items-center justify-center w-3/6 p-2 mt-4 font-semibold text-white transition-all duration-300 bg-blue-500 rounded-l lg:w-full lg:mt-0 hover:bg-blue-800" onClick={()=>{
        dispatch(authActions.logout());
        dispatch(authActions.changeRole('user'));
        localStorage.clear('id');
        localStorage.clear('token');
        localStorage.clear('role');
        history('/');
      }}>Log Out <FaArrowRightFromBracket className='ms-4'/>
      </button>
    </div>
  )
}

export default Sidebar
