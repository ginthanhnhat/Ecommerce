import userModel from "../models/userModel.js"


// Add products to user card
const addToCart = async (req, res) => {
    try {
        
        const { userId, itemId } = req.body

        const userData = await userModel.findById(userId)
        let cartData = await userData.cartData

        if(cartData[itemId]) {
            cartData[itemId] += 1
        } else {
            cartData[itemId] = 1
        }

        await userModel.findByIdAndUpdate(userId, {cartData})

        res.json({success: true, message: "Added To Cart!"})

    } catch (error) {
        console.log(error)
        res.json({success: false, message: error.message})
    }
}

// Update user cart
const updateCart = async (req, res) => {
    try {
        
        const { userId, itemId, quantity } = req.body

        const userData = await userModel.findById(userId)
        let cartData = await userData.cartData

        

        if (cartData[itemId] === 0) {
            delete cartData[itemId]
        }
    
        if (quantity === 0) {
            delete cartData[itemId]

            if (Object.keys(cartData[itemId]).length === 0) {
                delete cartData[itemId];
            }
        } else {
            cartData[itemId] = quantity
        }

        await userModel.findByIdAndUpdate(userId, {cartData})

        res.json({success: true, message: "cart Updated!"})

    } catch (error) {
        console.log(error)
        res.json({success: false, message: error.message})
    }
}

// Get user cart data
const getUserCart = async (req, res) => {
    try {
        
        const { userId } = req.body

        const userData = await userModel.findById(userId)
        let cartData = await userData.cartData

        res.json({success: true, cartData})

    } catch (error) {
        console.log(error)
        res.json({success: false, message: error.message})
    }
}

export { addToCart, updateCart, getUserCart }