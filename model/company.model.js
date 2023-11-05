import mongoose from "mongoose"
const {Schema} = mongoose
const companySchema = new Schema({
    companyName: {type:String, required:[true,"company name required"]},
    founder: {type: String, required:[true,"Founder required"]},
    gst: String,
    createdAt: {type: Date, default: Date.now}
})

mongoose.models = {}
const Company = mongoose.model("Company",companySchema)

export default Company
