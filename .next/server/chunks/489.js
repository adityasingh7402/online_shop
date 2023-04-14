"use strict";
exports.id = 489;
exports.ids = [489];
exports.modules = {

/***/ 3488:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1185);
/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(mongoose__WEBPACK_IMPORTED_MODULE_0__);

const connectDb = (handler)=>async (req, res)=>{
        if ((mongoose__WEBPACK_IMPORTED_MODULE_0___default().connections[0].readyState)) {
            return handler(req, res);
        }
        await mongoose__WEBPACK_IMPORTED_MODULE_0___default().connect(process.env.MONGO_URI);
        return handler(req, res);
    }
;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (connectDb);


/***/ }),

/***/ 8679:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const mongoose = __webpack_require__(1185);
const OrderSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    orderId: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    pincode: {
        type: String,
        required: true
    },
    paymentInfo: {
        type: String,
        default: ""
    },
    products: {
        type: Object,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    transactionId: {
        type: String,
        default: ""
    },
    landmark: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    amount: {
        type: String,
        required: true
    },
    status: {
        type: String,
        default: "Initiated",
        required: true
    }
}, {
    timestamps: true
});
// mongoose.models = {}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (mongoose.models.Order || mongoose.model("Order", OrderSchema));


/***/ })

};
;