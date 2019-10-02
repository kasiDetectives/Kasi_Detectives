(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["community-event-community-event-module"],{

/***/ "./node_modules/raw-loader/index.js!./src/app/community-event/community-event.page.html":
/*!*************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/community-event/community-event.page.html ***!
  \*************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ion-header>\r\n    <ion-toolbar color=\"tertiary\">\r\n        <ion-buttons slot =\"start\">\r\n            <ion-menu-button>\r\n            </ion-menu-button>\r\n          </ion-buttons>\r\n          <ion-title  style=\"text-align: center\"><img src=\"\\assets\\icon\\magnifying-glass (10).png\" >\r\n            </ion-title>\r\n    </ion-toolbar>\r\n   </ion-header>\r\n\r\n<ion-content color=\"success\">\r\n  <ion-searchbar color=\"light\" showCancelButton=\"never\" placeholder=\"Location\" (ionChange)=\"autocomplete()\" [(ngModel)]=\"searchString\"></ion-searchbar>\r\n\r\n  <ion-card>\r\n      <ion-item>\r\n          <ion-input placeholder=\"Headline\"></ion-input>\r\n        </ion-item>\r\n  </ion-card>\r\n\r\n<!-- Textarea in an item with a placeholder -->\r\n<ion-card>\r\n    <ion-item>\r\n        <ion-textarea placeholder=\"Description\" rows=\"20\" cols=\"20\"></ion-textarea>\r\n        </ion-item>\r\n</ion-card>\r\n\r\n<div style=\"text-align: center\">\r\n    <ion-button  shape=\"round\" color=\"tertiary\">\r\n        Submit\r\n    </ion-button>\r\n      \r\n  </div>\r\n\r\n</ion-content>\r\n"

/***/ }),

/***/ "./src/app/community-event/community-event.module.ts":
/*!***********************************************************!*\
  !*** ./src/app/community-event/community-event.module.ts ***!
  \***********************************************************/
/*! exports provided: CommunityEventPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CommunityEventPageModule", function() { return CommunityEventPageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _community_event_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./community-event.page */ "./src/app/community-event/community-event.page.ts");







var routes = [
    {
        path: '',
        component: _community_event_page__WEBPACK_IMPORTED_MODULE_6__["CommunityEventPage"]
    }
];
var CommunityEventPageModule = /** @class */ (function () {
    function CommunityEventPageModule() {
    }
    CommunityEventPageModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
                _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["IonicModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_4__["RouterModule"].forChild(routes)
            ],
            declarations: [_community_event_page__WEBPACK_IMPORTED_MODULE_6__["CommunityEventPage"]]
        })
    ], CommunityEventPageModule);
    return CommunityEventPageModule;
}());



/***/ }),

/***/ "./src/app/community-event/community-event.page.scss":
/*!***********************************************************!*\
  !*** ./src/app/community-event/community-event.page.scss ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2NvbW11bml0eS1ldmVudC9jb21tdW5pdHktZXZlbnQucGFnZS5zY3NzIn0= */"

/***/ }),

/***/ "./src/app/community-event/community-event.page.ts":
/*!*********************************************************!*\
  !*** ./src/app/community-event/community-event.page.ts ***!
  \*********************************************************/
/*! exports provided: CommunityEventPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CommunityEventPage", function() { return CommunityEventPage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _users_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../users.service */ "./src/app/users.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _navigation_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../navigation.service */ "./src/app/navigation.service.ts");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _mapbox_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../mapbox.service */ "./src/app/mapbox.service.ts");







