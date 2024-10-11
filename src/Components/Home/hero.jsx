import React from 'react';
import { Link } from 'react-router-dom';
const Hero = () => {
  return (
    <div className='h-screen lg:h-screen flex flex-col lg:flex-row items-center justify-center text-center lg:text-left text-custom'>
      {/* Left Column */}
      <div className='lg:w-3/6 flex flex-col justify-center items-center lg:items-start px-4 lg:px-8 pt-16 lg:pt-32 pb-8 lg:pb-4'>
        <h1 className='text-4xl lg:text-6xl mb-4 px-4 lg:px-0'>Explore Worlds Between the Pages</h1>
        <p className='mb-4 px-4 lg:px-0'>
          Step into a haven of literature and imagination. Explore a curated collection that celebrates the joy of reading.
        </p>
        <Link to='/all-books' className='text-xl lg:text-3xl px-6 lg:px-8 py-3 mt-4 border border-white rounded-full w-auto hover:bg-custom hover:text-zinc-800 transition-all duration-300'>
          Explore More
        </Link>
      </div>
      
      {/* Right Column (Placeholder for Image or Additional Content) */}
      <div className='hidden lg:block lg:w-3/6'></div>
    </div>
  );
}

export default Hero;
