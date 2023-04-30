import connectDb from "../../middleware/mongoose"
import Withdrawal from "../../modal/Withdrawal"

const handler = async (req, res) => {
    let wallet = req.body.wallet
    let amount = req.body.amount
    if (wallet < amount) {
        res.status(400).json({ error: "Insufficient Coin Please add some" })
    }
    else {
        if (req.method == 'POST') {
            let p = new Withdrawal({
                orderId: req.body.oid,
                name: req.body.name,
                email: req.body.email,
                phone: req.body.phone,
                amount: req.body.amount,
                pan_no: req.body.pan_no,
                ifsc: req.body.ifsc,
                accno: req.body.accno
            })
            await p.save()
            res.status(200).json({ success: "Withdrawal successfull" })
        }
        else {
            res.status(400).json({ error: "Withdrawal failed" })
        }
    }
}
export default connectDb(handler);