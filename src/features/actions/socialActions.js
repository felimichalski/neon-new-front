import { createAsyncThunk } from "@reduxjs/toolkit";

export const socialFetch = createAsyncThunk(
    "social/socialFetch",
    async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/social`, {
                mode: 'cors'
            })
            console.log(response)
            const data = await response.json();
            return data
        } catch (error) {
            console.error(error)
        }
    }
)