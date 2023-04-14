"use strict";
(() => {
var exports = {};
exports.id = 964;
exports.ids = [964,236];
exports.modules = {

/***/ 9922:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ Home),
  "getServerSideProps": () => (/* binding */ getServerSideProps)
});

// EXTERNAL MODULE: external "react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(997);
// EXTERNAL MODULE: external "next/head"
var head_ = __webpack_require__(968);
var head_default = /*#__PURE__*/__webpack_require__.n(head_);
// EXTERNAL MODULE: ./node_modules/next/image.js
var next_image = __webpack_require__(5675);
// EXTERNAL MODULE: ./node_modules/next/link.js
var next_link = __webpack_require__(1664);
var link_default = /*#__PURE__*/__webpack_require__.n(next_link);
;// CONCATENATED MODULE: external "react-icons/hi"
const hi_namespaceObject = require("react-icons/hi");
// EXTERNAL MODULE: external "react-icons/ri"
var ri_ = __webpack_require__(8098);
// EXTERNAL MODULE: ./pages/admin/order.js
var order = __webpack_require__(4556);
// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__(6689);
// EXTERNAL MODULE: ./modal/Order.js
var Order = __webpack_require__(6723);
// EXTERNAL MODULE: external "mongoose"
var external_mongoose_ = __webpack_require__(1185);
var external_mongoose_default = /*#__PURE__*/__webpack_require__.n(external_mongoose_);
// EXTERNAL MODULE: external "next/router"
var router_ = __webpack_require__(1853);
;// CONCATENATED MODULE: ./pages/admin/index.js













function Home({ Component , pageProps  }) {
    const router = (0,router_.useRouter)();
    (0,external_react_.useEffect)(()=>{
        const myuser = JSON.parse(localStorage.getItem("myuser"));
        if (myuser.email != "kingkong1738aj@gmail.com") {
            router.push("/");
        }
    }, []);
    const { 0: active , 1: setActive  } = (0,external_react_.useState)("orders");
    return /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
        children: [
            /*#__PURE__*/ (0,jsx_runtime_.jsxs)((head_default()), {
                children: [
                    /*#__PURE__*/ jsx_runtime_.jsx("title", {
                        children: "Fresh Frveg- Shop Online Fruits and vegetables"
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx("meta", {
                        name: "description",
                        content: "Shop fresh Fruits and vegetables online"
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx("link", {
                        rel: "icon",
                        href: "/favicon.ico"
                    })
                ]
            }),
            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                className: "my-8 px-5 w-full flex flex-row",
                children: [
                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                        className: " bg-green-800 w-56 border border-gray-200 rounded-sm py-8 px-5 shadow-sm h-min",
                        children: [
                            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("ul", {
                                className: "flex flex-col",
                                children: [
                                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)("li", {
                                        className: "text-xl pb-5 font-medium text-white flex items-center",
                                        children: [
                                            /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                                className: "text-2xl pr-5",
                                                children: /*#__PURE__*/ jsx_runtime_.jsx(hi_namespaceObject.HiChartPie, {})
                                            }),
                                            " Inventory"
                                        ]
                                    }),
                                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)("li", {
                                        onClick: ()=>setActive("Order")
                                        ,
                                        className: "text-base pb-5 font-medium cursor-pointer hover:text-green-200 text-white flex items-center",
                                        children: [
                                            /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                                className: "text-xl pr-5",
                                                children: /*#__PURE__*/ jsx_runtime_.jsx(ri_.RiSendPlane2Fill, {})
                                            }),
                                            " Order"
                                        ]
                                    }),
                                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)("li", {
                                        onClick: ()=>setActive("Products")
                                        ,
                                        className: "text-base pb-5 font-medium cursor-pointer hover:text-green-200 text-white flex items-center",
                                        children: [
                                            /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                                className: "text-xl pr-5",
                                                children: /*#__PURE__*/ jsx_runtime_.jsx(ri_.RiSendPlane2Fill, {})
                                            }),
                                            " Products"
                                        ]
                                    }),
                                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)("li", {
                                        onClick: ()=>setActive("Coupons")
                                        ,
                                        className: "text-base pb-5 font-medium cursor-pointer hover:text-green-200 text-white flex items-center",
                                        children: [
                                            /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                                className: "text-xl pr-5",
                                                children: /*#__PURE__*/ jsx_runtime_.jsx(ri_.RiSendPlane2Fill, {})
                                            }),
                                            " Coupons"
                                        ]
                                    })
                                ]
                            }),
                            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("ul", {
                                className: "flex flex-col mt-2",
                                children: [
                                    /*#__PURE__*/ jsx_runtime_.jsx("li", {
                                        onClick: ()=>setActive("Addproduct")
                                        ,
                                        className: "text-base pb-4 cursor-pointer hover:text-green-200 text-white flex items-center",
                                        children: /*#__PURE__*/ jsx_runtime_.jsx("button", {
                                            className: "px-5 py-2 border broder-white w-full rounded-full hover:bg-green-900",
                                            children: /*#__PURE__*/ jsx_runtime_.jsx("p", {
                                                children: "Add Product"
                                            })
                                        })
                                    }),
                                    /*#__PURE__*/ jsx_runtime_.jsx("li", {
                                        onClick: ()=>setActive("Updateproduct")
                                        ,
                                        className: "text-base pb-4 cursor-pointer hover:text-green-200 text-white flex items-center",
                                        children: /*#__PURE__*/ jsx_runtime_.jsx("button", {
                                            className: "px-5 py-2 border broder-white w-full rounded-full hover:bg-green-900",
                                            children: /*#__PURE__*/ jsx_runtime_.jsx("p", {
                                                children: "Update Product"
                                            })
                                        })
                                    }),
                                    /*#__PURE__*/ jsx_runtime_.jsx("li", {
                                        onClick: ()=>setActive("Addcoupon")
                                        ,
                                        className: "text-base pb-4 cursor-pointer hover:text-green-200 text-white flex items-center",
                                        children: /*#__PURE__*/ jsx_runtime_.jsx("button", {
                                            className: "px-5 py-2 border broder-white w-full rounded-full hover:bg-green-900",
                                            children: /*#__PURE__*/ jsx_runtime_.jsx("p", {
                                                children: "Add Coupons"
                                            })
                                        })
                                    }),
                                    /*#__PURE__*/ jsx_runtime_.jsx((link_default()), {
                                        href: "/admin/",
                                        children: /*#__PURE__*/ jsx_runtime_.jsx("li", {
                                            className: "text-base pb-4 cursor-pointer hover:text-green-200 text-white flex items-center",
                                            children: /*#__PURE__*/ jsx_runtime_.jsx("button", {
                                                className: "px-5 py-2 border broder-white w-full rounded-full hover:bg-green-900",
                                                children: /*#__PURE__*/ jsx_runtime_.jsx("p", {
                                                    children: "Logout"
                                                })
                                            })
                                        })
                                    })
                                ]
                            })
                        ]
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx("div", {
                        className: " bg-white w-5/6 text-sm text-gray-800 ml-5 border border-gray-200 rounded-sm py-3 px-2 shadow-sm"
                    })
                ]
            })
        ]
    });
};
async function getServerSideProps(context) {
    if (!(external_mongoose_default()).connections[0].readyState) {
        await external_mongoose_default().connect(process.env.MONGO_URI);
    }
    let orders = await Order/* default.find */.Z.find();
    return {
        props: {
            orders: JSON.parse(JSON.stringify(orders))
        }
    };
}


