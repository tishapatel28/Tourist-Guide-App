// src/slices/CarSlice.js
import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { Url } from '../URL/Url';

const initialState = {
    list: [],
    status: 'idle',
    error: null,
};

const UserSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUsers: (state, action) => {
            state.list = action.payload;
        },
        setStatus: (state, action) => {
            state.status = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        }, removeUser: (state, action) => {
            state.list = state.list.filter(car => car.id !== action.payload);
        },
        updateUser: (state, action) => {
            const index = state.list.findIndex(car => car.id === action.payload.id);
            console.log("id is ", action.payload.id);
            if (index !== -1) {
                state.list[index] = action.payload;
            }
        },
    },
});

export const { setUsers, setStatus, setError, removeUser, updateUser } = UserSlice.actions;

export const readUser = () => async (dispatch) => {
    dispatch(setStatus('loading'));
    try {
        const response = await axios.get(Url.GETALL_USER_API);
        console.log(response.data);
        dispatch(setUsers(response.data));
        dispatch(setStatus('succeeded'));
    } catch (error) {
        dispatch(setError(error.message));
        dispatch(setStatus('failed'));
    }
};


export const addUser = (formData) => async (dispatch) => {
    dispatch(setStatus("loading"));
    try {
        const response = await axios.post(
            Url.ADD_USER_API,
            formData
        );
        dispatch(setStatus("succeeded"));
        dispatch(readUser());
        return response.data;
    } catch (error) {
        dispatch(setError(error.message));
        dispatch(setStatus("failed"));
        throw error;
    }
};

export const RegisterUser = (formData) => async (dispatch) => {
    dispatch(setStatus("loading"));
    try {
        const response = await axios.post(
            Url.Register,
            formData
        );
        dispatch(setStatus("succeeded"));
        dispatch(readUser());
        return response.data;
    } catch (error) {
        dispatch(setError(error.message));
        dispatch(setStatus("failed"));
        throw error;
    }
};

export const deleteUser = (id) => async (dispatch) => {
    dispatch(setStatus('loading'));
    try {
        await axios.delete(`${Url.DELETE_USER_API}/${id}`);
        dispatch(removeUser(id));
        dispatch(readUser());
        dispatch(setStatus('succeeded'));
    } catch (error) {
        dispatch(setError(error.message));
        dispatch(setStatus('failed'));
    }
};


export const updateUserDetails = ({ id, userPayload }) => async (dispatch) => {
    dispatch(setStatus('loading'));
    console.log("id is ", id);
    console.log('updateUserDetails called with:', id, userPayload);
    try {
        const response = await axios.patch(
            `${Url.UPDATE_USER_API}/${id}`,
            userPayload,
            {
                headers: {
                    'Content-Type': 'application/json; charset=utf-8',
                },
            }
        );
        console.log('api response:', response.data || 'No data returned');
        dispatch(updateUser(response.data));
        dispatch(readUser());
        dispatch(setStatus('succeeded'));
    } catch (error) {
        console.error('Update User failed:', error);
        dispatch(setError(error.message));
        dispatch(setStatus('failed'));
    }
};




export default UserSlice.reducer;