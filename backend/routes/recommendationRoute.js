import express from 'express'
import {
  getContentBasedProducts,      
  getUserBasedProducts,    
  getItemBasedProducts,    
  getMatrixFactorProducts, 
  getNeumfProducts,
  getHybridProducts,         
} from '../controller/recommendationController.js'

const recommendationRouter = express.Router()

recommendationRouter.post('/cbf', getContentBasedProducts)    // Content-Based Filtering
recommendationRouter.post('/uucf', getUserBasedProducts)      // User-User CF
recommendationRouter.post('/iicf', getItemBasedProducts)      // Item-Item CF
recommendationRouter.post('/mfcf', getMatrixFactorProducts)   // Matrix Factorization
recommendationRouter.post('/neumf', getNeumfProducts)         // Neural CF (NeuMF)
recommendationRouter.post('/hybrid', getHybridProducts)       // Hybrid Recommender System

export default recommendationRouter
