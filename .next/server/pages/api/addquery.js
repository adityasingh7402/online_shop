"use strict";
(() => {
var exports = {};
exports.id = 433;
exports.ids = [433];
exports.modules = {

/***/ 1185:
/***/ ((module) => {

module.exports = require("mongoose");

/***/ }),

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

/***/ 3000:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ addquery)
});

// EXTERNAL MODULE: external "mongoose"
var external_mongoose_ = __webpack_require__(1185);
;// CONCATENATED MODULE: ./modal/Query.js
const mongoose = __webpack_require__(1185);
const QuerySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});
// mongoose.models = {}
/* harmony default export */ const Query = (mongoose.models.Query || mongoose.model("Query", QuerySchema));

// EXTERNAL MODULE: ./middleware/mongoose.js
var middleware_mongoose = __webpack_require__(3488);
;// CONCATENATED MODULE: ./pages/api/addquery.js



const handler = async (req, res)=>{
    if (req.method == "POST") {
        let p = new Query({
            name: req.body.name,
            email: req.body.email,
            message: req.body.message
        });
        await p.save();
        res.status(200).json({
            success: "success"
        });
    } else {
        res.status(400).json({
            error: "This method is not allowed"
        });
    }
};
/* harmony default export */ const addquery = ((0,middleware_mongoose/* default */.Z)(handler));


/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__(3000));
module.exports = __webpack_exports__;

})();