/***/ }),

/***/ 1185:
/***/ ((module) => {

module.exports = require("mongoose");

/***/ }),

/***/ 2796:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/head-manager-context.js");

/***/ }),

/***/ 4957:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/head.js");

/***/ }),

/***/ 4014:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/i18n/normalize-locale-path.js");

/***/ }),

/***/ 744:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/image-config-context.js");

/***/ }),

/***/ 5843:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/image-config.js");

/***/ }),

/***/ 8524:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/is-plain-object.js");

/***/ }),

/***/ 8020:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/mitt.js");

/***/ }),

/***/ 4406:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/page-path/denormalize-page-path.js");

/***/ }),

/***/ 4964:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router-context.js");

/***/ }),

/***/ 3938:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/format-url.js");

/***/ }),

/***/ 9565:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/get-asset-path-from-route.js");

/***/ }),

/***/ 4365:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/get-middleware-regex.js");

/***/ }),

/***/ 1428:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/is-dynamic.js");

/***/ }),

/***/ 1292:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/parse-relative-url.js");

/***/ }),

/***/ 979:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/querystring.js");

/***/ }),

/***/ 6052:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/resolve-rewrites.js");

/***/ }),

/***/ 4226:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/route-matcher.js");

/***/ }),

/***/ 5052:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/route-regex.js");

/***/ }),

/***/ 9232:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/utils.js");

/***/ }),

/***/ 968:
/***/ ((module) => {

module.exports = require("next/head");

/***/ }),

/***/ 1853:
/***/ ((module) => {

module.exports = require("next/router");

/***/ }),

/***/ 6689:
/***/ ((module) => {

module.exports = require("react");

/***/ }),

/***/ 8098:
/***/ ((module) => {

module.exports = require("react-icons/ri");

/***/ }),

/***/ 997:
/***/ ((module) => {

module.exports = require("react/jsx-runtime");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [505,664,675,556], () => (__webpack_exec__(9922)));
module.exports = __webpack_exports__;

})();