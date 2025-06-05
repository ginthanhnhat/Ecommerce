import axios from 'axios'
import productModel from "../models/productModel.js"

const recommendUrl = process.env.RECOMMENDATION_URL;

// Content-Based Filtering --- YouMightAlsoLike
export const getContentBasedProducts = async (req, res) => {
  try {
    const { user_id, category, top_k } = req.body;

    const topK = parseInt(top_k);
    const safeTopK = isNaN(topK) ? 5 : topK;

    // ✅ Call FastAPI
    const response = await axios.post(`${recommendUrl}/api/recommend/cbf`, {
      user_id,
      category,
      top_k: safeTopK
    });

    const parentAsins = response.data;

    if (!Array.isArray(parentAsins) || parentAsins.length === 0) {
      return res.status(404).json({ success: false, message: "No Recommendation Products!" });
    }

    // Find parent_asin in MongoDB
    const products = await productModel.find({ parent_asin: { $in: parentAsins } });

    return res.status(200).json({ success: true, products });

  } catch (error) {
    console.error(error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

// CustomersAlsoLiked
export const getUserBasedProducts = async (req, res) => {
  try {
    const { user_id, item_id, category, top_k } = req.body;

    const topK = parseInt(top_k);
    const safeTopK = isNaN(topK) ? 5 : topK;

    // ✅ Call FastAPI
    const response = await axios.post(`${recommendUrl}/api/recommend/uucf`, {
      user_id,
      item_id,
      category,
      top_k: safeTopK
    });

    const parentAsins = response.data;

    if (!Array.isArray(parentAsins) || parentAsins.length === 0) {
      return res.status(404).json({ success: false, message: "No Recommendation Products!" });
    }

    // Find parent_asin in MongoDB
    const products = await productModel.find({ parent_asin: { $in: parentAsins } });

    return res.status(200).json({ success: true, products });
    
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ success: false, message: error.message });
  }
} 

// RelatedProducts
export const getItemBasedProducts = async (req, res) => {
  try {

    const { user_id, item_id, category, top_k } = req.body;

    const topK = parseInt(top_k);
    const safeTopK = isNaN(topK) ? 5 : topK;

    // ✅ Call FastAPI
    const response = await axios.post(`${recommendUrl}/api/recommend/iicf`, {
      user_id,
      item_id,
      category,
      top_k: safeTopK
    });

    const parentAsins = response.data;

    if (!Array.isArray(parentAsins) || parentAsins.length === 0) {
      return res.status(404).json({ success: false, message: "No Recommendation Products!" });
    }

    // Find parent_asin in MongoDB
    const products = await productModel.find({ parent_asin: { $in: parentAsins } });

    return res.status(200).json({ success: true, products });
    
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ success: false, message: error.message });
  }
} 

// UUCF + IICF
export const getNBCFProducts = async (req, res) => {
  try {
    const { user_id, item_id, category, top_k } = req.body;

    const topK = parseInt(top_k);
    const safeTopK = isNaN(topK) ? 5 : topK;

    // ✅ Call FastAPI
    const response = await axios.post(`${recommendUrl}/api/recommend/nbcf`, {
      user_id,
      item_id,
      category,
      top_k: safeTopK
    });

    const parentAsins = response.data;

    if (!Array.isArray(parentAsins) || parentAsins.length === 0) {
      return res.status(404).json({ success: false, message: "No Recommendation Products!" });
    }

    // Find parent_asin in MongoDB
    const products = await productModel.find({ parent_asin: { $in: parentAsins } });

    return res.status(200).json({ success: true, products });
    
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ success: false, message: error.message });
  }
}

// TopPicksForYou
export const getMatrixFactorProducts = async (req, res) => {
  try {
    const { user_id, item_id, category, top_k } = req.body;

    const topK = parseInt(top_k);
    const safeTopK = isNaN(topK) ? 5 : topK;

    // ✅ Call FastAPI
    const response = await axios.post(`${recommendUrl}/api/recommend/mfcf`, {
      user_id,
      item_id,
      category,
      top_k: safeTopK
    });

    const parentAsins = response.data;

    if (!Array.isArray(parentAsins) || parentAsins.length === 0) {
      return res.status(404).json({ success: false, message: "No Recommendation Products!" });
    }

    // Find parent_asin in MongoDB
    const products = await productModel.find({ parent_asin: { $in: parentAsins } });

    return res.status(200).json({ success: true, products });
    
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ success: false, message: error.message });
  }
} 

// RecommendedForYou
export const getNeumfProducts = async (req, res) => {
  try {
    const { user_id, category, top_k } = req.body;

    const topK = parseInt(top_k);
    const safeTopK = isNaN(topK) ? 5 : topK;

    // ✅ Call FastAPI
    const response = await axios.post(`${recommendUrl}/api/recommend/neumf`, {
      user_id,
      category,
      top_k: safeTopK
    });

    const parentAsins = response.data;

    if (!Array.isArray(parentAsins) || parentAsins.length === 0) {
      return res.status(404).json({ success: false, message: "No Recommendation Products!" });
    }

    // Find parent_asin in MongoDB
    const products = await productModel.find({ parent_asin: { $in: parentAsins } });

    return res.status(200).json({ success: true, products });
    
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ success: false, message: error.message });
  }
} 

// PersonalizedRecommendations
export const getHybridProducts = async (req, res) => {
  try {
    const { user_id, item_id, category, top_k } = req.body;

    const topK = parseInt(top_k);
    const safeTopK = isNaN(topK) ? 5 : topK;

    // ✅ Call FastAPI
    const response = await axios.post(`${recommendUrl}/api/recommend/hybrid`, {
      user_id,
      item_id,
      category,
      top_k: safeTopK
    });

    const parentAsins = response.data;

    if (!Array.isArray(parentAsins) || parentAsins.length === 0) {
      return res.status(404).json({ success: false, message: "No Recommendation Products!" });
    }

    // Find parent_asin in MongoDB
    const products = await productModel.find({ parent_asin: { $in: parentAsins } });

    return res.status(200).json({ success: true, products });
    
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ success: false, message: error.message });
  }
}