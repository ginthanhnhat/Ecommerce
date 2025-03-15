import { v2 as cloudinary } from "cloudinary"
import productModel from "../models/productModel.js"

// ========== Function for Add product ==========
const addProduct = async (req, res) => {
    try {

        const isJSON = (str) => {
            if (typeof str !== "string") return false;
            try {
                JSON.parse(str);
                return true;
            } catch (error) {
                return false;
            }
        };

        const fixJSONString = (str) => {
            
            if (typeof str === "object") return str;
        
            let fixedStr = str.replace(/'/g, '"');
        
            try {
                return JSON.parse(fixedStr);
            } catch (error) {
                console.error("Invalid JSON format:", error.message);
                return fixedStr;
            }
        };

        const { main_category, title, price, store, parent_asin } = req.body;

        const categories = isJSON(req.body.categories) ? JSON.parse(req.body.categories) : req.body.categories;
        const description = isJSON(req.body.description) ? JSON.parse(req.body.description) : req.body.description;
        const features = isJSON(req.body.features) ? JSON.parse(req.body.features) : req.body.features;
        const details = fixJSONString(req.body.details);

        console.log("type of details: ",typeof(details))

        const images = ["image1", "image2", "image3", "image4"]
            .map(name => req.files[name]?.[0]?.path)
            .filter(Boolean);

        let imagesUrl = await Promise.all(
            images.map(async (filePath) => {
                let result = await cloudinary.uploader.upload(filePath, { resource_type: "image" });
                return {
                    hi_res: result.secure_url,
                    thumb: result.secure_url,
                    large: result.secure_url,
                    variant: result.secure_url
                };
            })
        );

        const productData = {
            title,
            description,
            price: Number(price),
            main_category,
            categories,
            images: imagesUrl,
            features,
            details,
            store,
            parent_asin
        };

        const product = new productModel(productData);
        await product.save();

        res.json({ success: true, message: "Product Added!", product });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// ========== Function for List product ==========
const listProduct = async (req, res) => {
    try {

        const products = await productModel.find({})
        res.json({success: true, products})

    } catch (error) {
        console.log(error)
        res.json({success: false, message: error.message})
    }

    
}

// ========== Function for Remove product ==========
const removeProduct = async (req, res) => {
    try {
        
        await productModel.findByIdAndDelete(req.body.id)
        res.json({success: true, message: "Product Removed!"})

    } catch (error) {
        console.log(error)
        res.json({success: false, message: error.message}) 
    }

    
}

// ========== Function for Single product info ==========
const singleProduct = async (req, res) => {
    try {
        
        const { parent_asin } = req.body
        const product = await productModel.findOne({parent_asin})
        
        res.json({success: true, product})

    } catch (error) {
        console.log(error)
        res.json({success: false, message: error.message}) 
    } 
}

export { addProduct, listProduct, removeProduct, singleProduct }