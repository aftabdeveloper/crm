import mongoose from "mongoose"
import bcrypt from "bcrypt"
import Company from "./company.model"
const{Schema} = mongoose

const userSchema = new Schema({
    company: {type: Schema.Types.ObjectId, ref:"Company"},
    email: {type: String, required: true},
    mobile: {type: String, required: true},
    password: {type: String, required: true},
    createdAt: {type: Date, default: Date.now}
})

userSchema.pre("save", async function(next){
    const encrypted = await bcrypt.hash(this.password.toString(),12)
    this.password = encrypted
    next()
})

mongoose.models = {}
const User = mongoose.model("User",userSchema)

export default User