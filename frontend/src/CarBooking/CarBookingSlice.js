// src/slices/CarbookingSlice.js
import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { Url } from '../URL/Url';

const initialState = {
  list: [],
  status: 'idle',
  error: null,
};

const CarBookingSlice = createSlice({
  name: 'carbooking',
  initialState,
  reducers: {
    setCarbookings: (state, action) => {
      state.list = action.payload;
    },
    setStatus: (state, action) => {
      state.status = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    removeCarbooking: (state, action) => {
      state.list = state.list.filter(carbooking => carbooking.id !== action.payload);
    },
    updateCarbooking: (state, action) => {
      const updated = action.payload;
      const index = state.list.findIndex(c => c.id === updated.id);
      if (index !== -1) {
        state.list[index] = updated;
      }
    }
  },
});

export const { setCarbookings, setStatus, setError, removeCarbooking, updateCarbooking } = CarBookingSlice.actions;

export const readCarbooking = () => async (dispatch) => {
  dispatch(setStatus('loading'));
  try {
    const response = await axios.get(Url.GETALL_CARBOOKING_API);
    dispatch(setCarbookings(response.data));
    dispatch(setStatus('succeeded'));
  } catch (error) {
    dispatch(setError(error.message));
    dispatch(setStatus('failed'));
  }
};

export const addCarbooking = (formData) => async (dispatch) => {
  dispatch(setStatus('loading'));
  try {
    const response = await axios.post(Url.ADD_CARBOOKING_API, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    dispatch(setStatus('succeeded'));
    dispatch(readCarbooking());
    return response.data;
  } catch (error) {
    dispatch(setError(error.message));
    dispatch(setStatus('failed'));
    throw error;
  }
};

export const updateCarbookingDetails = ({ id, formData }) => async (dispatch) => {
  dispatch(setStatus('loading'));
  try {
    const response = await axios.patch(`${Url.UPDATE_CARBOOKING_API}/${id}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });

    dispatch(updateCarbooking(response.data));
    dispatch(readCarbooking());
    dispatch(setStatus('succeeded'));
  } catch (error) {
    dispatch(setError(error.message));
    dispatch(setStatus('failed'));
  }
};

export const deleteCarbooking = (carbookingId) => async (dispatch) => {
  dispatch(setStatus('loading'));
  try {
    await axios.delete(`${Url.DELETE_CARBOOKING_API}/${carbookingId}`);
    dispatch(removeCarbooking(carbookingId));
    dispatch(readCarbooking());
    dispatch(setStatus('succeeded'));
  } catch (error) {
    dispatch(setError(error.message));
    dispatch(setStatus('failed'));
  }
};

export default CarBookingSlice.reducer;
