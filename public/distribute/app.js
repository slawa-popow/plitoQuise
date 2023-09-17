/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./public/src/settings.ts":
/*!********************************!*\
  !*** ./public/src/settings.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.settings = void 0;
exports.settings = (() => {
    const DEV_HOST = '/';
    const PROD_HOST = '';
    return {
        DEV_HOST,
        PROD_HOST,
    };
})();


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;
/*!*************************!*\
  !*** ./public/index.ts ***!
  \*************************/

Object.defineProperty(exports, "__esModule", ({ value: true }));
const settings_1 = __webpack_require__(/*! ./src/settings */ "./public/src/settings.ts");
const host = settings_1.settings.DEV_HOST;
// const host = settings.PROD_HOST;
const btnStart = document.getElementById('btn_start_calc');
btnStart === null || btnStart === void 0 ? void 0 : btnStart.addEventListener('click', () => {
    console.log(host);
    window.location.href = host + 'startQuize';
});

})();

/******/ })()
;
//# sourceMappingURL=app.js.map