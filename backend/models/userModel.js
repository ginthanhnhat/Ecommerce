import mongoose from "mongoose";
// import randomUserId from "../utils/randomUserId"

const userSchema = new mongoose.Schema({
    // userId: { type: String, unique: true, default: () => randomUserId() },
    customUserId: { type: String, default: "" },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    cartData: { type: Object, default: {} }
}, { minimize: false })

const userModel = mongoose.models.user || mongoose.model("user", userSchema)

export default userModel;
