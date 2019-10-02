(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["registration-registration-module"],{

/***/ "./node_modules/raw-loader/index.js!./src/app/registration/registration.page.html":
/*!*******************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/registration/registration.page.html ***!
  \*******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ion-header>\r\n    <ion-toolbar color=\"tertiary\">\r\n        <ion-buttons slot =\"start\">\r\n            <ion-menu-button>\r\n            </ion-menu-button>\r\n          </ion-buttons>\r\n      <ion-title  style=\"text-align: center\"><img src=\"\\assets\\icon\\magnifying-glass (10).png\" ></ion-title>\r\n    </ion-toolbar>\r\n   </ion-header>\r\n   \r\n   <ion-content class=\"one\" color=\"success\">\r\n      <form  class=\"form\" [formGroup]=\"registrationForm\" style=\"padding: 20px 50px; \">\r\n        <h1 style=\"text-align: center\" class=\"header\"> <b>Sign Up</b></h1>\r\n        <div class=\"form-divider\">\r\n            <ion-item class=\"inputItems\">\r\n            <ion-input  formControlName=\"name\" placeholder=\" Full Name\"><ion-icon name=\"person\"></ion-icon></ion-input>\r\n          </ion-item>\r\n          <ion-item class=\"inputItems\">\r\n            <ion-input formControlName=\"email\"  placeholder=\" Email Address\"><ion-icon name=\"mail\"></ion-icon></ion-input>\r\n          </ion-item>\r\n          <ion-item class=\"inputItems\">\r\n            <ion-input formControlName=\"password\" type=\"password\" placeholder=\" Password\"><ion-icon name=\"lock\"></ion-icon></ion-input>\r\n          </ion-item>\r\n          <ion-item class=\"inputItems\">\r\n            <ion-input formControlName=\"confirmPassword\" type=\"password\" placeholder=\" Confirm Password\"><ion-icon name=\"lock\"></ion-icon></ion-input>\r\n          </ion-item>\r\n        </div>\r\n        <br/><br/>\r\n        <div style=\"text-align: center\">\r\n          <ion-button color=\"tertiary\" class=\"form-buttons\" shape=\"round\" (click)=\"addUser();\" [disabled]=\"!registrationForm.valid\">CREATE ACCOUNT</ion-button><br/>\r\n          Are you a member?<a  class=\"form-link\" [routerLink]=\"['/login']\">Login</a>\r\n        </div>\r\n      </form>\r\n    </ion-content>\r\n"

/***/ }),

/***/ "./src/app/registration/registration.module.ts":
/*!*****************************************************!*\
  !*** ./src/app/registration/registration.module.ts ***!
  \*****************************************************/
/*! exports provided: RegistrationPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RegistrationPageModule", function() { return RegistrationPageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _registration_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./registration.page */ "./src/app/registration/registration.page.ts");







var routes = [
    {
        path: '',
        component: _registration_page__WEBPACK_IMPORTED_MODULE_6__["RegistrationPage"]
    }
];
var RegistrationPageModule = /** @class */ (function () {
    function RegistrationPageModule() {
    }
    RegistrationPageModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormsModule"],
                _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["IonicModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_3__["RouterModule"].forChild(routes),
                _angular_forms__WEBPACK_IMPORTED_MODULE_4__["ReactiveFormsModule"]
            ],
            declarations: [_registration_page__WEBPACK_IMPORTED_MODULE_6__["RegistrationPage"]]
        })
    ], RegistrationPageModule);
    return RegistrationPageModule;
}());



/***/ }),

/***/ "./src/app/registration/registration.page.scss":
/*!*****************************************************!*\
  !*** ./src/app/registration/registration.page.scss ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3JlZ2lzdHJhdGlvbi9yZWdpc3RyYXRpb24ucGFnZS5zY3NzIn0= */"

/***/ }),

/***/ "./src/app/registration/registration.page.ts":
/*!***************************************************!*\
  !*** ./src/app/registration/registration.page.ts ***!
  \***************************************************/
/*! exports provided: RegistrationPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RegistrationPage", function() { return RegistrationPage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _users_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../users.service */ "./src/app/users.service.ts");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _navigation_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../navigation.service */ "./src/app/navigation.service.ts");








