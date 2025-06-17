import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
    rating: { type: Number, required: true },
    title: { type: String, required: false },
    text: { type: String, required: false },
    images: { type: [String], default: [] },
    
    asin: { type: String, required: true },
    parent_asin: { type: String, required: false },

    user_id: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },

    helpful_vote: { type: Number, default: 0 },
    verified_purchase: { type: Boolean, default: false }
}, { timestamps: true });

const reviewModel = mongoose.models.review || mongoose.model("review", reviewSchema);

export default reviewModel;
