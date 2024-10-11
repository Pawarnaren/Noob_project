import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { authActions } from "../store/auth";

const Signin = () => {
  const [values, setValues] = useState({
    username: '',
    password: '',
  });

  const change = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const submit = async (e) => {
    e.preventDefault();
    try {
      if (values.username === '' || values.password === '') {
        alert('All fields are required');
      } else {
        console.log('Sending request to API with values:', values);
        const response = await axios.post('http://localhost:1090/api/v1/sign-in', values);
        console.log('Response from API:', response);

        if (response && response.data) {
          dispatch(authActions.login());
          dispatch(authActions.changeRole(response.data.role));
          localStorage.setItem("id", response.data.id);
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("role", response.data.role);
          navigate('/profile');
        } else {
          console.error('Invalid response structure:', response);
          alert('Invalid response from server');
        }
      }
    } catch (error) {
      console.error('Error during sign-in:', error);
      alert(error.response?.data?.message || 'An error occurred');
    }
  };

  return (
    <div className='flex items-center justify-center bg-zinc-900 h-[82vh]'>
      <div className='bg-zinc-800 m-6 text-zinc-800 p-8 md:w-[25vw] w-[50vw] shadow-xl rounded-xl'>
        <h2 className='text-center text-blue-500 text-xl font-bold'>SignIn</h2>
        <form onSubmit={submit}>
          <div>
            <input
              type='text'
              id='username'
              name='username'
              placeholder='Username'
              required
              className='p-3 bg-zinc-900 mt-4 w-full rounded text-white'
              value={values.username}
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
          <div className='flex items-center justify-center'>
            <button
              type='submit'
              className='bg-blue-500 text-white p-4 rounded-xl w-full mt-3 hover:shadow-md hover:bg-blue-700 transition-all duration-300'
            >
              SignIn
            </button>
          </div>
        </form>
        <p className='text-white text-sm mt-2 text-center'>
          New User?{' '}
          <Link to='/signup' className='hover:text-blue-500 hover:underline'>
            SignUp
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signin;
