(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["report-alert-report-alert-module"],{

/***/ "./node_modules/raw-loader/index.js!./src/app/report-alert/report-alert.page.html":
/*!*******************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/report-alert/report-alert.page.html ***!
  \*******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ion-header>\r\n  <ion-toolbar color=\"tertiary\">\r\n      <ion-buttons slot =\"start\">\r\n          <ion-menu-button>\r\n          </ion-menu-button>\r\n        </ion-buttons>\r\n      \r\n        <ion-title style=\"text-align: center\"><img src=\"\\assets\\icon\\magnifying-glass (10).png\">\r\n        </ion-title>\r\n\r\n  </ion-toolbar>\r\n </ion-header>\r\n\r\n<ion-content color=\"success\">\r\n  <ion-searchbar color=\"light\" showCancelButton=\"never\" placeholder=\"Location\"></ion-searchbar>\r\n\r\n  <ion-card>\r\n      <ion-card-header>\r\n        <ion-card-title>Map</ion-card-title>\r\n      </ion-card-header>\r\n    </ion-card>\r\n    \r\n      <ion-card>\r\n          <ion-item>\r\n              <ion-textarea placeholder=\"Description\" rows=\"20\" cols=\"20\"></ion-textarea>\r\n              </ion-item>\r\n      </ion-card>\r\n      \r\n      <div style=\"text-align: center\">\r\n          <ion-button  shape=\"round\" color=\"tertiary\">\r\n              Submit\r\n          </ion-button>\r\n            \r\n        </div>\r\n</ion-content>\r\n"

/***/ }),

/***/ "./src/app/report-alert/report-alert.module.ts":
/*!*****************************************************!*\
  !*** ./src/app/report-alert/report-alert.module.ts ***!
  \*****************************************************/
/*! exports provided: ReportAlertPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ReportAlertPageModule", function() { return ReportAlertPageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm2015/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm2015/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _report_alert_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./report-alert.page */ "./src/app/report-alert/report-alert.page.ts");







const routes = [
    {
        path: '',
        component: _report_alert_page__WEBPACK_IMPORTED_MODULE_6__["ReportAlertPage"]
    }
];
let ReportAlertPageModule = class ReportAlertPageModule {
};
ReportAlertPageModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [
            _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["IonicModule"],
            _angular_router__WEBPACK_IMPORTED_MODULE_4__["RouterModule"].forChild(routes)
        ],
        declarations: [_report_alert_page__WEBPACK_IMPORTED_MODULE_6__["ReportAlertPage"]]
    })
], ReportAlertPageModule);



/***/ }),

/***/ "./src/app/report-alert/report-alert.page.scss":
/*!*****************************************************!*\
  !*** ./src/app/report-alert/report-alert.page.scss ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3JlcG9ydC1hbGVydC9yZXBvcnQtYWxlcnQucGFnZS5zY3NzIn0= */"

/***/ }),

/***/ "./src/app/report-alert/report-alert.page.ts":
/*!***************************************************!*\
  !*** ./src/app/report-alert/report-alert.page.ts ***!
  \***************************************************/
/*! exports provided: ReportAlertPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ReportAlertPage", function() { return ReportAlertPage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _users_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../users.service */ "./src/app/users.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var _navigation_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../navigation.service */ "./src/app/navigation.service.ts");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");






let ReportAlertPage = class ReportAlertPage {
    constructor(navigationService, userService, router, events) {
        this.navigationService = navigationService;
        this.userService = userService;
        this.router = router;
        this.events = events;
        console.log("why");
        this.checkState();
        this.events.publish('currentPage:home', false);
    }
    checkState() {
        this.user = this.userService.returnUserProfile();
        console.log(this.user);
        if (this.user[0] === undefined) {
            console.log(true);
            this.router.navigate(['/login']);
        }
    }
    ngOnInit() {
    }
};
ReportAlertPage.ctorParameters = () => [
    { type: _navigation_service__WEBPACK_IMPORTED_MODULE_4__["NavigationService"] },
    { type: _users_service__WEBPACK_IMPORTED_MODULE_2__["UsersService"] },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"] },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["Events"] }
];
ReportAlertPage = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-report-alert',
        template: __webpack_require__(/*! raw-loader!./report-alert.page.html */ "./node_modules/raw-loader/index.js!./src/app/report-alert/report-alert.page.html"),
        styles: [__webpack_require__(/*! ./report-alert.page.scss */ "./src/app/report-alert/report-alert.page.scss")]
    }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_navigation_service__WEBPACK_IMPORTED_MODULE_4__["NavigationService"], _users_service__WEBPACK_IMPORTED_MODULE_2__["UsersService"], _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"], _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["Events"]])
], ReportAlertPage);



/***/ })

}]);
//# sourceMappingURL=report-alert-report-alert-module-es2015.js.map