// src/slices/CarSlice.js
import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { Url } from '../URL/Url';

const initialState = {
  list: [],
  status: 'idle',
  error: null,
};

const RestaurantSlice = createSlice({
  name: 'restaurant',
  initialState,
  reducers: {
    setRestaurant: (state, action) => {
      state.list = action.payload;
    },
    setStatus: (state, action) => {
      state.status = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    }, removeRestaurant: (state, action) => {
      state.list = state.list.filter(car => car.id !== action.payload);
    },
    updateRestaurant: (state, action) => {
      const index = state.list.findIndex(car => car.id === action.payload.id);
      if (index !== -1) {
        state.list[index] = action.payload;
      }
    },
  },
});

export const { setRestaurant, setStatus, setError, removeRestaurant, updateRestaurant } = RestaurantSlice.actions;

export const readRestaurant = () => async (dispatch) => {
  dispatch(setStatus('loading'));
  try {
    const response = await axios.get(Url.GETALL_RESTAURANT_API);
    dispatch(setRestaurant(response.data));
    console.log("Response is ",response.data);
    dispatch(setStatus('succeeded'));
  } catch (error) {
    dispatch(setError(error.message));
    dispatch(setStatus('failed'));
  }
};


export const addRestaurant = (formData) => async (dispatch) => {
  dispatch(setStatus('loading'));
  try {
    const response = await axios.post(Url.ADD_RESTAURANT_API, formData);
    dispatch(setStatus('succeeded'));
    dispatch(readRestaurant());
    return response.data;
  } catch (error) {
    dispatch(setError(error.message));
    dispatch(setStatus('failed'));
    throw error;
  }
};

export const deleteRestaurant = (carId) => async (dispatch) => {
  dispatch(setStatus('loading'));
  try {
    await axios.delete(`${Url.DELETE_RESTAURANT_API}/${carId}`);
    dispatch(removeRestaurant(carId));  
    dispatch(readRestaurant());         
    dispatch(setStatus('succeeded'));
  } catch (error) {
    dispatch(setError(error.message));
    dispatch(setStatus('failed'));
  }
};


export const updateRestaurantDetails = ({ id, formData }) => async (dispatch) => {
  dispatch(setStatus('loading'));
  console.log("id is ", id);

  console.log('updateRestaurantDetails called with:', id, formData); 

  try {
    const response = await axios.patch(`${Url.UPDATE_RESTAURANT_API}/${id}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });

    console.log('api response:', response.data); 

    dispatch(updateRestaurant(response.data));
    dispatch(readRestaurant());
    dispatch(setStatus('succeeded'));
  } catch (error) {
    console.error('Update car failed:', error); 
    dispatch(setError(error.message));
    dispatch(setStatus('failed'));
  }
};


export default RestaurantSlice.reducer;