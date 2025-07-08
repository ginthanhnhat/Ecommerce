import express from 'express'
import adminAuth from '../middleware/adminAuth.js'
import { dashboardData } from '../controller/adminController.js'

const adminRoute = express.Router()

adminRoute.get('/dashboard', dashboardData)

export default adminRoute