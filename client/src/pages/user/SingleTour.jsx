import React, { useEffect } from "react";
import './SingleTour.css';
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import moment from "moment";
import { getTour } from "../../redux/features/tourSlice";
// import RelatedTours from "../components/RelatedTours";
// import DisqusThread from "../components/DisqusThread";

const SingleTour = () => {
  const dispatch=useDispatch()
  const { tour } = useSelector((state) => ({ ...state.tour }));
  const { tours, loading } = useSelector((state) => ({ ...state.tour }));

  const { id } = useParams();
  

  // useEffect(() => {
  //   tags && dispatch(getRelatedTours(tags));
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [tags]);

  useEffect(() => {
    if (id) {
      dispatch(getTour(id));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return (
   
    <div className="Single" style={{ marginTop: '150px', overflowX: 'hidden' }}>
      <div className="details">
        <div className="big-img">
          <img src={tour.imageFile} alt="" />
        </div>

        <div className="box">
          <div className="row">
            <h2>{tour.title}</h2>
            <span>${tour.price}</span>
          </div>

          <h3>{tour.tags}</h3> 
          <p>{tour.description}</p>

          <button className="cart">Book Now</button>
        </div>
      </div>
  </div>

  )
}

export default SingleTour
