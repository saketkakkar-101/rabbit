const express = require("express");
const Cart = require("../models/Cart");
const Product = require("../models/Product")
const {protect} = require("../middleware/authMiddleware")

const router = express.Router();

// Helper function to get a cart by user Id or guest ID

const getCart = async (userId, guestId) => {
    if(userId){
        return await Cart.findOne({ user: userId});
    } else if (guestId){
        return await Cart.findOne({ guestId });

    }
    return null;
}


// route POST api cart
// desc add a product to the cart for a guest or logged in user
// access Public

router.post("/" , async (req , res) => {
    const { productId, quantity, size, color, guestId, userId } = req.body;
    try {
        const product = await Product.findById(productId);
        if (!product) return res.status(404).json({message: "Product not found"});

        // Determine if the user is logged in or guest
        let cart = await getCart(userId, guestId);

        // if the cart exist, update it

        if(cart){
            const productIndex = cart.products.findIndex(
                (p) => 
                    p.productId.toString() === productId &&
                p.size === size &&
                p.color === color
            );

            if(productIndex > -1){
                // if the product already exist update the quantity
                cart.products[productIndex].quantity += quantity;
            } else {
                // add new product
                cart.products.push({
                    productId,
                    name: product.name,
                    image: product.images[0].url,
                    price: product.price,
                    size,
                    color,
                    quantity,
                });
            }

            // Recalculate the total price

            cart.totalPrice = cart.products.reduce((acc, item) => acc + item.price * item.quantity , 0);
            await cart.save();
            return res.status(200).json(cart); 
        } else {
            // create a new cart for the guest or user
            const newCart = await Cart.create({
            userId: userId ? userId : undefined,
            guestId : guestId ? guestId : "guest_" + new Date().getTime(),
        });
        }

    } catch (error) {
        
    }
})