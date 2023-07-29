import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
  cartItems: localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem("cartItems")) : [],
  cartTotalQuantity: 0,
  cartTotalAmount: 0,
  status: 'pending'
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action) {
      const existingIndex = state.cartItems.findIndex(
        (item) => item.id === action.payload.id && item.size === action.payload.size
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
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    decreaseCart(state, action) {
      
      const itemIndex = state.cartItems.findIndex(
        (item) => item.id === action.payload.id && item.color === action.payload.color && item.size === action.payload.size
        );
      if (state.cartItems[itemIndex].quantity > 1) {
        state.cartItems[itemIndex].quantity -= 1;
        toast.error("Producto eliminado del carrito", {
          position: "bottom-left",
        });
      } else if (state.cartItems[itemIndex].quantity === 1) {
        const nextCartItems = state.cartItems.filter(
          (item) => {
            return(item.id !== action.payload.id || item.color !== action.payload.color || item.size !== action.payload.size)}
        );
        state.cartItems = nextCartItems;

        if (state.cartItems.length > 0) {
          toast.error("Producto eliminado del carrito", {
            position: "bottom-left",
          });
        } else {
          toast.error("Carrito vacío", {
            position: "bottom-left",
          });
        }
      }
      state.cartTotalQuantity -= 1;
      state.cartTotalAmount -= action.payload.unit_price;
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    removeFromCart(state, action) {
      state.cartItems.map((cartItem) => {
        if (cartItem.id === action.payload.id && cartItem.color === action.payload.color && cartItem.size === action.payload.size) {
          const nextCartItems = state.cartItems.filter(
            (item) => item.id !== cartItem.id || item.color !== cartItem.color || item.size !== cartItem.size
          );

          state.cartItems = nextCartItems;

          state.cartTotalQuantity -= cartItem.quantity;
          state.cartTotalAmount -= action.payload.unit_price * cartItem.quantity;

          toast.error("Producto eliminado del carrito", {
            position: "bottom-left",
          });
        }
        localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
        return state;
      });
    },
    getTotals(state, action) {
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
    clearCart(state, action) {
      state.cartItems = [];
      state.cartTotalQuantity = 0;
      state.cartTotalAmount = 0;
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
      toast.error("Carrito vacío", { position: "bottom-left" });
    },
  },
});

export const { addToCart, decreaseCart, removeFromCart, getTotals, clearCart } =
  cartSlice.actions;

export default cartSlice.reducer;