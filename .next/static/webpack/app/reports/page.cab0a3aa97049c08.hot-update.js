"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("app/reports/page",{

/***/ "(app-pages-browser)/./src/components/reports/dummy-data.ts":
/*!**********************************************!*\
  !*** ./src/components/reports/dummy-data.ts ***!
  \**********************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   dummyReports: function() { return /* binding */ dummyReports; }\n/* harmony export */ });\n/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./types */ \"(app-pages-browser)/./src/components/reports/types.ts\");\n/* harmony import */ var date_fns_subDays__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! date-fns/subDays */ \"(app-pages-browser)/./node_modules/date-fns/esm/subDays/index.js\");\n\n\n// Use a fixed base date to avoid hydration errors\nconst BASE_DATE = new Date(\"2024-01-01\");\n// Σταθερά δεδομένα για πλατφόρμες\nconst PLATFORMS = [\n    {\n        name: \"Instagram\",\n        baseReach: 500000,\n        baseEngagement: 50000\n    },\n    {\n        name: \"TikTok\",\n        baseReach: 800000,\n        baseEngagement: 80000\n    },\n    {\n        name: \"YouTube\",\n        baseReach: 300000,\n        baseEngagement: 30000\n    },\n    {\n        name: \"Facebook\",\n        baseReach: 400000,\n        baseEngagement: 40000\n    },\n    {\n        name: \"Twitter\",\n        baseReach: 200000,\n        baseEngagement: 20000\n    },\n    {\n        name: \"LinkedIn\",\n        baseReach: 100000,\n        baseEngagement: 10000\n    }\n];\n// Σταθερά δεδομένα για τις καμπάνιες\nconst CAMPAIGNS = [\n    \"Summer Collection\",\n    \"Winter Sale\",\n    \"Spring Launch\",\n    \"Holiday Special\",\n    \"Back to School\"\n];\n// Σταθερά δεδομένα για influencers\nconst INFLUENCERS = [\n    {\n        id: \"inf-1\",\n        name: \"Maria Papadopoulou\",\n        performance: 95\n    },\n    {\n        id: \"inf-2\",\n        name: \"Giorgos Andreou\",\n        performance: 88\n    },\n    {\n        id: \"inf-3\",\n        name: \"Eleni Dimitriou\",\n        performance: 92\n    },\n    {\n        id: \"inf-4\",\n        name: \"Nikos Georgiou\",\n        performance: 85\n    },\n    {\n        id: \"inf-5\",\n        name: \"Sofia Alexiou\",\n        performance: 90\n    }\n];\n// Προκαθορισμένα δεδομένα για τις αναφορές\nconst generateDummyReport = (id, type)=>{\n    // Κάθε τύπος θα έχει 10 αναφορές (50 συνολικά / 5 τύποι)\n    const reportNumber = Math.floor(id / _types__WEBPACK_IMPORTED_MODULE_0__.REPORT_TYPES.length) + 1;\n    const daysAgo = id * 3 // Μια αναφορά κάθε 3 μέρες\n    ;\n    const date = (0,date_fns_subDays__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(BASE_DATE, daysAgo);\n    // Επιλογή καμπάνιας με βάση το id\n    const campaignIndex = id % CAMPAIGNS.length;\n    const campaign = CAMPAIGNS[campaignIndex];\n    // Σταθερές τιμές μετρικών με μικρή διαφοροποίηση ανά τύπο αναφοράς\n    let impressions = 250000;\n    let engagement = 25000;\n    let clicks = 10000;\n    let conversions = 1000;\n    let revenue = 25000;\n    // Διαφοροποίηση με βάση τον τύπο αναφοράς\n    switch(type){\n        case \"Performance\":\n            impressions += 50000;\n            clicks += 5000;\n            break;\n        case \"Engagement\":\n            engagement += 15000;\n            break;\n        case \"Financial\":\n            revenue += 15000;\n            conversions += 500;\n            break;\n        case \"Campaign\":\n            impressions += 30000;\n            engagement += 8000;\n            break;\n        case \"Influencer\":\n            engagement += 10000;\n            clicks += 2000;\n            break;\n    }\n    // Επιλογή 3 influencers για κάθε αναφορά\n    const selectedInfluencers = INFLUENCERS.slice(0, 3).map((influencer)=>({\n            id: influencer.id,\n            name: influencer.name,\n            performance: influencer.performance\n        }));\n    // Επιλογή 3 πλατφορμών για κάθε αναφορά\n    const selectedPlatforms = PLATFORMS.slice(0, 3).map((platform)=>({\n            name: platform.name,\n            metrics: {\n                reach: platform.baseReach,\n                engagement: platform.baseEngagement\n            }\n        }));\n    return {\n        id: \"report-\".concat(id),\n        title: \"\".concat(campaign, \" - \").concat(type, \" Report #\").concat(reportNumber),\n        type,\n        date,\n        campaign,\n        metrics: {\n            impressions,\n            engagement,\n            clicks,\n            conversions,\n            revenue\n        },\n        influencers: selectedInfluencers,\n        platforms: selectedPlatforms\n    };\n};\n// Δημιουργία 50 αναφορών με ίση κατανομή όλων των τύπων\nconst dummyReports = Array.from({\n    length: 50\n}, (_, i)=>{\n    // Εξασφάλιση ίσης κατανομής τύπων (10 αναφορές ανά τύπο)\n    const typeIndex = i % _types__WEBPACK_IMPORTED_MODULE_0__.REPORT_TYPES.length;\n    return generateDummyReport(i, _types__WEBPACK_IMPORTED_MODULE_0__.REPORT_TYPES[typeIndex]);\n});\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwcC1wYWdlcy1icm93c2VyKS8uL3NyYy9jb21wb25lbnRzL3JlcG9ydHMvZHVtbXktZGF0YS50cyIsIm1hcHBpbmdzIjoiOzs7Ozs7QUFBOEM7QUFDWjtBQUVsQyxrREFBa0Q7QUFDbEQsTUFBTUUsWUFBWSxJQUFJQyxLQUFLO0FBRTNCLGtDQUFrQztBQUNsQyxNQUFNQyxZQUFZO0lBQ2hCO1FBQUVDLE1BQU07UUFBYUMsV0FBVztRQUFRQyxnQkFBZ0I7SUFBTTtJQUM5RDtRQUFFRixNQUFNO1FBQVVDLFdBQVc7UUFBUUMsZ0JBQWdCO0lBQU07SUFDM0Q7UUFBRUYsTUFBTTtRQUFXQyxXQUFXO1FBQVFDLGdCQUFnQjtJQUFNO0lBQzVEO1FBQUVGLE1BQU07UUFBWUMsV0FBVztRQUFRQyxnQkFBZ0I7SUFBTTtJQUM3RDtRQUFFRixNQUFNO1FBQVdDLFdBQVc7UUFBUUMsZ0JBQWdCO0lBQU07SUFDNUQ7UUFBRUYsTUFBTTtRQUFZQyxXQUFXO1FBQVFDLGdCQUFnQjtJQUFNO0NBQzlEO0FBRUQscUNBQXFDO0FBQ3JDLE1BQU1DLFlBQVk7SUFDaEI7SUFDQTtJQUNBO0lBQ0E7SUFDQTtDQUNEO0FBRUQsbUNBQW1DO0FBQ25DLE1BQU1DLGNBQWM7SUFDbEI7UUFBRUMsSUFBSTtRQUFTTCxNQUFNO1FBQXNCTSxhQUFhO0lBQUc7SUFDM0Q7UUFBRUQsSUFBSTtRQUFTTCxNQUFNO1FBQW1CTSxhQUFhO0lBQUc7SUFDeEQ7UUFBRUQsSUFBSTtRQUFTTCxNQUFNO1FBQW1CTSxhQUFhO0lBQUc7SUFDeEQ7UUFBRUQsSUFBSTtRQUFTTCxNQUFNO1FBQWtCTSxhQUFhO0lBQUc7SUFDdkQ7UUFBRUQsSUFBSTtRQUFTTCxNQUFNO1FBQWlCTSxhQUFhO0lBQUc7Q0FDdkQ7QUFFRCwyQ0FBMkM7QUFDM0MsTUFBTUMsc0JBQXNCLENBQUNGLElBQVlHO0lBQ3ZDLHlEQUF5RDtJQUN6RCxNQUFNQyxlQUFlQyxLQUFLQyxLQUFLLENBQUNOLEtBQUtWLGdEQUFZQSxDQUFDaUIsTUFBTSxJQUFJO0lBQzVELE1BQU1DLFVBQVVSLEtBQUssRUFBRSwyQkFBMkI7O0lBQ2xELE1BQU1TLE9BQU9sQiw0REFBT0EsQ0FBQ0MsV0FBV2dCO0lBRWhDLGtDQUFrQztJQUNsQyxNQUFNRSxnQkFBZ0JWLEtBQUtGLFVBQVVTLE1BQU07SUFDM0MsTUFBTUksV0FBV2IsU0FBUyxDQUFDWSxjQUFjO0lBRXpDLG1FQUFtRTtJQUNuRSxJQUFJRSxjQUFjO0lBQ2xCLElBQUlDLGFBQWE7SUFDakIsSUFBSUMsU0FBUztJQUNiLElBQUlDLGNBQWM7SUFDbEIsSUFBSUMsVUFBVTtJQUVkLDBDQUEwQztJQUMxQyxPQUFRYjtRQUNOLEtBQUs7WUFDSFMsZUFBZTtZQUNmRSxVQUFVO1lBQ1Y7UUFDRixLQUFLO1lBQ0hELGNBQWM7WUFDZDtRQUNGLEtBQUs7WUFDSEcsV0FBVztZQUNYRCxlQUFlO1lBQ2Y7UUFDRixLQUFLO1lBQ0hILGVBQWU7WUFDZkMsY0FBYztZQUNkO1FBQ0YsS0FBSztZQUNIQSxjQUFjO1lBQ2RDLFVBQVU7WUFDVjtJQUNKO0lBRUEseUNBQXlDO0lBQ3pDLE1BQU1HLHNCQUFzQmxCLFlBQVltQixLQUFLLENBQUMsR0FBRyxHQUFHQyxHQUFHLENBQUNDLENBQUFBLGFBQWU7WUFDckVwQixJQUFJb0IsV0FBV3BCLEVBQUU7WUFDakJMLE1BQU15QixXQUFXekIsSUFBSTtZQUNyQk0sYUFBYW1CLFdBQVduQixXQUFXO1FBQ3JDO0lBRUEsd0NBQXdDO0lBQ3hDLE1BQU1vQixvQkFBb0IzQixVQUFVd0IsS0FBSyxDQUFDLEdBQUcsR0FBR0MsR0FBRyxDQUFDRyxDQUFBQSxXQUFhO1lBQy9EM0IsTUFBTTJCLFNBQVMzQixJQUFJO1lBQ25CNEIsU0FBUztnQkFDUEMsT0FBT0YsU0FBUzFCLFNBQVM7Z0JBQ3pCaUIsWUFBWVMsU0FBU3pCLGNBQWM7WUFDckM7UUFDRjtJQUVBLE9BQU87UUFDTEcsSUFBSSxVQUFhLE9BQUhBO1FBQ2R5QixPQUFPLEdBQWlCdEIsT0FBZFEsVUFBUyxPQUFxQlAsT0FBaEJELE1BQUssYUFBd0IsT0FBYkM7UUFDeENEO1FBQ0FNO1FBQ0FFO1FBQ0FZLFNBQVM7WUFDUFg7WUFDQUM7WUFDQUM7WUFDQUM7WUFDQUM7UUFDRjtRQUNBVSxhQUFhVDtRQUNiVSxXQUFXTjtJQUNiO0FBQ0Y7QUFFQSx3REFBd0Q7QUFDakQsTUFBTU8sZUFBeUJDLE1BQU1DLElBQUksQ0FBQztJQUFFdkIsUUFBUTtBQUFHLEdBQUcsQ0FBQ3dCLEdBQUdDO0lBQ25FLHlEQUF5RDtJQUN6RCxNQUFNQyxZQUFZRCxJQUFJMUMsZ0RBQVlBLENBQUNpQixNQUFNO0lBQ3pDLE9BQU9MLG9CQUFvQjhCLEdBQUcxQyxnREFBWSxDQUFDMkMsVUFBVTtBQUN2RCxHQUFFIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vX05fRS8uL3NyYy9jb21wb25lbnRzL3JlcG9ydHMvZHVtbXktZGF0YS50cz9iMzNlIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFJlcG9ydCwgUkVQT1JUX1RZUEVTIH0gZnJvbSAnLi90eXBlcydcbmltcG9ydCB7IHN1YkRheXMgfSBmcm9tICdkYXRlLWZucydcblxuLy8gVXNlIGEgZml4ZWQgYmFzZSBkYXRlIHRvIGF2b2lkIGh5ZHJhdGlvbiBlcnJvcnNcbmNvbnN0IEJBU0VfREFURSA9IG5ldyBEYXRlKCcyMDI0LTAxLTAxJylcblxuLy8gzqPPhM6xzrjOtc+BzqwgzrTOtc60zr/OvM6tzr3OsSDOs865zrEgz4DOu86xz4TPhs+Mz4HOvM61z4JcbmNvbnN0IFBMQVRGT1JNUyA9IFtcbiAgeyBuYW1lOiAnSW5zdGFncmFtJywgYmFzZVJlYWNoOiA1MDAwMDAsIGJhc2VFbmdhZ2VtZW50OiA1MDAwMCB9LFxuICB7IG5hbWU6ICdUaWtUb2snLCBiYXNlUmVhY2g6IDgwMDAwMCwgYmFzZUVuZ2FnZW1lbnQ6IDgwMDAwIH0sXG4gIHsgbmFtZTogJ1lvdVR1YmUnLCBiYXNlUmVhY2g6IDMwMDAwMCwgYmFzZUVuZ2FnZW1lbnQ6IDMwMDAwIH0sXG4gIHsgbmFtZTogJ0ZhY2Vib29rJywgYmFzZVJlYWNoOiA0MDAwMDAsIGJhc2VFbmdhZ2VtZW50OiA0MDAwMCB9LFxuICB7IG5hbWU6ICdUd2l0dGVyJywgYmFzZVJlYWNoOiAyMDAwMDAsIGJhc2VFbmdhZ2VtZW50OiAyMDAwMCB9LFxuICB7IG5hbWU6ICdMaW5rZWRJbicsIGJhc2VSZWFjaDogMTAwMDAwLCBiYXNlRW5nYWdlbWVudDogMTAwMDAgfVxuXVxuXG4vLyDOo8+EzrHOuM61z4HOrCDOtM61zrTOv868zq3Ovc6xIM6zzrnOsSDPhM65z4IgzrrOsc68z4DOrM69zrnOtc+CXG5jb25zdCBDQU1QQUlHTlMgPSBbXG4gICdTdW1tZXIgQ29sbGVjdGlvbicsXG4gICdXaW50ZXIgU2FsZScsXG4gICdTcHJpbmcgTGF1bmNoJyxcbiAgJ0hvbGlkYXkgU3BlY2lhbCcsXG4gICdCYWNrIHRvIFNjaG9vbCdcbl1cblxuLy8gzqPPhM6xzrjOtc+BzqwgzrTOtc60zr/OvM6tzr3OsSDOs865zrEgaW5mbHVlbmNlcnNcbmNvbnN0IElORkxVRU5DRVJTID0gW1xuICB7IGlkOiAnaW5mLTEnLCBuYW1lOiAnTWFyaWEgUGFwYWRvcG91bG91JywgcGVyZm9ybWFuY2U6IDk1IH0sXG4gIHsgaWQ6ICdpbmYtMicsIG5hbWU6ICdHaW9yZ29zIEFuZHJlb3UnLCBwZXJmb3JtYW5jZTogODggfSxcbiAgeyBpZDogJ2luZi0zJywgbmFtZTogJ0VsZW5pIERpbWl0cmlvdScsIHBlcmZvcm1hbmNlOiA5MiB9LFxuICB7IGlkOiAnaW5mLTQnLCBuYW1lOiAnTmlrb3MgR2Vvcmdpb3UnLCBwZXJmb3JtYW5jZTogODUgfSxcbiAgeyBpZDogJ2luZi01JywgbmFtZTogJ1NvZmlhIEFsZXhpb3UnLCBwZXJmb3JtYW5jZTogOTAgfVxuXVxuXG4vLyDOoM+Bzr/Ous6xzrjOv8+BzrnPg868zq3Ovc6xIM60zrXOtM6/zrzOrc69zrEgzrPOuc6xIM+EzrnPgiDOsc69zrHPhs6/z4HOrc+CXG5jb25zdCBnZW5lcmF0ZUR1bW15UmVwb3J0ID0gKGlkOiBudW1iZXIsIHR5cGU6IHN0cmluZyk6IFJlcG9ydCA9PiB7XG4gIC8vIM6azqzOuM61IM+Ez43PgM6/z4IgzrjOsSDOrc+HzrXOuSAxMCDOsc69zrHPhs6/z4HOrc+CICg1MCDPg8+Fzr3Ov867zrnOus6sIC8gNSDPhM+Nz4DOv865KVxuICBjb25zdCByZXBvcnROdW1iZXIgPSBNYXRoLmZsb29yKGlkIC8gUkVQT1JUX1RZUEVTLmxlbmd0aCkgKyAxXG4gIGNvbnN0IGRheXNBZ28gPSBpZCAqIDMgLy8gzpzOuc6xIM6xzr3Osc+Gzr/Pgc6sIM66zqzOuM61IDMgzrzOrc+BzrXPglxuICBjb25zdCBkYXRlID0gc3ViRGF5cyhCQVNFX0RBVEUsIGRheXNBZ28pXG4gIFxuICAvLyDOlc+AzrnOu86/zrPOriDOus6xzrzPgM6szr3Ouc6xz4IgzrzOtSDOss6sz4POtyDPhM6/IGlkXG4gIGNvbnN0IGNhbXBhaWduSW5kZXggPSBpZCAlIENBTVBBSUdOUy5sZW5ndGhcbiAgY29uc3QgY2FtcGFpZ24gPSBDQU1QQUlHTlNbY2FtcGFpZ25JbmRleF1cbiAgXG4gIC8vIM6jz4TOsc64zrXPgc6tz4Igz4TOuc68zq3PgiDOvM61z4TPgc65zrrPjs69IM68zrUgzrzOuc66z4HOriDOtM65zrHPhs6/z4HOv8+Azr/Or863z4POtyDOsc69zqwgz4TPjc+Azr8gzrHOvc6xz4bOv8+BzqzPglxuICBsZXQgaW1wcmVzc2lvbnMgPSAyNTAwMDBcbiAgbGV0IGVuZ2FnZW1lbnQgPSAyNTAwMFxuICBsZXQgY2xpY2tzID0gMTAwMDBcbiAgbGV0IGNvbnZlcnNpb25zID0gMTAwMFxuICBsZXQgcmV2ZW51ZSA9IDI1MDAwXG4gIFxuICAvLyDOlM65zrHPhs6/z4HOv8+Azr/Or863z4POtyDOvM61IM6yzqzPg863IM+Ezr/OvSDPhM+Nz4DOvyDOsc69zrHPhs6/z4HOrM+CXG4gIHN3aXRjaCAodHlwZSkge1xuICAgIGNhc2UgJ1BlcmZvcm1hbmNlJzpcbiAgICAgIGltcHJlc3Npb25zICs9IDUwMDAwXG4gICAgICBjbGlja3MgKz0gNTAwMFxuICAgICAgYnJlYWtcbiAgICBjYXNlICdFbmdhZ2VtZW50JzpcbiAgICAgIGVuZ2FnZW1lbnQgKz0gMTUwMDBcbiAgICAgIGJyZWFrXG4gICAgY2FzZSAnRmluYW5jaWFsJzpcbiAgICAgIHJldmVudWUgKz0gMTUwMDBcbiAgICAgIGNvbnZlcnNpb25zICs9IDUwMFxuICAgICAgYnJlYWtcbiAgICBjYXNlICdDYW1wYWlnbic6XG4gICAgICBpbXByZXNzaW9ucyArPSAzMDAwMFxuICAgICAgZW5nYWdlbWVudCArPSA4MDAwXG4gICAgICBicmVha1xuICAgIGNhc2UgJ0luZmx1ZW5jZXInOlxuICAgICAgZW5nYWdlbWVudCArPSAxMDAwMFxuICAgICAgY2xpY2tzICs9IDIwMDBcbiAgICAgIGJyZWFrXG4gIH1cbiAgXG4gIC8vIM6Vz4DOuc67zr/Os86uIDMgaW5mbHVlbmNlcnMgzrPOuc6xIM66zqzOuM61IM6xzr3Osc+Gzr/Pgc6sXG4gIGNvbnN0IHNlbGVjdGVkSW5mbHVlbmNlcnMgPSBJTkZMVUVOQ0VSUy5zbGljZSgwLCAzKS5tYXAoaW5mbHVlbmNlciA9PiAoe1xuICAgIGlkOiBpbmZsdWVuY2VyLmlkLFxuICAgIG5hbWU6IGluZmx1ZW5jZXIubmFtZSxcbiAgICBwZXJmb3JtYW5jZTogaW5mbHVlbmNlci5wZXJmb3JtYW5jZVxuICB9KSlcbiAgXG4gIC8vIM6Vz4DOuc67zr/Os86uIDMgz4DOu86xz4TPhs6/z4HOvM+Ozr0gzrPOuc6xIM66zqzOuM61IM6xzr3Osc+Gzr/Pgc6sXG4gIGNvbnN0IHNlbGVjdGVkUGxhdGZvcm1zID0gUExBVEZPUk1TLnNsaWNlKDAsIDMpLm1hcChwbGF0Zm9ybSA9PiAoe1xuICAgIG5hbWU6IHBsYXRmb3JtLm5hbWUsXG4gICAgbWV0cmljczoge1xuICAgICAgcmVhY2g6IHBsYXRmb3JtLmJhc2VSZWFjaCxcbiAgICAgIGVuZ2FnZW1lbnQ6IHBsYXRmb3JtLmJhc2VFbmdhZ2VtZW50XG4gICAgfVxuICB9KSlcbiAgXG4gIHJldHVybiB7XG4gICAgaWQ6IGByZXBvcnQtJHtpZH1gLFxuICAgIHRpdGxlOiBgJHtjYW1wYWlnbn0gLSAke3R5cGV9IFJlcG9ydCAjJHtyZXBvcnROdW1iZXJ9YCxcbiAgICB0eXBlLFxuICAgIGRhdGUsXG4gICAgY2FtcGFpZ24sXG4gICAgbWV0cmljczoge1xuICAgICAgaW1wcmVzc2lvbnMsXG4gICAgICBlbmdhZ2VtZW50LFxuICAgICAgY2xpY2tzLFxuICAgICAgY29udmVyc2lvbnMsXG4gICAgICByZXZlbnVlLFxuICAgIH0sXG4gICAgaW5mbHVlbmNlcnM6IHNlbGVjdGVkSW5mbHVlbmNlcnMsXG4gICAgcGxhdGZvcm1zOiBzZWxlY3RlZFBsYXRmb3JtcyxcbiAgfVxufVxuXG4vLyDOlM63zrzOuc6/z4XPgc6zzq/OsSA1MCDOsc69zrHPhs6/z4HPjs69IM68zrUgzq/Pg863IM66zrHPhM6xzr3Ov868zq4gz4zOu8+Jzr0gz4TPic69IM+Ez43PgM+Jzr1cbmV4cG9ydCBjb25zdCBkdW1teVJlcG9ydHM6IFJlcG9ydFtdID0gQXJyYXkuZnJvbSh7IGxlbmd0aDogNTAgfSwgKF8sIGkpID0+IHtcbiAgLy8gzpXOvs6xz4PPhs6szrvOuc+Dzrcgzq/Pg863z4IgzrrOsc+EzrHOvc6/zrzOrs+CIM+Ez43PgM+Jzr0gKDEwIM6xzr3Osc+Gzr/Pgc6tz4IgzrHOvc6sIM+Ez43PgM6/KVxuICBjb25zdCB0eXBlSW5kZXggPSBpICUgUkVQT1JUX1RZUEVTLmxlbmd0aFxuICByZXR1cm4gZ2VuZXJhdGVEdW1teVJlcG9ydChpLCBSRVBPUlRfVFlQRVNbdHlwZUluZGV4XSlcbn0pXG4iXSwibmFtZXMiOlsiUkVQT1JUX1RZUEVTIiwic3ViRGF5cyIsIkJBU0VfREFURSIsIkRhdGUiLCJQTEFURk9STVMiLCJuYW1lIiwiYmFzZVJlYWNoIiwiYmFzZUVuZ2FnZW1lbnQiLCJDQU1QQUlHTlMiLCJJTkZMVUVOQ0VSUyIsImlkIiwicGVyZm9ybWFuY2UiLCJnZW5lcmF0ZUR1bW15UmVwb3J0IiwidHlwZSIsInJlcG9ydE51bWJlciIsIk1hdGgiLCJmbG9vciIsImxlbmd0aCIsImRheXNBZ28iLCJkYXRlIiwiY2FtcGFpZ25JbmRleCIsImNhbXBhaWduIiwiaW1wcmVzc2lvbnMiLCJlbmdhZ2VtZW50IiwiY2xpY2tzIiwiY29udmVyc2lvbnMiLCJyZXZlbnVlIiwic2VsZWN0ZWRJbmZsdWVuY2VycyIsInNsaWNlIiwibWFwIiwiaW5mbHVlbmNlciIsInNlbGVjdGVkUGxhdGZvcm1zIiwicGxhdGZvcm0iLCJtZXRyaWNzIiwicmVhY2giLCJ0aXRsZSIsImluZmx1ZW5jZXJzIiwicGxhdGZvcm1zIiwiZHVtbXlSZXBvcnRzIiwiQXJyYXkiLCJmcm9tIiwiXyIsImkiLCJ0eXBlSW5kZXgiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(app-pages-browser)/./src/components/reports/dummy-data.ts\n"));

/***/ })

});