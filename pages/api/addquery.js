import { modelNames } from "mongoose"
import Query from "../../modal/Query"
import connectDb from "../../middleware/mongoose"

const handler = async (req, res) => {
    if (req.method == 'POST') {
        let p = new Query({
            name: req.body.name,
            email: req.body.email,
            message: req.body.message,
        })
        await p.save()
        res.status(200).json({ success: "success" })
    }
    else {
        res.status(400).json({ error: "This method is not allowed" })
    }
}
export default connectDb(handler);