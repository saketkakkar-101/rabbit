const express = require("express")
const cors = require("cors")
const dotenv = require("dotenv");
const connectDB = require("./config/db")
const userRoutes = require("./routes/userRoutes")
const productRoutes = require("./routes/productRoutes")
const cartRoutes = require("./routes/CartRoutes")
const checkoutRoutes = require("./routes/checkoutRoutes")

const app = express();
app.use(express.json());
app.use(cors());

dotenv.config();

const PORT = process.env.PORT || 3000;

// connect to mongodb
connectDB();


app.get("/" , (req,res) => {
    res.send("Welcome")
});

// api routes

app.use("/api/users", userRoutes)
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/checkout" , checkoutRoutes);

app.listen(PORT , ()=> {
    console.log(`Server is running on http://localhost:${PORT}`);
})