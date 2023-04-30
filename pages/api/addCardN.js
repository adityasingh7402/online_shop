import { modelNames } from "mongoose"
import randomCard from "../../modal/randomCard"
import connectDb from "../../middleware/mongoose"

const handler = async (req, res) => {
    if (req.method == 'POST') {
        let p = new randomCard({
            card1: req.body.card1,
            card2: req.body.card2,
            card3: req.body.card3,
        })
        await p.save()
        res.status(200).json({ success: "success" })
    }
    else {
        res.status(400).json({ error: "This method is not allowed" })
    }
}
export default connectDb(handler);