"use strict";
(() => {
var exports = {};
exports.id = 513;
exports.ids = [513];
exports.modules = {

/***/ 9344:
/***/ ((module) => {

module.exports = require("jsonwebtoken");

/***/ }),

/***/ 1185:
/***/ ((module) => {

module.exports = require("mongoose");

/***/ }),

/***/ 7266:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _middleware_mongoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3488);
/* harmony import */ var _modal_Order__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(8679);
/* harmony import */ var jsonwebtoken__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(9344);
/* harmony import */ var jsonwebtoken__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(jsonwebtoken__WEBPACK_IMPORTED_MODULE_2__);



const handler = async (req, res)=>{
    const token = req.body.token;
    const data = jsonwebtoken__WEBPACK_IMPORTED_MODULE_2___default().verify(token, process.env.JWD_SECRET);
    let orders = await _modal_Order__WEBPACK_IMPORTED_MODULE_1__/* ["default"].find */ .Z.find({
        email: data.email,
        status: "Paid"
    });
    res.status(200).json({
        orders
    });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,_middleware_mongoose__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .Z)(handler));


/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [489], () => (__webpack_exec__(7266)));
module.exports = __webpack_exports__;

})();