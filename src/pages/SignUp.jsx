import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Signup = () => {
  const [values, setValues] = useState({
    username: '',
    email: '',
    password: '',
    address: '',
  });

  const change = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      if (
        values.username === '' ||
        values.email === '' ||
        values.password === '' ||
        values.address === ''
      ) {
        alert('All fields are required');
      } else {
        const response = await axios.post('https://booknaren.onrender.com/api/v1/sign-up', values);
        alert(response.data.message);
        navigate('/signin');
      }
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  return (
    <div className='flex items-center justify-center bg-zinc-900 h-[82vh]'>
      <div className='bg-zinc-800 m-6 text-zinc-800 p-8 md:w-[25vw] w-[50vw] shadow-xl rounded-xl'>
        <h2 className='text-xl font-bold text-center text-blue-500'>SignUp</h2>
        <form onSubmit={submit}>
          <div>
            <input
              type='text'
              id='username'
              name='username'
              placeholder='Username'
              required
              className='w-full p-3 mt-3 text-white rounded bg-zinc-900'
              value={values.username}
              onChange={change}
            />
          </div>
          <div>
            <input
              type='email'
              id='email'
              name='email'
              placeholder='Email'
              className='w-full p-3 mt-3 text-white rounded bg-zinc-900'
              required
              value={values.email}
              onChange={change}
            />
          </div>
          <div>
            <input
              type='password'
              id='password'
              name='password'
              className='w-full p-3 mt-3 text-white rounded bg-zinc-900'
              placeholder='Password'
              required
              value={values.password}
              onChange={change}
            />
          </div>
          <div>
            <textarea
              name='address'
              id='address'
              rows='3'
              placeholder='Address'
              className='w-full p-3 mt-3 text-white rounded bg-zinc-900'
              value={values.address}
              onChange={change}
            ></textarea>
          </div>
          <div className='flex items-center justify-center'>
            <button
              type='submit'
              className='w-full p-4 mt-3 text-white duration-300 bg-blue-500 rounded-xl hover:shadow-md hover:bg-blue-700 transition:all'
            >
              SignUp
            </button>
          </div>
        </form>
        <p className='mt-2 text-sm text-center text-white'>
          Already have an account?{' '}
          <Link to='/signin' className='hover:text-blue-500 hover:underline'>
            SignIn
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