var RegistrationPage = /** @class */ (function () {
    function RegistrationPage(userService, formBuilder, route, alertController, toastController, navigationService, events) {
        this.userService = userService;
        this.formBuilder = formBuilder;
        this.route = route;
        this.alertController = alertController;
        this.toastController = toastController;
        this.navigationService = navigationService;
        this.events = events;
        this.emailPattern = "[a-zA-Z0-9-_.+#$!=%^&*/?]+[@][a-zA-Z0-9-]+[.][a-zA-Z0-9]+";
        this.namePattern = "^(?=.*\[A-Z])(?=.*\[a-z])(?=.*\[A-Z]).{2,}$";
        this.passwordPattern = "^(?=.*\[0-9])(?=.*\[a-z])(?=.*\[A-Z])(?=.*\[@#$!%^&*,.<>]).{8,}$";
        this.events.publish('currentPage:home', false);
        this.pageURL = this.navigationService.returnPageURL();
        console.log(this.pageURL);
        this.registrationForm = formBuilder.group({
            name: [this.name, [_angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].compose([_angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].pattern(this.namePattern)])]],
            email: [this.email, [_angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].compose([_angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].pattern(this.emailPattern)])]],
            password: [this.password, _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].compose([_angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].pattern(this.passwordPattern)])],
            confirmPassword: [this.confirmPassword, _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required]
        });
    }
    RegistrationPage.prototype.addUser = function () {
        var _this = this;
        this.email = this.registrationForm.get('email').value;
        this.name = this.registrationForm.get('name').value;
        this.password = this.registrationForm.get('password').value;
        this.confirmPassword = this.registrationForm.get('confirmPassword').value;
        console.log(this.email);
        console.log(this.name);
        console.log(this.password);
        console.log(this.confirmPassword);
        if (this.password === this.confirmPassword) {
            this.userService.register(this.email, this.password, this.name).then(function (data) {
                console.log(data);
                if (data.operationType === "signIn") {
                    console.log("signed in");
                    var userId = data.user.uid;
                    console.log("Current user : " + userId);
                    if (_this.pageURL) {
                        var link = "/" + _this.pageURL;
                        console.log(link);
                        _this.route.navigate([link]);
                    }
                    else {
                        var link = "home";
                        _this.route.navigate([link]);
                    }
                    _this.presentToast();
                }
            }).catch(function (error) {
                console.log(error);
            });
            console.log("passwords match");
        }
        else if (this.password !== this.confirmPassword) {
            this.loadPasswordAlert();
        }
    };
    RegistrationPage.prototype.loadPasswordAlert = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var alert;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.alertController.create({
                            header: 'Alert',
                            subHeader: 'Error',
                            message: 'Passwords don\'t match',
                            buttons: ['OK']
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
    RegistrationPage.prototype.presentToast = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var toast;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.toastController.create({
                            message: 'You have been registered',
                            duration: 1000,
                            color: "tertiary"
                        })];
                    case 1:
                        toast = _a.sent();
                        toast.present();
                        return [2 /*return*/];
                }
            });
        });
    };
    RegistrationPage.prototype.ngOnInit = function () {
    };
    RegistrationPage.ctorParameters = function () { return [
        { type: _users_service__WEBPACK_IMPORTED_MODULE_2__["UsersService"] },
        { type: _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormBuilder"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_4__["Router"] },
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["AlertController"] },
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["ToastController"] },
        { type: _navigation_service__WEBPACK_IMPORTED_MODULE_6__["NavigationService"] },
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["Events"] }
    ]; };
    RegistrationPage = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-registration',
            template: __webpack_require__(/*! raw-loader!./registration.page.html */ "./node_modules/raw-loader/index.js!./src/app/registration/registration.page.html"),
            styles: [__webpack_require__(/*! ./registration.page.scss */ "./src/app/registration/registration.page.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_users_service__WEBPACK_IMPORTED_MODULE_2__["UsersService"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormBuilder"],
            _angular_router__WEBPACK_IMPORTED_MODULE_4__["Router"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["AlertController"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["ToastController"],
            _navigation_service__WEBPACK_IMPORTED_MODULE_6__["NavigationService"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["Events"]])
    ], RegistrationPage);
    return RegistrationPage;
}());



/***/ })

}]);
//# sourceMappingURL=registration-registration-module-es5.js.map