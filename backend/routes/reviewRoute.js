import express from 'express'
import { getRatingNumber, getReview } from '../controller/reviewController.js'

const reviewRouter = express.Router()

reviewRouter.post('/list', getReview)
reviewRouter.post('/rating', getRatingNumber)

export default reviewRouter