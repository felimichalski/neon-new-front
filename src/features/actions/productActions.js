import { createAsyncThunk } from "@reduxjs/toolkit";

export const postProduct = createAsyncThunk(
    "product/post",
    async (body, { rejectWithValue }) => {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/products`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(body),
            });
      
            if(response.status !== 201) {
              return rejectWithValue(response.statusText);
            }
        } catch (error) {
            console.error(error)
        }
    }
)