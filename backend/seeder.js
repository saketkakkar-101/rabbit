const mongoose = require("mongoose")
const dotenv = require("dotenv");
const Product = require("./models/Product")
const User = require("./models/User")
const products = require("./data/products")

dotenv.config();

mongoose.connect(process.env.MONGO_URI);

// Function to seed data

const seedData = async () =>{
    try{
await Product.deleteMany();
await User.deleteMany();


// create a default admin
const createdUser = await User.create({
    name: "Admmin User",
    email: "admin@example.com",
    password: "123456",
    role: "admin",
});

// Assign the default user ID to each product
const userID = createdUser._id;

const sampleProducts = products.map((product) => {
    return {...product, userID};
});

// Insert the product into the database

await Product.insertMany(sampleProducts);

console.log("Product data seeded successfuly!");
process.exit();

    } catch (error) {
        console.error("Error seeding the data:" , error);
        process.exit(1);
    }
}

seedData();