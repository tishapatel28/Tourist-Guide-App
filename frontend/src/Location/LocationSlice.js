import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { Url } from '../URL/Url';

const initialState = {
  list: [],
  status: 'idle',
  error: null,
};

const LocationSlice = createSlice({
  name: 'location',
  initialState,
  reducers: {
    setLocations: (state, action) => {
      state.list = action.payload;
    },
    setStatus: (state, action) => {
      state.status = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    removeLocation: (state, action) => {
      state.list = state.list.filter(location => location.id !== action.payload);
    },
    updateLocation: (state, action) => {
      const index = state.list.findIndex(location => location.id === action.payload.id);
      if (index !== -1) {
        state.list[index] = action.payload;
      }
    },
  },
});

export const { setLocations, setStatus, setError, removeLocation, updateLocation } = LocationSlice.actions;

export const readLocation = () => async (dispatch) => {
  dispatch(setStatus('loading'));
  try {
    const response = await axios.get(Url.GETALL_LOCATION_API);
    dispatch(setLocations(response.data));
    dispatch(setStatus('succeeded'));
  } catch (error) {
    dispatch(setError(error.message));
    dispatch(setStatus('failed'));
  }
};

export const addLocation = (formData) => async (dispatch) => {
  dispatch(setStatus('loading'));
  try {
    const response = await axios.post(Url.ADD_LOCATION_API, formData);
    dispatch(setStatus('succeeded'));
    dispatch(readLocation());
  } catch (error) {
    dispatch(setError(error.message));
    dispatch(setStatus('failed'));
  }
};

export const deleteLocation = (id) => async (dispatch) => {
  dispatch(setStatus('loading'));
  try {
    await axios.delete(`${Url.DELETE_LOCATION_API}/${id}`);
    dispatch(removeLocation(id));
    dispatch(readLocation());
    dispatch(setStatus('succeeded'));
  } catch (error) {
    dispatch(setError(error.message));
    dispatch(setStatus('failed'));
  }
};

export const updateLocationDetails = ({ id, formData }) => async (dispatch) => {
  dispatch(setStatus('loading'));
  try {
    const response = await axios.patch(`${Url.UPDATE_LOCATION_API}/${id}`, formData);
    dispatch(updateLocation(response.data));
    dispatch(readLocation());
    dispatch(setStatus('succeeded'));
  } catch (error) {
    dispatch(setError(error.message));
    dispatch(setStatus('failed'));
  }
};

export default LocationSlice.reducer;
