import { v2 as cloudinary } from "cloudinary"
import productModel from "../models/productModel.js"

// ========== Function for Add product ==========
const addProduct = async (req, res) => {
    try {
        
        const { main_category, title, features, description, price, store, categories, details, parent_asin } = req.body

        const image1 = req.files.image1 && req.files.image1[0]
        const image2 = req.files.image2 && req.files.image2[0]
        const image3 = req.files.image3 && req.files.image3[0]
        const image4 = req.files.image4 && req.files.image4[0]

        // const images = [image1, image2, image3, image4].filter((item)=>item !== undefined)

        const images = ["image1", "image2", "image3", "image4"]
            .map(name => req.files[name]?.[0]?.path)
            .filter(path => path !== undefined);

        // let imagesUrl = await Promise.all(
        //     images.map(async(item)=>{
        //         let result = await cloudinary.uploader.upload(item.path, {resource_type: "image"})
        //         return result.secure_url
        //     })
        // )

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

        // ---------- Convert String to Json ----------
        const parseArray = (input) => {
            if (!input) return [];
            try {
                return typeof input === "string" ? JSON.parse(input) : input;
            } catch (error) {
                return [input];
            }
        };

        const parseObject = (input) => {
            if (!input) return {};
            try {
                return typeof input === "string" ? JSON.parse(input) : input;
            } catch (error) {
                return {};
            }
        };

        const productData = { 
            title,
            description: parseArray(description),
            price: Number(price),
            main_category,
            categories: parseArray(categories),
            images: imagesUrl,
            features: parseArray(features),
            details: parseObject(details),
            store,
            parent_asin,
            date: Date.now()
        }

        const product = new productModel(productData)
        await product.save()
    
        console.log(product)

        res.json({success: true, message: "Product Added!", product: product})

    } catch (error) {
        console.log(error)
        res.json({success: false, message: error.message})
    }
}

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