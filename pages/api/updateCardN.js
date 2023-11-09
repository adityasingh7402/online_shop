import { modelNames } from "mongoose"
import randomCard from "../../modal/randomCard"
import connectDb from "../../middleware/mongoose"
const handler = async (req, res) => {
    if (req.method == "POST") {
        let dbrandomCard = await randomCard.findOneAndUpdate(
            {
                card1: req.body.first_no,
                card2: req.body.cardno,
                card3: req.body.third_no,
            }
        )
        res.status(200).json({ success: true })
    }
    else {
        res.status(500).json({ error: "error" })
    }
}
export default connectDb(handler);