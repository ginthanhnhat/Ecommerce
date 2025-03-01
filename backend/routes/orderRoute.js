import express from 'express'
import { placeOrder, placeOrderStripe, placeOrderMomo, allOrders, userOrders, updateStatus, verifyStripe, verifyMomo } from '../controller/orderController.js'
import adminAuth from '../middleware/adminAuth.js'
import authUser from '../middleware/auth.js'

const orderRouter = express.Router()

// Admin Features
orderRouter.post('/list', adminAuth, allOrders)
orderRouter.post('/status', adminAuth, updateStatus)

// Payment Features
orderRouter.post('/place', authUser, placeOrder)
orderRouter.post('/stripe', authUser, placeOrderStripe)
orderRouter.post('/momo', authUser, placeOrderMomo)

// User Features
orderRouter.post('/userorders', authUser, userOrders)

// Verify Payment
orderRouter.post('/verifyStripe', authUser, verifyStripe)
orderRouter.post('/verifyMomo', authUser, verifyMomo)

export default orderRouter