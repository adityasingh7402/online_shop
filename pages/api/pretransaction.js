const https = require('https');
const PaytmChecksum = require('paytmchecksum');
import connectDb from "../../middleware/mongoose"
import Order from "../../modal/Order"
import pincodes from "../../pincodes.json"

const handler = async (req, res) => {
    let wallet = req.body.wallet
    let amount = req.body.amount
    if (wallet < amount) {
        res.status(400).json({ error: "Insufficient Coin Please add some" })
    }
    else {
        if (req.method == 'POST') {
            let p = new Order({
                email: req.body.email,
                orderId: req.body.oid,
                name: req.body.name,
                phone: req.body.phone,
                randomNum: req.body.randomNum,
                cardno: req.body.cardno,
                cardDetails: req.body.cart,
                amount: req.body.amount,
            })
            await p.save()
            res.status(200).json({ success: "Bet success" })
        }
        else {
            res.status(400).json({ error: "Bet failed" })
        }
    }
}
export default connectDb(handler);