const express = require("express");
const Product = require("../models/Product");
const { protect } = require("../middleware/authMiddleware")

const router = express.Router();

router.post("/", protect, async (req, res) =>{
    try{
        const {
        name,
        description,
        price,
        discountPrice,
        countInStock,
        category,
        brand,
        sizes,
        colors,
        collections,
        material,
        gender,
        images,
        isFeatured,
        isPublished,
        tags,
        dimensions,
        weight,
        sku,

        } = req.body
    } catch(error) {}
})