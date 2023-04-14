"use strict";
(() => {
var exports = {};
exports.id = 994;
exports.ids = [994];
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

/***/ 8420:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _middleware_mongoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3488);
/* harmony import */ var _modal_User__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(7047);


var CryptoJS = __webpack_require__(5666);
var jwt = __webpack_require__(9344);
const handler = async (req, res)=>{
    if (req.method == "POST") {
        let user = await _modal_User__WEBPACK_IMPORTED_MODULE_1__/* ["default"].findOne */ .Z.findOne({
            "email": req.body.email
        });
        if (user === null) {
            res.status(200).json({
                success: false,
                error: "No user found"
            });
        } else {
            const bytes = CryptoJS.AES.decrypt(user.password, process.env.AES_SECRET);
            let decryptedPass = bytes.toString(CryptoJS.enc.Utf8);
            if (user) {
                if (req.body.email == user.email && req.body.password == decryptedPass) {
                    var token = jwt.sign({
                        email: user.email,
                        name: user.name,
                        phone: user.phone
                    }, process.env.JWD_SECRET, {
                    });
                    res.status(200).json({
                        success: true,
                        token,
                        email: user.email,
                        name: user.name
                    });
                } else {
                    res.status(200).json({
                        success: false,
                        error: "Invalid Credetials"
                    });
                }
            }
        }
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
var __webpack_exports__ = __webpack_require__.X(0, [278], () => (__webpack_exec__(8420)));
module.exports = __webpack_exports__;

})();