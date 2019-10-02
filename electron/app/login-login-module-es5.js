(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["login-login-module"],{

/***/ "./node_modules/raw-loader/index.js!./src/app/login/login.page.html":
/*!*****************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/login/login.page.html ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ion-header>\r\n  <ion-toolbar color=\"tertiary\">\r\n      <ion-buttons slot =\"start\">\r\n          <ion-menu-button>\r\n          </ion-menu-button>\r\n        </ion-buttons>\r\n        <ion-title style=\"text-align: center\"><img src=\"\\assets\\icon\\magnifying-glass (10).png\" >\r\n          </ion-title>\r\n  </ion-toolbar>\r\n </ion-header>\r\n\r\n<ion-content class=\"one\" color=\"success\" ($ionicView.enter)=\"checkURL()\">\r\n  \r\n    <form class=\"form\" style=\"padding: 50px;\" [formGroup]=\"loginForm\">\r\n      <h1 style=\"text-align: center\" class=\"header\"><b>Sign In</b></h1>\r\n      <div class=\"form-divider\">\r\n        <ion-item class=\"inputItems\">\r\n        <ion-input formControlName=\"email\" placeholder=\" Email Address\"><ion-icon name=\"mail\"></ion-icon></ion-input>\r\n      </ion-item>\r\n      <ion-item class=\"inputItems\">\r\n        <ion-input formControlName=\"password\" type=\"password\" placeholder=\" Password\"><ion-icon name=\"lock\"></ion-icon></ion-input>\r\n      </ion-item>\r\n      </div>\r\n      <br/>\r\n      <div style=\"text-align: center\">\r\n        <ion-button color=\"tertiary\"  class=\"form-buttons\" [disabled]=\"!loginForm.valid\" shape=\"round\" (click)=\"login()\">Login</ion-button><br/><br/>\r\n        <a (click)=\"resetPassword()\">Forgot password</a><br/>\r\n        Don't have an account?<a  class=\"form-link\"  [routerLink]=\"['/registration']\">Register</a>  \r\n      </div>\r\n    </form>\r\n    \r\n  </ion-content>\r\n"

/***/ }),

/***/ "./src/app/login/login.module.ts":
/*!***************************************!*\
  !*** ./src/app/login/login.module.ts ***!
  \***************************************/
/*! exports provided: LoginPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LoginPageModule", function() { return LoginPageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _login_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./login.page */ "./src/app/login/login.page.ts");







var routes = [
    {
        path: '',
        component: _login_page__WEBPACK_IMPORTED_MODULE_6__["LoginPage"]
    }
];
var LoginPageModule = /** @class */ (function () {
    function LoginPageModule() {
    }
    LoginPageModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
                _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["IonicModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_4__["RouterModule"].forChild(routes),
                _angular_forms__WEBPACK_IMPORTED_MODULE_3__["ReactiveFormsModule"]
            ],
            declarations: [_login_page__WEBPACK_IMPORTED_MODULE_6__["LoginPage"]]
        })
    ], LoginPageModule);
    return LoginPageModule;
}());



/***/ }),

/***/ "./src/app/login/login.page.scss":
/*!***************************************!*\
  !*** ./src/app/login/login.page.scss ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2xvZ2luL2xvZ2luLnBhZ2Uuc2NzcyJ9 */"

/***/ }),

/***/ "./src/app/login/login.page.ts":
/*!*************************************!*\
  !*** ./src/app/login/login.page.ts ***!
  \*************************************/
/*! exports provided: LoginPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LoginPage", function() { return LoginPage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _users_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../users.service */ "./src/app/users.service.ts");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _navigation_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../navigation.service */ "./src/app/navigation.service.ts");







