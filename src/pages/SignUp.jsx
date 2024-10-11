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
        const response = await axios.post('http://localhost:1090/api/v1/sign-up', values);
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
        <h2 className='text-center text-blue-500 text-xl font-bold'>SignUp</h2>
        <form onSubmit={submit}>
          <div>
            <input
              type='text'
              id='username'
              name='username'
              placeholder='Username'
              required
              className='p-3 bg-zinc-900 mt-3 w-full rounded text-white'
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
              className='p-3 mt-3 w-full rounded bg-zinc-900 text-white'
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
              className='p-3 mt-3 w-full rounded bg-zinc-900 text-white'
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
              className='p-3 mt-3 rounded w-full bg-zinc-900 text-white'
              value={values.address}
              onChange={change}
            ></textarea>
          </div>
          <div className='flex items-center justify-center'>
            <button
              type='submit'
              className='bg-blue-500 text-white p-4 rounded-xl w-full mt-3 hover:shadow-md hover:bg-blue-700 transition:all duration-300'
            >
              SignUp
            </button>
          </div>
        </form>
        <p className='text-white text-sm mt-2 text-center'>
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
