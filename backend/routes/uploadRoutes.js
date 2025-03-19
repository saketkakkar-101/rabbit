// const express = require("express");
// const multer = require("multer");
// const cloudinary = require("cloudinary").v2;
// const streamifier = require("streamifier");

// require("dotenv").config();

// const router = express.Router();

// cloudinary.config({
//     cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//     api_key: process.env.CLOUDINARY_API_KEY,
//     api_secret: process.env.CLOUDINARY_API_SECRET,
// });

// // multer setup using memory storage

// const storage = multer.memoryStorage();
// const upload = multer({ storage });

// router.post("/" , upload.single("image"), async(req, res) => {
//     try {
//         if(!req.file){
//             return res.status(400).json({message: "No file uploaded"});
//         }
// // function to handle the stream upload to cloudinary
// const streamUpload = (fileBuffer) => {
//     return new Promise((resolve, reject) => {
//         const stream = cloudinary.uploader.upload_stream((error, result) => {
//             if (result) {
//                 resolve(result);
//             } else {
//                 reject(error);
//             }
//         })

//         // Use streamifier to convert file buffer to a stream
//         streamifier.createReadStream(fileBuffer).pipe(stream);
//     });
// };

// // call the streamUpload function
// const result = await streamUpload(req.file.buffer);

// // Respond with the uploaded image URL

// res.json({ imageUrl: result.secure_url});

//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: "Server Error"});
        
//     }
// })

// module.exports = router;

const express = require("express");
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const streamifier = require("streamifier");

require("dotenv").config();

const router = express.Router();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

// multer setup using memory storage
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Image upload route
router.post("/", upload.single("image"), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: "No file uploaded" });
        }

        // function to handle the stream upload to cloudinary
        const streamUpload = (fileBuffer) => {
            return new Promise((resolve, reject) => {
                const stream = cloudinary.uploader.upload_stream((error, result) => {
                    if (result) {
                        resolve(result);
                    } else {
                        reject(error);
                    }
                });

                // Use streamifier to convert file buffer to a stream
                streamifier.createReadStream(fileBuffer).pipe(stream);
            });
        };

        // call the streamUpload function
        const result = await streamUpload(req.file.buffer);

        // Respond with the uploaded image URL
        res.json({ imageUrl: result.secure_url });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
});

// Update product route (Make sure it's implemented)
router.put("/api/admin/products/:id", async (req, res) => {
    try {
        // Assume your Product model is available
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        // Update product logic
        Object.assign(product, req.body);
        await product.save();

        res.json(product);  // Return the updated product
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
});

module.exports = router;
