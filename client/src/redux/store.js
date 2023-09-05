import { configureStore } from "@reduxjs/toolkit";
import TourReducer from './features/tourSlice'
import UserrReducer from './features/userrSlice'
import AdminReducer from './features/adminSlice';


//add key
export default configureStore({
    reducer: {
        tour: TourReducer,
        userr: UserrReducer,
        admin: AdminReducer

    },
})