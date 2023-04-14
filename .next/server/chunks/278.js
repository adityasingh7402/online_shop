"use strict";
exports.id = 278;
exports.ids = [278];
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

/***/ 7047:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const mongoose = __webpack_require__(1185);
const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: Number,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    wallet: {
        type: Number,
        default: 0
    },
    ifsc: {
        type: String,
        default: ""
    },
    pan_no: {
        type: String,
        default: ""
    },
    accno: {
        type: Number,
        default: ""
    }
}, {
    timestamps: true
});
// mongoose.models = {}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (mongoose.models.User || mongoose.model("User", UserSchema));


/***/ })

};
;