import connectDb from "../../middleware/mongoose"
import Order from "../../modal/Order"
import Product from "../../modal/Product";
import PaytmChecksum from "paytmchecksum";


const handler = async (req, res) => {
  let order;

  var paytmChecksum = "";
  var paytmParams = {};
  const received_data = req.body
  for (var key in received_data) {
    if (key == "CHECKSUMHASH") {
      paytmChecksum = received_data[key];
    } else {
      paytmParams[key] = received_data[key];
    }
  }
  var isValidChecksum = PaytmChecksum.verifySignature(paytmParams, process.env.PAYTM_MKEY, paytmChecksum);
  if (!isValidChecksum) {
    res.status(500).send("Some Error Occurred")
    return
  }

  if (req.body.STATUS == 'TXN_SUCCESS') {
    order = await Order.findOneAndUpdate({ orderId: req.body.ORDERID }, {
      status:
        'Paid', paymentInfo: JSON.stringify(req.body), transactionId: req.body.TXNID
    })
    let products = order.products
    for (let slug in products) {
      await Product.findOneAndUpdate({ slug: slug }, { $inc: { "availableQty": - products[slug].qty } })
    }
  }
  else if (req.body.STATUS == 'PENDING') {
    order = await Order.findOneAndUpdate({ orderId: req.body.ORDERID }, {
      status:
        'Pending', paymentInfo: JSON.stringify(req.body), transactionId: req.body.TXNID
    })
  }

  res.redirect('/order?clearCart=1&id=' + order._id, 200)
  // res.status(200).json({ body: req.body })
}

export default connectDb(handler);
// export default function handler(req, res) {
//     res.status(200).json([110001, 110002, 110003, 110004, 110005, 110006, 110007, 110008, 110009, 110010, 110011, 110012, 110013])
// }