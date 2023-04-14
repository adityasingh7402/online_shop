"use strict";
(() => {
var exports = {};
exports.id = 330;
exports.ids = [330];
exports.modules = {

/***/ 5666:
/***/ ((module) => {

module.exports = require("crypto-js");

/***/ }),

/***/ 9344:
/***/ ((module) => {

module.exports = require("jsonwebtoken");

/***/ }),

/***/ 1185:
/***/ ((module) => {

module.exports = require("mongoose");

/***/ }),

/***/ 3302:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1185);
/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(mongoose__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _modal_User__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(7047);
/* harmony import */ var _middleware_mongoose__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(3488);
/* harmony import */ var jsonwebtoken__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(9344);
/* harmony import */ var jsonwebtoken__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(jsonwebtoken__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var crypto_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(5666);
/* harmony import */ var crypto_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(crypto_js__WEBPACK_IMPORTED_MODULE_4__);





const handler = async (req, res)=>{
    if (req.method == "POST") {
        let token = req.body.token;
        let user = jsonwebtoken__WEBPACK_IMPORTED_MODULE_3___default().verify(token, process.env.JWD_SECRET);
        let dbuser = await _modal_User__WEBPACK_IMPORTED_MODULE_1__/* ["default"].findOne */ .Z.findOne({
            email: user.email
        });
        const bytes = crypto_js__WEBPACK_IMPORTED_MODULE_4___default().AES.decrypt(dbuser.password, process.env.AES_SECRET);
        let decryptedPass = bytes.toString((crypto_js__WEBPACK_IMPORTED_MODULE_4___default().enc.Utf8));
        if (decryptedPass == req.body.currentPass && req.body.newPass == req.body.ReEnter) {
            let dbuser = await _modal_User__WEBPACK_IMPORTED_MODULE_1__/* ["default"].findOneAndUpdate */ .Z.findOneAndUpdate({
                email: user.email
            }, {
                password: crypto_js__WEBPACK_IMPORTED_MODULE_4___default().AES.encrypt(req.body.ReEnter, process.env.AES_SECRET).toString()
            });
            res.status(200).json({
                success: true
            });
            return;
        }
        res.status(200).json({
            success: false
        });
    } else {
        res.status(500).json({
            error: "error"
        });
    }
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,_middleware_mongoose__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .Z)(handler));


/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [278], () => (__webpack_exec__(3302)));
module.exports = __webpack_exports__;

})();