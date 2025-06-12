// src/slices/CarSlice.js
import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { Url } from '../URL/Url';

const initialState = {
  list: [],
  status: 'idle',
  error: null,
};

const carSlice = createSlice({
  name: 'car',
  initialState,
  reducers: {
    setCars: (state, action) => {
      state.list = action.payload;
    },
    setStatus: (state, action) => {
      state.status = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    }, removeCar: (state, action) => {
      state.list = state.list.filter(car => car.id !== action.payload);
    },
    updateCar: (state, action) => {
      const index = state.list.findIndex(car => car.id === action.payload.id);
      if (index !== -1) {
        state.list[index] = action.payload;
      }
    },
  },
});

export const { setCars, setStatus, setError, removeCar, updateCar } = carSlice.actions;

export const readCar = () => async (dispatch) => {
  dispatch(setStatus('loading'));
  try {
    const response = await axios.get(Url.GETALL_CAR_API);
    dispatch(setCars(response.data));
    dispatch(setStatus('succeeded'));
  } catch (error) {
    dispatch(setError(error.message));
    dispatch(setStatus('failed'));
  }
};


export const addCar = (formData) => async (dispatch) => {
  dispatch(setStatus('loading'));
  try {
    const response = await axios.post(Url.ADD_CAR_API, formData);
    dispatch(setStatus('succeeded'));
    dispatch(readCar());
    return response.data;
  } catch (error) {
    dispatch(setError(error.message));
    dispatch(setStatus('failed'));
    throw error;
  }
};

export const deleteCar = (carId) => async (dispatch) => {
  dispatch(setStatus('loading'));
  try {
    await axios.delete(`${Url.DELETE_CAR_API}/${carId}`);
    dispatch(removeCar(carId));  // update redux locally
    dispatch(readCar());         // refetch full list from backend to sync state
    dispatch(setStatus('succeeded'));
  } catch (error) {
    dispatch(setError(error.message));
    dispatch(setStatus('failed'));
  }
};


export const updateCarDetails = ({ id, formData }) => async (dispatch) => {
  dispatch(setStatus('loading'));
  console.log("id is ", id);

  console.log('updateCarDetails called with:', id, formData); // <--- add this

  try {
    const response = await axios.patch(`${Url.UPDATE_CAR_API}/${id}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });

    console.log('api response:', response.data); // <--- check this again

    dispatch(updateCar(response.data));
    dispatch(readCar());
    dispatch(setStatus('succeeded'));
  } catch (error) {
    console.error('Update car failed:', error); // <--- add this
    dispatch(setError(error.message));
    dispatch(setStatus('failed'));
  }
};


export default carSlice.reducer;