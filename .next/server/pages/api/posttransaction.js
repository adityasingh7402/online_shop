"use strict";
(() => {
var exports = {};
exports.id = 890;
exports.ids = [890];
exports.modules = {

/***/ 1185:
/***/ ((module) => {

module.exports = require("mongoose");

/***/ }),

/***/ 5086:
/***/ ((module) => {

module.exports = require("paytmchecksum");

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

/***/ 2420:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _middleware_mongoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3488);
/* harmony import */ var _modal_Order__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(8679);
/* harmony import */ var _modal_Product__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(2867);
/* harmony import */ var paytmchecksum__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(5086);
/* harmony import */ var paytmchecksum__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(paytmchecksum__WEBPACK_IMPORTED_MODULE_3__);




const handler = async (req, res)=>{
    let order;
    var paytmChecksum = "";
    var paytmParams = {};
    const received_data = req.body;
    for(var key in received_data){
        if (key == "CHECKSUMHASH") {
            paytmChecksum = received_data[key];
        } else {
            paytmParams[key] = received_data[key];
        }
    }
    var isValidChecksum = paytmchecksum__WEBPACK_IMPORTED_MODULE_3___default().verifySignature(paytmParams, process.env.PAYTM_MKEY, paytmChecksum);
    if (!isValidChecksum) {
        res.status(500).send("Some Error Occurred");
        return;
    }
    if (req.body.STATUS == "TXN_SUCCESS") {
        order = await _modal_Order__WEBPACK_IMPORTED_MODULE_1__/* ["default"].findOneAndUpdate */ .Z.findOneAndUpdate({
            orderId: req.body.ORDERID
        }, {
            status: "Paid",
            paymentInfo: JSON.stringify(req.body),
            transactionId: req.body.TXNID
        });
        let products = order.products;
        for(let slug in products){
            await _modal_Product__WEBPACK_IMPORTED_MODULE_2__/* ["default"].findOneAndUpdate */ .Z.findOneAndUpdate({
                slug: slug
            }, {
                $inc: {
                    "availableQty": -products[slug].qty
                }
            });
        }
    } else if (req.body.STATUS == "PENDING") {
        order = await _modal_Order__WEBPACK_IMPORTED_MODULE_1__/* ["default"].findOneAndUpdate */ .Z.findOneAndUpdate({
            orderId: req.body.ORDERID
        }, {
            status: "Pending",
            paymentInfo: JSON.stringify(req.body),
            transactionId: req.body.TXNID
        });
    }
    res.redirect("/order?clearCart=1&id=" + order._id, 200);
// res.status(200).json({ body: req.body })
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,_middleware_mongoose__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .Z)(handler)); // export default function handler(req, res) {
 //     res.status(200).json([110001, 110002, 110003, 110004, 110005, 110006, 110007, 110008, 110009, 110010, 110011, 110012, 110013])
 // }


/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [489], () => (__webpack_exec__(2420)));
module.exports = __webpack_exports__;

})();