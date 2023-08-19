import { configureStore } from '@reduxjs/toolkit'

import featuredReducer from '../features/slices/featuredSlice'
import cartReducer, { getTotals } from '../features/slices/cartSlice'
import authReducer from '../features/slices/authSlice'
import socialReducer from '../features/slices/socialSlice'
import productReducer from "../features/slices/productSlice"
import publicReducer from "../features/slices/publicSlice"
import categoryReducer from "../features/slices/categorySlice"
import { socialFetch } from '../features/actions/socialActions'
import { getUserDetails } from '../features/actions/authActions'
import { getPublics } from '../features/actions/publicActions'
import { getCategories } from '../features/actions/categoryActions'

export const store = configureStore({
    reducer: {
        cart: cartReducer,
        featured: featuredReducer,
        social: socialReducer,
        auth: authReducer,
        product: productReducer,
        public: publicReducer,
        category: categoryReducer
    }
});

store.dispatch(socialFetch());
store.dispatch(getUserDetails());
store.dispatch(getTotals());
store.dispatch(getPublics());
store.dispatch(getCategories());