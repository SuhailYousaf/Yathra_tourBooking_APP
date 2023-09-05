import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import * as api from "../api"


export const adminlogin = createAsyncThunk(
  "admin/login",
  async ({ formValue, navigate, toast }, { rejectWithValue }) => {
    try {
      const response = await api.adminlogin(formValue)
      toast.success("Login Successfully")
      navigate("/")
      return response.data
    } catch (err) {
      return rejectWithValue(err.response.data)
    }
  }
)

const adminSlice = createSlice({
  name: "admin",
  initialState: {
    admin: null,
    error: "",
    loading: false,
  },

  reducers: {
    setAdmin: (state, action) => {
      state.admin = action.payload
    },
    setLogout: (state, action) => {
      localStorage.clear()
      state.admin = null
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(adminlogin.pending, (state, action) => {
        state.loading = true
      })
      .addCase(adminlogin.fulfilled, (state, action) => {
        state.loading = false
        localStorage.setItem("adminprofile", JSON.stringify({ ...action.payload }))
        state.admin = action.payload
      })
      .addCase(adminlogin.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload.message
      })
  },
})

export const { setAdmin, setLogout } = adminSlice.actions
export default adminSlice.reducer;
