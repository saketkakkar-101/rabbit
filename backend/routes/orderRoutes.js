const express = require("express");
const Order = require("../models/Order")
const {protect} = require("../middleware/authMiddleware")

const router = express.Router();

// route get api orders my-orders
// desc get logged-in users orders
// access private

router.get("/my-orders" , protect , async(req , res) => {
    try {
        // find orders for the authenticated users
        const orders = await Order.find({user : req.user._id}).sort()
    } catch (error) {
        
    }
})