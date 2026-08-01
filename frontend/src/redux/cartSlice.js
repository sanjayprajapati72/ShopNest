


import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cartItems: localStorage.getItem("cartItems")
        ? JSON.parse(localStorage.getItem("cartItems"))
        : [],

    // Buy Now ke liye
    buyNowItem: null,
};

const cartSlice = createSlice({
    name: "cart",
    initialState,

    reducers: {

        // ==========================
        // ADD TO CART
        // ==========================
        addToCart: (state, action) => {

            const item = action.payload;

            const existItem = state.cartItems.find(
                (x) => x._id === item._id
            );

            if (existItem) {

                existItem.qty = item.qty ?? existItem.qty + 1;

                existItem.stock = item.stock;

                if (existItem.qty > existItem.stock) {
                    existItem.qty = existItem.stock;
                }

            } else {

                state.cartItems.push({
                    ...item,
                    qty: item.qty || 1,
                    stock: item.stock,
                });

            }

            localStorage.setItem(
                "cartItems",
                JSON.stringify(state.cartItems)
            );
        },

        // ==========================
        // BUY NOW
        // ==========================
        setBuyNowItem: (state, action) => {

            state.buyNowItem = {
                ...action.payload,
                qty: 1,
            };

        },

        clearBuyNowItem: (state) => {

            state.buyNowItem = null;

        },

        // ==========================
        // UPDATE QUANTITY
        // ==========================
        updateQty: (state, action) => {

            const { _id, qty } = action.payload;

            const item = state.cartItems.find(
                (x) => x._id === _id
            );

            if (item) {

                if (qty < 1) {

                    item.qty = 1;

                } else if (qty > item.stock) {

                    item.qty = item.stock;

                } else {

                    item.qty = qty;

                }

            }

            localStorage.setItem(
                "cartItems",
                JSON.stringify(state.cartItems)
            );
        },

        // ==========================
        // REMOVE FROM CART
        // ==========================
        removefromCart: (state, action) => {

            state.cartItems = state.cartItems.filter(
                (x) => x._id !== action.payload
            );

            localStorage.setItem(
                "cartItems",
                JSON.stringify(state.cartItems)
            );

        },

        // ==========================
        // CLEAR CART
        // ==========================
        clearCart: (state) => {

            state.cartItems = [];

            localStorage.removeItem("cartItems");

        },

    },

});

export const {
    addToCart,
    updateQty,
    removefromCart,
    clearCart,
    setBuyNowItem,
    clearBuyNowItem,
} = cartSlice.actions;

export default cartSlice.reducer;