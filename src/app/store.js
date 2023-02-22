import { configureStore } from '@reduxjs/toolkit'

import featuredReducer from '../features/slices/featuredSlice'
import { featuredFetch } from '../features/actions/featuredActions'
import cartReducer from '../features/slices/cartSlice'
import authReducer from '../features/slices/authSlice'
import socialReducer from '../features/slices/socialSlice'
import { socialFetch } from '../features/actions/socialActions'
import { getUserDetails } from '../features/actions/authActions'

export const store = configureStore({
    reducer: {
        cart: cartReducer,
        featured: featuredReducer,
        social: socialReducer,
        auth: authReducer
    }
});

store.dispatch(featuredFetch());
store.dispatch(socialFetch());
store.dispatch(getUserDetails());