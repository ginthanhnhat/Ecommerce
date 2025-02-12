import { v2 as cloudinary } from "cloudinary"
import productModel from "../models/productModel.js"

// ========== Function for Add product ==========
const addProduct = async (req, res) => {
    try {
        
        const { name, description, price, category, subCategory, sizes, bestSeller } = req.body

        const image1 = req.files.image1 && req.files.image1[0]
        const image2 = req.files.image2 && req.files.image2[0]
        const image3 = req.files.image3 && req.files.image3[0]
        const image4 = req.files.image4 && req.files.image4[0]

        const images = [image1, image2, image3, image4].filter((item)=>item !== undefined)

        let imagesUrl = await Promise.all(
            images.map(async(item)=>{
                let result = await cloudinary.uploader.upload(item.path, {resource_type: "image"})
                return result.secure_url
            })
        )

        const productData = { 
            name,
            description,
            price: Number(price),
            category,
            subCategory,
            bestSeller: bestSeller === "true" ? true : false,
            sizes: JSON.parse(sizes),
            images: imagesUrl,
            date: Date.now()
        }

        const product = new productModel(productData)
        await product.save()
    
        console.log(product)

        res.json({success: true, message: "Product Added!"})
    } catch (error) {
        console.log(error)
        res.json({success: false, message: error.message})
    }
}

// ========== Function for List product ==========
const listProduct = async (req, res) => {


    
}

// ========== Function for Remove product ==========
const removeProduct = async (req, res) => {


    
}

// ========== Function for Single product info ==========
const singleProduct = async (req, res) => {


    
}

export { addProduct, listProduct, removeProduct, singleProduct }