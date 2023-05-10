import { configureStore } from '@reduxjs/toolkit'

import featuredReducer from '../features/slices/featuredSlice'
import cartReducer, { getTotals } from '../features/slices/cartSlice'
import authReducer from '../features/slices/authSlice'
import socialReducer from '../features/slices/socialSlice'
import productReducer from "../features/slices/productSlice"
import { socialFetch } from '../features/actions/socialActions'
import { getUserDetails } from '../features/actions/authActions'
import { postProduct } from '../features/actions/productActions'

export const store = configureStore({
    reducer: {
        cart: cartReducer,
        featured: featuredReducer,
        social: socialReducer,
        auth: authReducer,
        product: productReducer
    }
});

store.dispatch(socialFetch());
store.dispatch(getUserDetails());
store.dispatch(getTotals());
store.dispatch(postProduct());