import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

export const getPublics = createAsyncThunk(
    "public/get",
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

export const updatePublic = createAsyncThunk(
    "public/updatePublic",
    async (info, thunkAPI) => {
        try {
          const response = await fetch(`${process.env.REACT_APP_API_URL}/publics`, {
            method: 'PATCH',
            body: JSON.stringify(info),
            headers: {
              'Content-Type': 'application/json',
            },
          });
          if (!response.ok) {
            throw new Error('Error al actualizar los datos');
          }
          const data = await response.json();
          toast.success("Texto cambiado con éxito!", {
            position: "bottom-left",
          });
          return data;
        } catch (error) {
          throw error;
        }
      }
)