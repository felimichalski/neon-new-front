import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

export const postCategory = createAsyncThunk(
  "categories/post",
  async (body, { rejectWithValue }) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/categories`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body),
        mode: "cors"
      });

      if (response.status !== 201) {
        toast.error("La categoría no pudo ser creada", {
          position: "bottom-left",
        });
        return rejectWithValue(response.statusText);
      }
      toast.success("Categoría creada", {
        position: "bottom-left",
      });
    } catch (error) {
      console.error(error)
    }
  }
)

export const getCategories = createAsyncThunk(
  "categories/get",
  async () => {
      try {
          const response = await fetch(`${process.env.REACT_APP_API_URL}/types/all`,{
              mode: 'cors'
          })
          const data = await response.json();
          return data
      } catch (error) {
          console.error(error)
      }
  }
)