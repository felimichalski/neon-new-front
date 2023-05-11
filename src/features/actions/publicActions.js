import { createAsyncThunk } from "@reduxjs/toolkit";

export const getPublics = createAsyncThunk(
    "public/post",
    async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/publics`,{
                mode: 'cors'
            })
            const data = await response.json();
            return data
        } catch (error) {
            console.error(error)
        }
    }
)