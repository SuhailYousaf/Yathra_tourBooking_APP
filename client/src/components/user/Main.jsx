import React, { useEffect } from 'react';
import './Main.css'
import { MDBCol, MDBContainer, MDBRow, MDBTypography } from 'mdb-react-ui-kit';
import { useDispatch, useSelector } from 'react-redux';
import Aos from 'aos';
import 'aos/dist/aos.css';
import UserCard from '../../components/user/UserCard';
import { getTours } from '../../redux/features/tourSlice';

const Main = () => {
  const { tours, loading } = useSelector((state) => ({ ...state.tour }));
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTours());
  }, []);

  useEffect(() => {
    Aos.init({ duration: 2000 });
  }, []);

  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (
    <section data-aos='fade-up' className='main container section'>
      <div className='secTitle'>
        <h3 className='title'>
          Most Visited Destinations
        </h3>
      </div>
      <div data-aos='fade-up'
        // style={{
        //   margin: 'auto',
        //   padding: '30px',
        //   maxWidth: '1000px',
        //   textAlign: 'center',
          
        // }}
      >
        <MDBRow   className='mt-5'>
          {tours.length === 0 && (
            <MDBTypography className='text-center mb-0' tag='h2'>
              No Tours Found
            </MDBTypography>
          )}
          <MDBCol>
            <MDBContainer>
            <MDBRow className='row-cols-1 row-cols-md-3 g-4'> {/* Increased spacing using g-4 */}
            {tours.map((item, index) => (
              <UserCard key={index} {...item} />
            ))}
          </MDBRow>
          
            </MDBContainer>
          </MDBCol>
        </MDBRow>
      </div>
    </section>
  );
}

export default Main;
