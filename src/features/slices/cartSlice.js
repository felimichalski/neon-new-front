import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
  cartItems: localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem("cartItems")) : [],
  cartTotalQuantity: 0,
  cartTotalAmount: 0,
  discount: null,
  status: 'pending'
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action) {
      const existingIndex = state.cartItems.findIndex(
        (item) => item.id === action.payload.id && item.size === action.payload.size && item.color === action.payload.color && item.control === action.payload.control
      );

      if (existingIndex >= 0) {
        state.cartItems[existingIndex] = {
          ...state.cartItems[existingIndex],
          quantity: state.cartItems[existingIndex].quantity + 1,
        };
        toast.success("Producto agregado al carrito", {
          position: "bottom-left",
        });
      } else {
        let tempProductItem = { ...action.payload, quantity: 1 };
        state.cartItems.push(tempProductItem);
        toast.success("Producto agregado al carrito", {
          position: "bottom-left",
        });
      }
      state.cartTotalQuantity += 1;
      state.cartTotalAmount += action.payload.unit_price;
      state.discount = null
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },

    updateFromCart(state, action) {
      let { product, value } = action.payload;

      value = parseInt(value)

      const itemIndex = state.cartItems.findIndex(
        (item) => item.id === product.id && item.color === product.color && item.size === product.size && item.control === action.payload.control
      );

      state.cartTotalQuantity = state.cartTotalQuantity - state.cartItems[itemIndex].quantity + value;
      state.cartTotalAmount = state.cartTotalAmount - (state.cartItems[itemIndex].unit_price * state.cartItems[itemIndex].quantity) + (state.cartItems[itemIndex].unit_price * value);
      state.cartItems[itemIndex].quantity = value;
      state.discount = null
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },

    removeFromCart(state, action) {
      const remaining = state.cartItems.filter((item) =>
        !(item.id === action.payload.id && item.color === action.payload.color && item.size === action.payload.size && item.control === action.payload.control)
      )

      state.cartItems.forEach((cartItem) => {
        if (cartItem.id === action.payload.id && cartItem.color === action.payload.color && cartItem.size === action.payload.size && cartItem.control === action.payload.control) {
          state.cartTotalQuantity -= cartItem.quantity;
          state.cartTotalAmount -= action.payload.unit_price * cartItem.quantity;

          toast.error("Producto eliminado del carrito", {
            position: "bottom-left",
          });
        }
      });
      
      state.cartItems = remaining;
      state.discount = null
      localStorage.setItem("cartItems", JSON.stringify(remaining));
    },

    getTotals(state) {
      let { total, quantity } = state.cartItems.reduce(
        (cartTotal, cartItem) => {
          const { unit_price, quantity } = cartItem;
          const itemTotal = unit_price * quantity;

          cartTotal.total += itemTotal;
          cartTotal.quantity += quantity;

          return cartTotal;
        },
        {
          total: 0,
          quantity: 0,
        }
      );
      total = parseFloat(total.toFixed(2));
      state.cartTotalQuantity = quantity;
      state.cartTotalAmount = total;
      state.status = 'success';
    },

    applyDiscount(state, action) {
      state.discount = action.payload
    },
  
    resetDiscount(state) {
      state.discount = null
    }
  }

});

export const { addToCart, updateFromCart, removeFromCart, getTotals, applyDiscount, resetDiscount } = cartSlice.actions;

export default cartSlice.reducer;