import { createAsyncThunk } from "@reduxjs/toolkit";

export const featuredFetch = createAsyncThunk(
    "featured/featuredFetch",
    async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/products/featured`,{
                mode: 'cors'
            })
            const data = await response.json();
            return data
        } catch (error) {
            console.error(error)
        }
    }
)