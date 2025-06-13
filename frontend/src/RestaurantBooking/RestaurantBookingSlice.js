// src/slices/CarSlice.js
import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { Url } from '../URL/Url';

const initialState = {
  list: [],
  status: 'idle',
  error: null,
};

const RestaurantbookingSlice = createSlice({
  name: 'restaurantbooking',
  initialState,
  reducers: {
    setRestaurantbooking: (state, action) => {
      state.list = action.payload;
    },
    setStatus: (state, action) => {
      state.status = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    }, removeRestaurantbooking: (state, action) => {
      state.list = state.list.filter(car => car.id !== action.payload);
    },
    updateRestaurantbooking: (state, action) => {
      const index = state.list.findIndex(car => car.id === action.payload.id);
      if (index !== -1) {
        state.list[index] = action.payload;
      }
    },
  },
});

export const { setRestaurantbooking, setStatus, setError, removeRestaurantbooking, updateRestaurantbooking } = RestaurantbookingSlice.actions;

export const readRestaurantbooking = () => async (dispatch) => {
  dispatch(setStatus('loading'));
  try {
    const response = await axios.get(Url.GETALL_RESTAURANTBOOKING_API);
    dispatch(setRestaurantbooking(response.data));
    console.log("Response is ",response.data);
    dispatch(setStatus('succeeded'));
  } catch (error) {
    dispatch(setError(error.message));
    dispatch(setStatus('failed'));
  }
};


export const addRestaurantbooking = (formData) => async (dispatch) => {
  dispatch(setStatus('loading'));
  try {
    const response = await axios.post(Url.ADD_RESTAURANTBOOKING_API, formData);
    dispatch(setStatus('succeeded'));
    dispatch(readRestaurantbooking());
    return response.data;
  } catch (error) {
    dispatch(setError(error.message));
    dispatch(setStatus('failed'));
    throw error;
  }
};

export const deleteRestaurantbooking = (carId) => async (dispatch) => {
  dispatch(setStatus('loading'));
  try {
    await axios.delete(`${Url.DELETE_RESTAURANTBOOKING_API}/${carId}`);
    console.log(Url.DELETE_RESTAURANTBOOKING_API/carId);
    dispatch(removeRestaurantbooking(carId));  
    dispatch(readRestaurantbooking());         
    dispatch(setStatus('succeeded'));
  } catch (error) {
    dispatch(setError(error.message));
    dispatch(setStatus('failed'));
  }
};


export const updateRestaurantbookingDetails = ({ id, formData }) => async (dispatch) => {
  dispatch(setStatus('loading'));
  console.log("id is ", id);

  console.log('updateRestaurantbookingDetails called with:', id, formData); 

  try {
    const response = await axios.patch(`${Url.UPDATE_RESTAURANTBOOKING_API}/${id}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });

    console.log('api response:', response.data); 

    dispatch(updateRestaurantbooking(response.data));
    dispatch(readRestaurantbooking());
    dispatch(setStatus('succeeded'));
  } catch (error) {
    console.error('Update car failed:', error); 
    dispatch(setError(error.message));
    dispatch(setStatus('failed'));
  }
};


export default RestaurantbookingSlice.reducer;