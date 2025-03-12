const express = require("express");
const Product = require("../models/Product");
const { protect, admin} = require("../middleware/authMiddleware")

const router = express.Router();

router.post("/", protect, admin, async (req, res) =>{
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

        } = req.body;

           const product = new Product({
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
            user: req.user._id,
            });
            const createdProduct = await product.save();
            res.status(201).json(createdProduct);

    } catch(error) {
        console.error(error);
        res.status(500).send("Server Error");
        
    }
})

router.put("/:id", protect, admin, async(req,res) => {
    try {
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
    
            } = req.body;

            const product = await Product.findById(req.params.id);


            if(product){

                product.name = name || product.name;
                product.description = description || product.description;
                product.price = price || product.price;
                product.discountPrice = discountPrice || product.discountPrice;
                product.countInStock = countInStock || product.countInStock;
                product.category = category || product.category;
                product.brand = brand || product.brand;
                product.sizes = sizes || product.sizes;
                product.colors = colors || product.colors;
                product.collections = collections || product.collections;
                product.material = material || product.material;
                product.gender = gender || product.gender;
                product.images = images || product.images;
                product.isFeatured = 
                isFeatured !== undefined ? isFeatured : product.isFeatured;
                product.isPublished = 
                isPublished !== undefined ? isPublished : product.isPublished;
                product.tags = tags || product.tags;
                product.dimensions = dimensions || product.dimensions;
                product.weight = weight || product.weight;
                product.sku = sku || product.sku;
    


                const updatedProduct = await product.save();
                res.json(updatedProduct);
            } else {
                res.status(404).json({message: "Product not found"});

            }
    } catch (error) {
        console.error(error);
        res.status(500).send("Server Error")
    }
});

router.delete("/:id" , protect , admin , async(req, res) => {
    try{
        const product = await Product.findById(req.params.id);

        if(product){
            // Remove product from DB
            await product.deleteOne();
            res.json({message: "Product removed"})
        } else {
            res.status(404).json({message: "Product not found"});
        }

    } catch (error) {
        console.error(error);
        res.status(500).send("Server Error");
    }
});

//route get /api/products
// desc get all products with optional query filters
// accessible public

router.get("/" , async(req, res) => {
    try{
        const {
            collection,
            size,
            color,
            gender,
            minPrice,
            maxPrice,
            sortBy,
            search,
            category,
            material,
            brand,
            limit
        } = req.query;

let = query = {};

if(collection && collection.toLocaleLowerCase() !== "all"){
    query.collections = collection;
}

if(category && category.toLocaleLowerCase() !== "all"){
    query.category = category;
}

if(material){
    query.material = { $in: material.split(",") };
}

if(brand){
    query.brand = { $in: brand.split(",") };
}

if(size){
    query.sizes = { $in: size.split(",") };
}

if(color) {
    query.colors = {$in: [color] };
}

if(gender){
    query.gender = gender;
}

if(minPrice || maxPrice){
    query.price = {};
    if(minPrice) query.price.$gte = Number(minPrice);
    if(maxPrice) query.price.$lte = Number(maxPrice);
}

if(search){
    query.$or = [
        {name: { $regex: search, $options: "i"}},
        {description: { $regex: search, $options: "i"}},
    ]
}

// sort Logic

let sort = {};

if (sortBy) {
    switch(sortBy) {
        case "priceAsc":
            sort = {price: 1};
            break;
            case "priceDesc":
                sort = {price: -1};
                break;
                case "popularity":
                sort = {rating: -1};
                break;
                default:
                break;
    }
}

let products = await Product.find(query)
.sort(sort)
.limit(Number(limit || 0));
res.json(products)

    } catch(error) {
        console.error(error);
        res.status(500).send("server Error");

    }
});

//route get api products best seller
    // desc retrieve the product with highest rating
    // access public


    router.get("/best-seller" , async(req,res) => {
        try {
            const bestSeller = await Product.findOne().sort({ rating: -1});
            if (bestSeller) {
                res.json(bestSeller);
            } else {
                res.status(404).json({message: "No best seller found"})
            }
        } catch (error) {
            console.error(error);
            res.status(500).send("Server Error");
        }
    })

    // route get /api/ products/ new-arrivals
    // desc retrieve latest 8 products - Creation data
    // access Public

    router.get("/new-arrivals", async (req, res) => {
        try {
            const newArrivals = await Product.find().sort({ created: -1}).limit(8);
            res.json(newArrivals);
        } catch (error) {
            console.error(error);
            res.status(500).send("Server Error");
        }
    })

// route get/ api/products/:id

router.get("/:id" , async(req , res) => {
    try {
   const product = await Product.findById(req.params.id);      
    if (product) {
        res.json(product);
    } else {
        res.status(404).json({ message: "Product Not Found"});
    }
    } catch (error) {
        console.error(error);
        res.status(500).send("Server Error");
    }
})

router.get("/similar/:id", async (req, res) => {
    const { id } = req.params;
    
    try {
        // Step 1: Check if the product exists
        const product = await Product.findById(id);
        
        // If no product is found, return an error
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        // Step 2: Find similar products based on gender and category
        const similarProducts = await Product.find({
            _id: { $ne: id }, // Exclude the current product
            gender: product.gender,
            category: product.category,
        }).limit(4); // Limit the number of similar products to 4

        // Return the similar products
        res.json(similarProducts);
    } catch (error) {
        console.error(error);
        res.status(500).send("Server Error");
    }

    
    
});


module.exports = router;