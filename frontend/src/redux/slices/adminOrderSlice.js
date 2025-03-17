import { createSlice, createAsyncThunk, __DO_NOT_USE__ActionTypes } from "@reduxjs/toolkit";
import axios from "axios";

// fetch all orders (admin only)
export const fetchAllOrders = createAsyncThunk(
    "adminOrders/fetchAllOrders",
    async (_, {rejectWithValue}) => {
        try {
            const response = await axios.get(
                `${import.meta.env.VITE_BACKEND_URL}/api/admin/orders`,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("userToken")}`,
                    },
                }
            )
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
)

// update order delivery status
export const updateOrderStatus = createAsyncThunk(
    "adminOrders/updateOrderStatus",
    async (  {id , status} , {rejectWithValue}) => {
        try {
            const response = await axios.put(
                `${import.meta.env.VITE_BACKEND_URL}/api/admin/orders/${id}`, 
                {status},
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("userToken")}`,
                    },
                }
            )
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
)