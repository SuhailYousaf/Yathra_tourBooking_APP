import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

import * as api from "../api"


export const createTour = createAsyncThunk("tour/createTour", async ({ updatedTourData, navigate, toast }, { rejectWithValue }) => {
    try {
        const response = await api.createTour(updatedTourData)
        toast.success("Tour added  Successfully")
        navigate("/admin/products")
        return response.data
    } catch (err) {
        return rejectWithValue(err.response.data);
    }
})

export const getTours = createAsyncThunk("tour/getTours", async (_, { rejectWithValue }) => {
    try {
        const response = await api.getTours()  
        console.log("response.data"+response.data)
        return response.data
    } catch (err) {
        return rejectWithValue(err.response.data);
    }
})

export const getTour = createAsyncThunk(
    "tour/getTour",
    async (id, { rejectWithValue }) => {
      try {
        console.log("innergetTour")
        const response = await api.getTour(id);
        console.log("response"+response.data)
        return response.data;
      } catch (err) {
        return rejectWithValue(err.response.data);
      }
    }
  );


const tourSlice = createSlice({
    name: 'tour',
    initialState: {
        tour: {},
        tours: [],
        agentTours: [],
        error: "",
        loading: false,
    },
    extraReducers: {
        [createTour.pending]: (state, action) => {
            state.loading = true
        },
        [createTour.fulfilled]: (state, action) => {
            state.loading = false
            state.tours.push(action.payload);
        },
        [createTour.rejected]: (state, action) => {
            state.loading = false
            state.error = action.payload.message
        },
        [getTours.pending]: (state, action) => {
            state.loading = true
        },
        [getTours.fulfilled]: (state, action) => {
            state.loading = false
            state.tours=action.payload;
        },
        [getTours.rejected]: (state, action) => {
            state.loading = false
            state.error = action.payload.message
        },
        [getTour.pending]: (state, action) => {
            state.loading = true
        },
        [getTour.fulfilled]: (state, action) => {
            state.loading = false
            state.tour=action.payload;
        },
        [getTour.rejected]: (state, action) => {
            state.loading = false
            state.error = action.payload.message
        },
    },
})
export default tourSlice.reducer

