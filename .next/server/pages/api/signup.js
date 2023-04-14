"use strict";
(() => {
var exports = {};
exports.id = 276;
exports.ids = [276];
exports.modules = {

/***/ 5666:
/***/ ((module) => {

module.exports = require("crypto-js");

/***/ }),

/***/ 1185:
/***/ ((module) => {

module.exports = require("mongoose");

/***/ }),

/***/ 165:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _middleware_mongoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3488);
/* harmony import */ var _modal_User__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(7047);


var CryptoJS = __webpack_require__(5666);
const handler = async (req, res)=>{
    if (req.method == "POST") {
        const { name , email , phone  } = req.body;
        let u = new _modal_User__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .Z({
            name,
            email,
            phone,
            password: CryptoJS.AES.encrypt(req.body.password, process.env.AES_SECRET).toString()
        });
        await u.save();
        res.status(200).json({
            success: "success"
        });
    } else {
        res.status(400).json({
            error: "This method is not allowed"
        });
    }
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,_middleware_mongoose__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .Z)(handler));


/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [278], () => (__webpack_exec__(165)));
module.exports = __webpack_exports__;

})();