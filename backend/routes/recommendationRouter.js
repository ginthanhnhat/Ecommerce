import express from 'express'
import {
  getRelatedProducts,      // CBF
  getUserBasedProducts,    // uuCF
  getItemBasedProducts,    // iiCF
  getMatrixFactorProducts, // MFCF
  getNeumfProducts         // NeuMF
} from '../controller/recommendationController.js'

const recommendationRouter = express.Router()

recommendationRouter.post('/cbf', getRelatedProducts)             // Content-Based Filtering
recommendationRouter.post('/uuCF', getUserBasedProducts)          // User-User CF
recommendationRouter.post('/iiCF', getItemBasedProducts)          // Item-Item CF
recommendationRouter.post('/mfcf', getMatrixFactorProducts)       // Matrix Factorization
recommendationRouter.post('/neumf', getNeumfProducts)             // Neural CF (NeuMF)

export default recommendationRouter
