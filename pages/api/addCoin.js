const https = require('https');
const PaytmChecksum = require('paytmchecksum');
import connectDb from "../../middleware/mongoose"
import Addcoin from "../../modal/Addcoin"

const handler = async (req, res) => {
    if (req.method == 'POST') {

        let order = new Addcoin({
            email: req.body.email,
            orderId: req.body.oid,
            name: req.body.name,
            phone: req.body.phone,
            amount: req.body.amount,
            transId: req.body.transId,

        })
        await order.save()
        // var paytmParams = {};

        // paytmParams.body = {
        //     "requestType": "Payment",
        //     "mid": process.env.NEXT_PUBLIC_PAYTM_MID,
        //     "websiteName": "YOUR_WEBSITE_NAME",
        //     "orderId": req.body.oid,
        //     "callbackUrl": `${process.env.NEXT_PUBLIC_HOST}/api/posttransaction`,
        //     "txnAmount": {
        //         "value": req.body.amount,
        //         "currency": "INR",
        //     },
        //     "userInfo": {
        //         "custId": req.body.email,
        //     },
        // };

        // const checksum = await PaytmChecksum.generateSignature(JSON.stringify(paytmParams.body), process.env.PAYTM_MKEY)

        // paytmParams.head = {
        //     "signature": checksum
        // };

        // var post_data = JSON.stringify(paytmParams);

        // const requestAsync = () => {
        //     return new Promise((resolve, reject) => {
        //         var options = {

        //             /* for Staging */
        //             hostname: 'securegw-stage.paytm.in',

        //             /* for Production */
        //             // hostname: 'securegw.paytm.in',

        //             port: 443,
        //             path: `/theia/api/v1/initiateTransaction?mid=${process.env.NEXT_PUBLIC_PAYTM_MID}&orderId=${req.body.oid}`,
        //             method: 'POST',
        //             headers: {
        //                 'Content-Type': 'application/json',
        //                 'Content-Length': post_data.length
        //             }
        //         };

        //         var response = "";
        //         var post_req = https.request(options, function (post_res) {
        //             post_res.on('data', function (chunk) {
        //                 response += chunk;
        //             });

        //             post_res.on('end', function () {
        //                 // console.log('Response: ', response);
        //                 let ress = JSON.parse(response).body
        //                 ress.success = true
        //                 ress.cardClear = false
        //                 resolve(ress)
        //             });
        //         });

        //         post_req.write(post_data);
        //         post_req.end();
        //     })
        // }

        // let myr = await requestAsync()
        // res.status(200).json(myr)
        res.status(200).json({ success: "success" })
    }
    else {
        res.status(400).json({ error: "This method is not allowed" })
    }
}
export default connectDb(handler);