var CommunityEventPage = /** @class */ (function () {
    function CommunityEventPage(navigationService, userService, mapboxService, router, events) {
        this.navigationService = navigationService;
        this.userService = userService;
        this.mapboxService = mapboxService;
        this.router = router;
        this.events = events;
        this.coordinates = [];
        this.features = [];
        this.place = [];
        console.log("why");
        this.checkState();
        this.events.publish('currentPage:home', false);
    }
    CommunityEventPage.prototype.checkState = function () {
        this.user = this.userService.returnUserProfile();
        console.log(this.user);
        if (this.user[0] === undefined) {
            console.log(true);
            this.router.navigate(['/login']);
        }
    };
    CommunityEventPage.prototype.autocomplete = function () {
        var _this = this;
        this.clearArray(this.place);
        // console.log(this.result);
        this.mapboxService.autoComplete(this.searchString).subscribe(function (data) {
            _this.result = data;
            console.log(_this.result);
            _this.features = _this.result.features;
            console.log(_this.features);
            for (var i = 0; i < _this.features.length; i++) {
                //this.coordinates.push(this.features[i])
                _this.place.push({
                    coordinates: _this.features[i].geometry.coordinates,
                    place: _this.features[i].place_name,
                    name: _this.features[i].text,
                    // region : this.features[i].context[0].text,
                    // regionCode : this.features[i].context[0].short_code,
                    // country : this.features[i].context[1].text,
                    //code : this.features[i].context[1].wikidata,
                    context: _this.features[i].context
                });
            }
            console.log("Hello  ------------------------------------");
            console.log(_this.features);
            console.log(_this.coordinates);
            //this.check(this.result)
            console.log("place           --------------------------");
            console.log(_this.place);
        });
    };
    CommunityEventPage.prototype.clearArray = function (array) {
        for (var i = 0; i < array.length; i++) {
            array.splice(i);
        }
    };
    CommunityEventPage.prototype.check = function (data) {
        var result = data;
        var coordinates;
        for (var i = 0; i < result.length; i++) {
            coordinates = result.features[i].geometry.coordinates;
        }
        console.log(coordinates);
    };
    CommunityEventPage.prototype.ngOnInit = function () {
    };
    CommunityEventPage.ctorParameters = function () { return [
        { type: _navigation_service__WEBPACK_IMPORTED_MODULE_4__["NavigationService"] },
        { type: _users_service__WEBPACK_IMPORTED_MODULE_2__["UsersService"] },
        { type: _mapbox_service__WEBPACK_IMPORTED_MODULE_6__["MapboxService"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"] },
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["Events"] }
    ]; };
    CommunityEventPage = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-community-event',
            template: __webpack_require__(/*! raw-loader!./community-event.page.html */ "./node_modules/raw-loader/index.js!./src/app/community-event/community-event.page.html"),
            styles: [__webpack_require__(/*! ./community-event.page.scss */ "./src/app/community-event/community-event.page.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_navigation_service__WEBPACK_IMPORTED_MODULE_4__["NavigationService"], _users_service__WEBPACK_IMPORTED_MODULE_2__["UsersService"], _mapbox_service__WEBPACK_IMPORTED_MODULE_6__["MapboxService"], _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"], _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["Events"]])
    ], CommunityEventPage);
    return CommunityEventPage;
}());



/***/ }),

/***/ "./src/app/mapbox.service.ts":
/*!***********************************!*\
  !*** ./src/app/mapbox.service.ts ***!
  \***********************************/
/*! exports provided: MapboxService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MapboxService", function() { return MapboxService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");



var MapboxService = /** @class */ (function () {
    function MapboxService(http) {
        this.http = http;
        this.city = "Pretoria";
        this.address = '//api.mapbox.com/geocoding/v5/mapbox.places/';
        this.AppID = "&APPID=13e0cbb2f2cede6f03e901ab6f8f53e8";
        this.returnParameters = "limit=10&country=za";
        this.apiKey = 'pk.eyJ1Ijoid2lsMW5ndDBuIiwiYSI6ImNrMG1mbnZqcDEydjMzbW40bWNtMmU4NjgifQ.6ggdrR-Y2ng55vBDhU7Xlg';
        this.fullstring = '//api.mapbox.com/geocoding/v5/mapbox.places/451.json?limit=10&country=za&access_token=pk.eyJ1Ijoid2lsMW5ndDBuIiwiYSI6ImNrMG1mbnZqcDEydjMzbW40bWNtMmU4NjgifQ.6ggdrR-Y2ng55vBDhU7Xlg';
    }
    MapboxService.prototype.autoComplete = function (place) {
        return this.http.get(this.address + place + '.json?' + this.returnParameters + '&access_token=' + this.apiKey);
    };
    MapboxService.ctorParameters = function () { return [
        { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"] }
    ]; };
    MapboxService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
            providedIn: 'root'
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"]])
    ], MapboxService);
    return MapboxService;
}());



/***/ })

}]);
//# sourceMappingURL=community-event-community-event-module-es5.js.map