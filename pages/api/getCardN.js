import { modelNames } from "mongoose"
import RandomNSchema from "../../modal/randomCard"
import connectDb from "../../middleware/mongoose"

const handler = async (req, res)=>{
    let products = await RandomNSchema.find()
    res.status(200).json({ products })
}
export default connectDb(handler);