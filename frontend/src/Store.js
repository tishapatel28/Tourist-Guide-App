import { configureStore } from "@reduxjs/toolkit"
import carReducer from "./Car/CarSlice"
import locationReducer from "./Location/LocationSlice"
import reducer from "./User/UserSlice"
import restaurantReducer from "./Restaurant/RestaurantSlice"

export const Store=configureStore({
    reducer:{
        user:reducer,
        location:locationReducer,
        car:carReducer,
        restaurant:restaurantReducer,
        //users:userReducer,
    } 
})






