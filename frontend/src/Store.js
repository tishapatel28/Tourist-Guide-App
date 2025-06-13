import { configureStore } from "@reduxjs/toolkit"
import carReducer from "./Car/CarSlice"
import locationReducer from "./Location/LocationSlice"
import reducer from "./User/UserSlice"
import restaurantReducer from "./Restaurant/RestaurantSlice"
import carBookingReducer from "./CarBooking/CarBookingSlice"
import restaurantBookingreducer from "./RestaurantBooking/RestaurantBookingSlice"

export const Store=configureStore({
    reducer:{
        user:reducer,
        location:locationReducer,
        car:carReducer,
        restaurant:restaurantReducer,
        carbooking:carBookingReducer,
        restaurantbooking:restaurantBookingreducer
        //users:userReducer,
    } 
})