var LoginPage = /** @class */ (function () {
    function LoginPage(userService, alertController, route, formBuilder, navigationService, events) {
        this.userService = userService;
        this.alertController = alertController;
        this.route = route;
        this.formBuilder = formBuilder;
        this.navigationService = navigationService;
        this.events = events;
        this.emailPattern = "[a-zA-Z0-9-_.+#$!=%^&*/?]+[@][a-zA-Z0-9-]+[.][a-zA-Z0-9]+";
        this.passwordPattern = "^(?=.*\[0-9])(?=.*\[a-z])(?=.*\[A-Z])(?=.*\[@#$!%^&*,.<>]).{8,}$";
        this.pageURL = "und";
        this.events.publish('currentPage:home', false);
        this.pageURL = this.navigationService.returnPageURL();
        console.log(this.pageURL);
        //this.checkURL()
        this.loginForm = formBuilder.group({
            email: [this.email, _angular_forms__WEBPACK_IMPORTED_MODULE_5__["Validators"].compose([_angular_forms__WEBPACK_IMPORTED_MODULE_5__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_5__["Validators"].pattern(this.emailPattern)])],
            password: [this.password, _angular_forms__WEBPACK_IMPORTED_MODULE_5__["Validators"].compose([_angular_forms__WEBPACK_IMPORTED_MODULE_5__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_5__["Validators"].pattern(this.passwordPattern)])]
        });
        this.loginForm.get('email').setValue('willington.mnisi@gmail.com');
        this.loginForm.get('password').setValue('Will1ngt0n7&');
    }
    LoginPage.prototype.checkURL = function () {
        if (this.pageURL === "und") {
            this.pageURL = this.navigationService.returnPageURL();
            console.log(this.pageURL);
        }
    };
    LoginPage.prototype.login = function () {
        var _this = this;
        this.email = this.loginForm.get('email').value;
        this.password = this.loginForm.get('password').value;
        console.log(this.email, this.password);
        this.userService.login(this.email, this.password).then(function (result) {
            if (result.operationType === "signIn") {
                _this.events.publish('user:created', result.user.email);
                console.log("Welcome " + result.user.email);
                var userId = result.user.uid;
                if (_this.pageURL === "crime-alert" || _this.pageURL === "community-event") {
                    var link = "/" + _this.pageURL;
                    console.log(link);
                    _this.route.navigate([link]);
                }
                else {
                    var link = "home";
                    _this.route.navigate([link]);
                }
            }
            else {
                console.log(result.message);
            }
        });
    };
    //Resetting user password using email password reset request
    LoginPage.prototype.resetPassword = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var alert;
            var _this = this;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.alertController.create({
                            header: 'Confirm!',
                            message: 'Message <strong>text</strong>!!!',
                            inputs: [
                                {
                                    name: 'email',
                                    type: 'text',
                                    placeholder: 'Placeholder 1'
                                }
                            ],
                            buttons: [
                                {
                                    text: 'Cancel',
                                    role: 'cancel',
                                    cssClass: 'success',
                                    handler: function (blah) {
                                        console.log('Confirm Cancel: blah');
                                    }
                                }, {
                                    text: 'Okay',
                                    handler: function (user) {
                                        console.log('Confirm Okay');
                                        _this.userService.passwordReset(user.email);
                                    }
                                }
                            ]
                        })];
                    case 1:
                        alert = _a.sent();
                        return [4 /*yield*/, alert.present()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    LoginPage.prototype.ngOnInit = function () {
    };
    LoginPage.ctorParameters = function () { return [
        { type: _users_service__WEBPACK_IMPORTED_MODULE_2__["UsersService"] },
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["AlertController"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_4__["Router"] },
        { type: _angular_forms__WEBPACK_IMPORTED_MODULE_5__["FormBuilder"] },
        { type: _navigation_service__WEBPACK_IMPORTED_MODULE_6__["NavigationService"] },
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["Events"] }
    ]; };
    LoginPage = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-login',
            template: __webpack_require__(/*! raw-loader!./login.page.html */ "./node_modules/raw-loader/index.js!./src/app/login/login.page.html"),
            styles: [__webpack_require__(/*! ./login.page.scss */ "./src/app/login/login.page.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_users_service__WEBPACK_IMPORTED_MODULE_2__["UsersService"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["AlertController"],
            _angular_router__WEBPACK_IMPORTED_MODULE_4__["Router"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_5__["FormBuilder"],
            _navigation_service__WEBPACK_IMPORTED_MODULE_6__["NavigationService"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["Events"]])
    ], LoginPage);
    return LoginPage;
}());



/***/ })

}]);
//# sourceMappingURL=login-login-module-es5.js.map