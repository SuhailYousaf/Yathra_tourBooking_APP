import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"


import * as api from "../api"


export const usersignIn = createAsyncThunk("userr/login", async ({ formValue, navigate, toast }, { rejectWithValue }) => {
    try {
        const response = await api.usersignIn(formValue)
        toast.success("Login Successfully")
        navigate("/")
        return response.data
    } catch (err) {
        return rejectWithValue(err.response.data);
    }
})


export const userregister = createAsyncThunk("userr/register", async ({ formValue, navigate, toast }, { rejectWithValue }) => {
    try {
        const response = await api.userregister(formValue)
        toast.success("Register Successfully")
        navigate("/")
        return response.data
    } catch (err) {
        return rejectWithValue(err.response.data)
    }
})

export const getUsers = createAsyncThunk("userr/getUsers", async (_, { rejectWithValue }) => {
    try {
        const response = await api.getUsers()  

        return response.data
    } catch (err) {
        return rejectWithValue(err.response.data);
    }
})






const userrSlice = createSlice({
    name: "userr",
    initialState: {
        userr: {},
        users:[],
        error: "",
        loading: false,
    },



    reducers: {
        
        setUser: (state, action) => {
            state.user = action.payload
        },
        setLogout: (state, action) => {
            localStorage.clear();
            state.user = null  
            
        }
    },


    extraReducers: {
        [usersignIn.pending]: (state, action) => {
            state.loading = true
        },
        [usersignIn.fulfilled]: (state, action) => {
            state.loading = false
            localStorage.setItem("userprofile", JSON.stringify({ ...action.payload }))

            console.log(action.payload)

            state.user = action.payload

        },
        [usersignIn.rejected]: (state, action) => {
            state.loading = false
            state.error = action.payload.message
        },


        [userregister.pending]: (state, action) => {
            state.loading = true 
        },
        [userregister.fulfilled]: (state, action) => {
            state.loading = false
            localStorage.setItem("userprofile", JSON.stringify({ ...action.payload }))
            console.log('kkkkkkkkkkkkkkkkk')
            console.log(action.payload)
            console.log('xsc')
            state.user = action.payload

        },
        [userregister.rejected]: (state, action) => {
            state.loading = false
            state.error = action.payload.message
        },
        [getUsers.pending]: (state, action) => {
            state.loading = true
        },
        [getUsers.fulfilled]: (state, action) => {
            state.loading = false
            state.users=action.payload;
        },
        [getUsers.rejected]: (state, action) => {
            state.loading = false
            state.error = action.payload.message
        },

    }


})

export const { setUser, setLogout } = userrSlice.actions;

export default userrSlice.reducer;