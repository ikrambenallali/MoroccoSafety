import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';
import { API_URL } from '../utils/constants';


type User = {
  id: string
  role: 'citizen' | 'authority' | 'admin'
  email?: string
}

type AuthState = {
  user: User | null
  token: string | null
  loading: boolean
  isInitialized: boolean
  error: any
}

const initialState: AuthState = {
  user: null,
  token: null,
  loading: false,
  isInitialized: false,
  error: null
}
const API = `${API_URL}/auth`;

// 🔥 REGISTER
export const registerUser = createAsyncThunk(
  'auth/register',
  async (data, thunkAPI) => {
    try {
      const res = await axios.post(`${API}/register`, data);
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue((err as AxiosError).response?.data);
    }
  }
);

// 🔥 LOGIN
export const loginUser = createAsyncThunk(
  'auth/login',
  async (data, thunkAPI) => {
    try {
      const res = await axios.post(`${API}/login`, data);
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue((err as AxiosError).response?.data);
    }
  }
);

// 🔥 GET USER PROFILE
export const getUserProfile = createAsyncThunk(
  'auth/getProfile',
  async (_, thunkAPI) => {
    try {
      const res = await axios.get(`${API}/me`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue((err as AxiosError).response?.data);
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem('token');
    },
    initialize: (state) => {
      state.isInitialized = true;
    },
  },
  extraReducers: (builder) => {
    builder
      // REGISTER
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.access_token;

        localStorage.setItem('token', action.payload.access_token);

      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // LOGIN
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.access_token;
        state.user = action.payload.user;

        // persist token so AuthGuard can read it after redirect
        localStorage.setItem('token', action.payload.access_token);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // GET PROFILE
      .addCase(getUserProfile.pending, (state) => {
        console.log('getUserProfile: pending');
        state.loading = true;
      })
      .addCase(getUserProfile.fulfilled, (state, action) => {
        console.log('getUserProfile: fulfilled', action.payload);
        state.loading = false;
        state.isInitialized = true;
        state.user = action.payload;
        state.token = localStorage.getItem('token'); // Sync token from localStorage
      })
      .addCase(getUserProfile.rejected, (state, action) => {
        console.log('getUserProfile: rejected', action.payload);
        state.loading = false;
        state.isInitialized = true;
        // If token is invalid, logout
        state.user = null;
        state.token = null;
        localStorage.removeItem('token');
      });
  },
});

export const { logout, initialize } = authSlice.actions;
export default authSlice.reducer;