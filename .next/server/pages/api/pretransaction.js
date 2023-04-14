"use strict";
(() => {
var exports = {};
exports.id = 829;
exports.ids = [829];
exports.modules = {

/***/ 1185:
/***/ ((module) => {

module.exports = require("mongoose");

/***/ }),

/***/ 5086:
/***/ ((module) => {

module.exports = require("paytmchecksum");

/***/ }),

/***/ 5687:
/***/ ((module) => {

module.exports = require("https");

/***/ }),

/***/ 2867:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const mongoose = __webpack_require__(1185);
const ProductSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    size: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        required: true,
        unique: true
    },
    desc: {
        type: String,
        required: true
    },
    img: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    availableQty: {
        type: Number,
        required: true
    }
}, {
    timestamps: true
});
// mongoose.models = {}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (mongoose.models.Product || mongoose.model("Product", ProductSchema));


/***/ }),

/***/ 8911:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ pretransaction)
});

// EXTERNAL MODULE: ./middleware/mongoose.js
var mongoose = __webpack_require__(3488);
// EXTERNAL MODULE: ./modal/Product.js
var Product = __webpack_require__(2867);
// EXTERNAL MODULE: ./modal/Order.js
var Order = __webpack_require__(8679);
;// CONCATENATED MODULE: ./pincodes.json
const pincodes_namespaceObject = JSON.parse('{"110001":["DELHI","NORTH"],"110002":["DELHI","NORTH WEST"],"110003":["DELHI","NORTH SOUTH"],"110004":["DELHI","NORTH EAST"],"110042":["DELHI","NORTH WEST"]}');
;// CONCATENATED MODULE: ./pages/api/pretransaction.js
const https = __webpack_require__(5687);
const PaytmChecksum = __webpack_require__(5086);




const handler = async (req, res)=>{
    if (req.method == "POST") {
        if (!Object.keys(pincodes_namespaceObject).includes(req.body.pincode)) {
            res.status(200).json({
                success: false,
                "error": "Sorry..! delivery is not available in your area",
                cardClear: false
            });
            return;
        }
        let product, sumTotal = 0;
        let cart = req.body.cart;
        if (req.body.subTotal <= 0) {
            res.status(200).json({
                success: false,
                "error": "Your cart is Empty...! Please add some",
                cardClear: false
            });
            return;
        }
        for(let item in cart){
            sumTotal += cart[item].price * cart[item].qty;
            product = await Product/* default.findOne */.Z.findOne({
                slug: item
            });
            if (product.availableQty < cart[item].qty) {
                res.status(200).json({
                    success: false,
                    "error": "Some item in your cart went out of stock. Please try again..!",
                    cardClear: true
                });
            }
            if (product.price !== cart[item].price) {
                res.status(200).json({
                    success: false,
                    "error": "Something is wrong with product please try again",
                    cardClear: true
                });
                return;
            }
        }
        if (sumTotal !== req.body.subTotal) {
            res.status(200).json({
                success: false,
                "error": "Something is wrong with product please try again",
                cardClear: true
            });
            return;
        }
        let order = new Order/* default */.Z({
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
        });
        await order.save();
        var paytmParams = {};
        paytmParams.body = {
            "requestType": "Payment",
            "mid": "TyTSqD27842606764263",
            "websiteName": "YOUR_WEBSITE_NAME",
            "orderId": req.body.oid,
            "callbackUrl": `${"http://localhost:3000"}/api/posttransaction`,
            "txnAmount": {
                "value": req.body.amount,
                "currency": "INR"
            },
            "userInfo": {
                "custId": req.body.email
            }
        };
        const checksum = await PaytmChecksum.generateSignature(JSON.stringify(paytmParams.body), process.env.PAYTM_MKEY);
        paytmParams.head = {
            "signature": checksum
        };
        var post_data = JSON.stringify(paytmParams);
        const requestAsync = ()=>{
            return new Promise((resolve, reject)=>{
                var options = {
                    /* for Staging */ hostname: "securegw-stage.paytm.in",
                    /* for Production */ // hostname: 'securegw.paytm.in',
                    port: 443,
                    path: `/theia/api/v1/initiateTransaction?mid=${"TyTSqD27842606764263"}&orderId=${req.body.oid}`,
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Content-Length": post_data.length
                    }
                };
                var response = "";
                var post_req = https.request(options, function(post_res) {
                    post_res.on("data", function(chunk) {
                        response += chunk;
                    });
                    post_res.on("end", function() {
                        // console.log('Response: ', response);
                        let ress = JSON.parse(response).body;
                        ress.success = true;
                        ress.cardClear = false;
                        resolve(ress);
                    });
                });
                post_req.write(post_data);
                post_req.end();
            });
        };
        let myr = await requestAsync();
        res.status(200).json(myr);
    }
};
/* harmony default export */ const pretransaction = ((0,mongoose/* default */.Z)(handler));


/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [489], () => (__webpack_exec__(8911)));
module.exports = __webpack_exports__;

})();