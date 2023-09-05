import React, { useEffect } from 'react';
import './Home.css';
import image1 from '../../Assets/image1.jpg';
import { GrLocation } from 'react-icons/gr';
import { HiFilter } from 'react-icons/hi';
import Aos from 'aos';
import 'aos/dist/aos.css';

const Home = () => {
  useEffect(() => {
    Aos.init({ duration: 2000 });
  }, []);

  return (
    <section className='home'>
      <div className='overlay'></div>
      <img src={image1} alt="Image description"  />
      <div className='homeContent container'>
        <div className='textDiv'>
          <span data-aos='fade-up' className='smallText'>
            Our Packages
          </span>
          <h1 data-aos='fade-up' className='homeTitle'>
            Search Your Holiday
          </h1>
       

        <div data-aos='fade-up' className='cardDiv grid'>
          <DestinationInput />
          <DateInput />
          <PriceInput />
          <MoreFilters />
        </div>
        </div>
      </div>
    </section>
  );
};

const DestinationInput = () => (
  <div className='destinationInput'>
    <label htmlFor='city'>Search Your Destination</label>
    <div className='input flex'>
      <input type='text' placeholder='Enter name here...' />
      <GrLocation className='icon' />
    </div>
  </div>
);

const DateInput = () => (
  <div className='dateInput'>
    <label htmlFor='date'>Select Your Date</label>
    <div className='input flex'>
      <input type='date' />
    </div>
  </div>
);

const PriceInput = () => (
  <div className='priceInput'>
    <div className='label_total flex'>
      <label htmlFor='price'>Max price:</label>
      <h3 className='total'>$5000</h3>
    </div>
    <div className='input flex'>
      {/* Corrected the max and min values */}
      <input type='range' min='0' max='5000' />
    </div>
  </div>
);


const MoreFilters = () => (
  <div className='searchOption flex'>
    <HiFilter className='icon' />
    <span>MORE FILTERS</span>
  </div>
);

export default Home;
