import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

export const postProduct = createAsyncThunk(
  "product/post",
  async (body, { rejectWithValue }) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/products`, {
        method: "POST",
        body: body,
        mode: "cors"
      });

      if (response.status !== 201) {
        toast.error("EL producto no pudo ser creado", {
          position: "bottom-left",
        });
        return rejectWithValue(response.statusText);
      }
      toast.success("Producto creado", {
        position: "bottom-left",
      });
    } catch (error) {
      console.error(error)
    }
  }
)

export const getProduct = createAsyncThunk(
  "product/getProduct",
  async (id) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/product/${id}`, {
        mode: 'cors'
      })
      const data = await response.json();
      return data
    } catch (error) {
      console.error(error)
    }
  }
)