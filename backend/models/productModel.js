import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    main_category: { type: String, required: true }, 
    title: { type: String, required: true }, 
    average_rating: { type: Number, default: 0 }, 
    rating_number: { type: Number, default: 0 },  
    features: { type: [String], default: [] }, 
    description: { type: [String], default: [] }, 
    price: { type: Number, default: 0 }, 
    images: { 
        type: [{
            thumb: String,
            large: String,
            variant: String,
            hi_res: String
        }], 
        default: [] 
    },  
    videos: { type: [String], default: [] },  
    store: { type: String, required: true }, 
    categories: { type: [String], default: [] },
    details: { 
        type: Map,
        of: mongoose.Schema.Types.Mixed,
        default: {} },  
    parent_asin: { type: String, required: true },  
    bought_together: { type: [String], default: null }, 

}, { timestamps: true }); 

const productModel = mongoose.models.Product || mongoose.model("product", productSchema);

export default productModel;
