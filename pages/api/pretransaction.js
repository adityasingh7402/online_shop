const https = require('https');
const PaytmChecksum = require('paytmchecksum');
import connectDb from "../../middleware/mongoose"
import Product from "../../modal/Product";
import Order from "../../modal/Order"
import pincodes from "../../pincodes.json"

const handler = async (req, res) => {
    if (req.method == 'POST') {
        
        if(!Object.keys(pincodes).includes(req.body.pincode)){
            res.status(200).json({ success: false, "error": "Sorry..! delivery is not available in your area", cardClear: false })
            return
        }

        let product, sumTotal = 0;
        let cart = req.body.cart;
        if (req.body.subTotal <= 0) {
            res.status(200).json({ success: false, "error": "Your cart is Empty...! Please add some", cardClear: false })
            return
        }
        for (let item in cart) {
            sumTotal += cart[item].price * cart[item].qty
            product = await Product.findOne({ slug: item })
            if (product.availableQty < cart[item].qty) {
                res.status(200).json({ success: false, "error": "Some item in your cart went out of stock. Please try again..!", cardClear: true })
            }
            if (product.price !== cart[item].price) {
                res.status(200).json({ success: false, "error": "Something is wrong with product please try again", cardClear: true })
                return
            }
        }
        if (sumTotal !== req.body.subTotal) {
            res.status(200).json({ success: false, "error": "Something is wrong with product please try again", cardClear: true })
            return
        }


        let order = new Order({
            email: req.body.email,
            orderId: req.body.oid,
            name: req.body.name,
            phone: req.body.phone,
            pincode: req.body.pincode,
            address: req.body.address,
            state: req.body.state,
            city: req.body.city,
            landmark: req.body.landmark,
            amount: req.body.subTotal,
            products: req.body.cart
        })
        await order.save()
        var paytmParams = {};

        paytmParams.body = {
            "requestType": "Payment",
            "mid": process.env.NEXT_PUBLIC_PAYTM_MID,
            "websiteName": "YOUR_WEBSITE_NAME",
            "orderId": req.body.oid,
            "callbackUrl": `${process.env.NEXT_PUBLIC_HOST}/api/posttransaction`,
            "txnAmount": {
                "value": req.body.amount,
                "currency": "INR",
            },
            "userInfo": {
                "custId": req.body.email,
            },
        };

        const checksum = await PaytmChecksum.generateSignature(JSON.stringify(paytmParams.body), process.env.PAYTM_MKEY)

        paytmParams.head = {
            "signature": checksum
        };

        var post_data = JSON.stringify(paytmParams);

        const requestAsync = () => {
            return new Promise((resolve, reject) => {
                var options = {

                    /* for Staging */
                    hostname: 'securegw-stage.paytm.in',

                    /* for Production */
                    // hostname: 'securegw.paytm.in',

                    port: 443,
                    path: `/theia/api/v1/initiateTransaction?mid=${process.env.NEXT_PUBLIC_PAYTM_MID}&orderId=${req.body.oid}`,
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Content-Length': post_data.length
                    }
                };

                var response = "";
                var post_req = https.request(options, function (post_res) {
                    post_res.on('data', function (chunk) {
                        response += chunk;
                    });

                    post_res.on('end', function () {
                        // console.log('Response: ', response);
                        let ress = JSON.parse(response).body
                        ress.success = true
                        ress.cardClear = false
                        resolve(ress)
                    });
                });

                post_req.write(post_data);
                post_req.end();
            })
        }

        let myr = await requestAsync()
        res.status(200).json(myr)
    }
}
export default connectDb(handler);