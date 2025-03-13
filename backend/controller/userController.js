import userModel from "../models/userModel.js"
import validator from "validator"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

const createToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET)
}

// Route for user login
const loginUser = async (req, res) => { 
    try {
        
        const { email, password } = req.body

        const user = await userModel.findOne({email})
        console.log("User found:", user);


        if(!user) {
            return res.json({success: false, message:"User doesn't exits!"})
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if(isMatch) {

            const token = createToken(user._id)
            res.json({success: true, token})

        } else {
            res.json({success: false, message: "Invalid credentials!"})
        }


    } catch (error) {
        console.log(error)
        res.json({success: false, message: error.message})
    }
}

// Route for user register
const registerUser = async (req, res) => {

    try {

        const { name, email, password } = req.body
        
        // Checking user already exists or not
        const exists = await userModel.findOne({email})
        if(exists) {
            return res.json({success: false, message: "User already exists!"})
        }

        // Validating email format & strong password
        if(!validator.isEmail(email)) {
            return res.json({success: false, message: "Please enter a valid email!"})
        }

        if(password.length < 8) {
            return res.json({success: false, message: "Please enter a strong password!"})
        }

        // hashing user password
        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(password, salt)
        
        const newUser = new userModel({
            name,
            email,
            password: hashPassword
        })

        const user = await newUser.save()

        const token = createToken(user._id)

        res.json({success: true, token})

    } catch (error) {
        console.log(error)
        res.json({success: false, message: error.message})
    }
}

// Route for admin login
const adminLogin = async (req, res) => {
    try {

        const { email, password } = req.body

        if(email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
            const token = jwt.sign(email+password, process.env.JWT_SECRET)
            res.json({success: true, token})
        } else {
            res.json({success: false, message: "Invalid credentials!"})
        }
        
    } catch (error) {
        console.log(error)
        res.json({success: false, message: error.message})
    }
}

// Get user profile
const getUserProfile = async (req, res) => {
    try {
        
        const decoded = jwt.verify(req.headers.token, process.env.JWT_SECRET)

        const _id = decoded.id

        const user = await userModel.findById(_id)

        if (!user) {
            return res.json({ success: false, message: "User not found!" });
        }

        res.json({ success: true, user });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// Update user profile
const updateUserProfile = async (req, res) => {
    try {

        const decoded = jwt.verify(req.headers.token, process.env.JWT_SECRET)

        const _id = decoded.id

        const updatedUser = req.body;

        await userModel.findByIdAndUpdate(_id, updatedUser, { new: true });

        res.json({ success: true, message: "Profile updated!", updatedUser});

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

export { loginUser, registerUser, adminLogin, getUserProfile, updateUserProfile }