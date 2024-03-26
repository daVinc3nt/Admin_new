"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdministrativeOperation = exports.ScheduleOperation = exports.OrdersOperation = exports.ShipmentsOperation = exports.ShippersOperation = exports.PartnerStaffOperation = exports.BusinessOperation = exports.VehicleOperation = exports.StaffsOperation = exports.TransportPartnersOperation = exports.AgencyOperation = exports.UsersOperation = exports.PartnerStaffAuthenticate = exports.BusinessAuthenticate = exports.StaffsAuthenticate = exports.UsersAuthenticate = void 0;
var axios_1 = require("axios");
var FormData = require("form-data");
var JSZip = require("jszip");
// socket.on("connect", () => {
//     console.log("Connected to server.");
// });
// socket.on("notifyError", message => {
//     // showing custome notification on UI
// });
// socket.on("notifySuccessCreatedNewOrder", message => {
//     // showing custome notification on UI
// });
// socket.on("notifyFailCreatedNewOrder", message => {
//     // showing custome notification on UI
// });
var UsersAuthenticate = /** @class */ (function () {
    function UsersAuthenticate() {
        // this.baseUrl = "https://tdlogistics.govt.hu/api/v1/users";
        this.baseUrl = "http://localhost:5000/api/v1/users";
    }
    UsersAuthenticate.prototype.sendOTP = function (phoneNumber, email) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var response, data, error_1;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.post("".concat(this.baseUrl, "/send_otp"), {
                                phone_number: phoneNumber,
                                email: email,
                            }, {
                                withCredentials: true,
                            })];
                    case 1:
                        response = _c.sent();
                        data = response.data;
                        return [2 /*return*/, { error: data.error, message: data.message }];
                    case 2:
                        error_1 = _c.sent();
                        console.log("Error sending OTP: ", (_a = error_1 === null || error_1 === void 0 ? void 0 : error_1.response) === null || _a === void 0 ? void 0 : _a.data);
                        console.error("Request that caused the error: ", error_1 === null || error_1 === void 0 ? void 0 : error_1.request);
                        return [2 /*return*/, { error: (_b = error_1 === null || error_1 === void 0 ? void 0 : error_1.response) === null || _b === void 0 ? void 0 : _b.data, request: error_1 === null || error_1 === void 0 ? void 0 : error_1.request, status: error_1.response ? error_1.response.status : null }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    UsersAuthenticate.prototype.verifyOTP = function (phoneNumber, otp) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var response, data, error_2;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.post("".concat(this.baseUrl, "/verify_otp"), {
                                phone_number: phoneNumber,
                                otp: otp,
                            }, {
                                withCredentials: true,
                            })];
                    case 1:
                        response = _c.sent();
                        data = response.data;
                        return [2 /*return*/, { error: data.error, valid: data.valid, message: data.message }];
                    case 2:
                        error_2 = _c.sent();
                        console.log("Error verifying OTP:", (_a = error_2 === null || error_2 === void 0 ? void 0 : error_2.response) === null || _a === void 0 ? void 0 : _a.data);
                        console.error("Request that caused the error: ", error_2 === null || error_2 === void 0 ? void 0 : error_2.request);
                        return [2 /*return*/, { error: (_b = error_2 === null || error_2 === void 0 ? void 0 : error_2.response) === null || _b === void 0 ? void 0 : _b.data, request: error_2 === null || error_2 === void 0 ? void 0 : error_2.request, status: error_2.response ? error_2.response.status : null }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return UsersAuthenticate;
}());
exports.UsersAuthenticate = UsersAuthenticate;
var StaffsAuthenticate = /** @class */ (function () {
    function StaffsAuthenticate() {
        // this.baseUrl = "https://tdlogistics.govt.hu/api/v1/staffs";
        this.baseUrl = "http://localhost:5000/api/v1/staffs";
    }
    StaffsAuthenticate.prototype.login = function (username, password) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var response, data, error_3;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.post("".concat(this.baseUrl, "/login"), {
                                username: username,
                                password: password,
                            }, {
                                withCredentials: true,
                            })];
                    case 1:
                        response = _c.sent();
                        data = response.data;
                        return [2 /*return*/, { error: data.error, valid: data.valid, message: data.message }];
                    case 2:
                        error_3 = _c.sent();
                        console.log("Error logging in: ", (_a = error_3 === null || error_3 === void 0 ? void 0 : error_3.response) === null || _a === void 0 ? void 0 : _a.data);
                        console.error("Request that caused the error: ", error_3 === null || error_3 === void 0 ? void 0 : error_3.request);
                        return [2 /*return*/, { error: (_b = error_3 === null || error_3 === void 0 ? void 0 : error_3.response) === null || _b === void 0 ? void 0 : _b.data, request: error_3 === null || error_3 === void 0 ? void 0 : error_3.request, status: error_3.response ? error_3.response.status : null }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    StaffsAuthenticate.prototype.sendOTP = function (phone_number, email) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var response, data, error_4;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.post("".concat(this.baseUrl, "/send_otp"), {
                                phone_number: phone_number,
                                email: email,
                            }, {
                                withCredentials: true,
                            })];
                    case 1:
                        response = _c.sent();
                        data = response.data;
                        return [2 /*return*/, { error: data.error, message: data.message }];
                    case 2:
                        error_4 = _c.sent();
                        console.log("Error sending OTP: ", (_a = error_4 === null || error_4 === void 0 ? void 0 : error_4.response) === null || _a === void 0 ? void 0 : _a.data);
                        console.error("Request that caused the error: ", error_4 === null || error_4 === void 0 ? void 0 : error_4.request);
                        return [2 /*return*/, { error: (_b = error_4 === null || error_4 === void 0 ? void 0 : error_4.response) === null || _b === void 0 ? void 0 : _b.data, request: error_4 === null || error_4 === void 0 ? void 0 : error_4.request, status: error_4.response ? error_4.response.status : null }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    StaffsAuthenticate.prototype.verifyOTP = function (phone_number, email, otp) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var response, data, error_5;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.post("".concat(this.baseUrl, "/verify_otp"), {
                                phone_number: phone_number,
                                email: email,
                                otp: otp,
                            }, {
                                withCredentials: true,
                            })];
                    case 1:
                        response = _c.sent();
                        data = response.data;
                        return [2 /*return*/, { error: data.error, message: data.message }];
                    case 2:
                        error_5 = _c.sent();
                        console.log("Error verify OTP", (_a = error_5 === null || error_5 === void 0 ? void 0 : error_5.response) === null || _a === void 0 ? void 0 : _a.data);
                        console.error("Request that caused the error: ", error_5 === null || error_5 === void 0 ? void 0 : error_5.request);
                        return [2 /*return*/, { error: (_b = error_5 === null || error_5 === void 0 ? void 0 : error_5.response) === null || _b === void 0 ? void 0 : _b.data, request: error_5 === null || error_5 === void 0 ? void 0 : error_5.request, status: error_5.response ? error_5.response.status : null }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return StaffsAuthenticate;
}());
exports.StaffsAuthenticate = StaffsAuthenticate;
var BusinessAuthenticate = /** @class */ (function () {
    function BusinessAuthenticate() {
        // this.baseUrl = "https://tdlogistics.govt.hu/api/v1/business";
        this.baseUrl = "http://localhost:5000/api/v1/business";
    }
    BusinessAuthenticate.prototype.login = function (username, password) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var response, data, error_6;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.post("".concat(this.baseUrl, "/login"), {
                                username: username,
                                password: password,
                            }, {
                                withCredentials: true,
                            })];
                    case 1:
                        response = _c.sent();
                        data = response.data;
                        return [2 /*return*/, { error: data.error, valid: data.valid, message: data.message }];
                    case 2:
                        error_6 = _c.sent();
                        console.log("Error logging in: ", (_a = error_6 === null || error_6 === void 0 ? void 0 : error_6.response) === null || _a === void 0 ? void 0 : _a.data);
                        console.error("Request that caused the error: ", error_6 === null || error_6 === void 0 ? void 0 : error_6.request);
                        return [2 /*return*/, { error: (_b = error_6 === null || error_6 === void 0 ? void 0 : error_6.response) === null || _b === void 0 ? void 0 : _b.data, request: error_6 === null || error_6 === void 0 ? void 0 : error_6.request, status: error_6.response ? error_6.response.status : null }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return BusinessAuthenticate;
}());
exports.BusinessAuthenticate = BusinessAuthenticate;
var PartnerStaffAuthenticate = /** @class */ (function () {
    function PartnerStaffAuthenticate() {
        // this.baseUrl = "https://tdlogistics.govt.hu/api/v1/partner_staffs";
        this.baseUrl = "http://localhost:5000/api/v1/partner_staffs";
    }
    PartnerStaffAuthenticate.prototype.login = function (username, password) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var response, data, error_7;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.post("".concat(this.baseUrl, "/login"), {
                                username: username,
                                password: password,
                            }, {
                                withCredentials: true,
                            })];
                    case 1:
                        response = _c.sent();
                        data = response.data;
                        return [2 /*return*/, { error: data.error, valid: data.valid, message: data.message }];
                    case 2:
                        error_7 = _c.sent();
                        console.log("Error logging in: ", (_a = error_7 === null || error_7 === void 0 ? void 0 : error_7.response) === null || _a === void 0 ? void 0 : _a.data);
                        console.error("Request that caused the error: ", error_7 === null || error_7 === void 0 ? void 0 : error_7.request);
                        return [2 /*return*/, { error: (_b = error_7 === null || error_7 === void 0 ? void 0 : error_7.response) === null || _b === void 0 ? void 0 : _b.data, request: error_7 === null || error_7 === void 0 ? void 0 : error_7.request, status: error_7.response ? error_7.response.status : null }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return PartnerStaffAuthenticate;
}());
exports.PartnerStaffAuthenticate = PartnerStaffAuthenticate;
var UsersOperation = /** @class */ (function () {
    function UsersOperation() {
        // this.baseUrl = "https://tdlogistics.govt.hu/api/v1/users";
        this.baseUrl = "http://localhost:5000/api/v1/users";
    }
    UsersOperation.prototype.findByUser = function (condition) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var response, data, error_8;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.post("".concat(this.baseUrl, "/search"), condition, {
                                withCredentials: true,
                            })];
                    case 1:
                        response = _c.sent();
                        data = response.data;
                        return [2 /*return*/, { error: data.error, data: data.data, message: data.message }];
                    case 2:
                        error_8 = _c.sent();
                        console.log("Error get one user: ", (_a = error_8 === null || error_8 === void 0 ? void 0 : error_8.response) === null || _a === void 0 ? void 0 : _a.data);
                        console.error("Request that caused the error: ", error_8 === null || error_8 === void 0 ? void 0 : error_8.request);
                        return [2 /*return*/, { error: (_b = error_8 === null || error_8 === void 0 ? void 0 : error_8.response) === null || _b === void 0 ? void 0 : _b.data, request: error_8 === null || error_8 === void 0 ? void 0 : error_8.request, status: error_8.response ? error_8.response.status : null }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    UsersOperation.prototype.findByAdmin = function (conditions) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var response, data, error_9;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.post("".concat(this.baseUrl, "/search"), conditions, {
                                withCredentials: true,
                            })];
                    case 1:
                        response = _c.sent();
                        data = response.data;
                        return [2 /*return*/, { error: data.error, data: data.data, message: data.message }];
                    case 2:
                        error_9 = _c.sent();
                        console.log("Error get one user: ", (_a = error_9 === null || error_9 === void 0 ? void 0 : error_9.response) === null || _a === void 0 ? void 0 : _a.data);
                        console.error("Request that caused the error: ", error_9 === null || error_9 === void 0 ? void 0 : error_9.request);
                        return [2 /*return*/, { error: (_b = error_9 === null || error_9 === void 0 ? void 0 : error_9.response) === null || _b === void 0 ? void 0 : _b.data, request: error_9 === null || error_9 === void 0 ? void 0 : error_9.request, status: error_9.response ? error_9.response.status : null }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    UsersOperation.prototype.create = function (info) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var response, data, error_10;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.post("".concat(this.baseUrl, "/create"), info, {
                                withCredentials: true,
                            })];
                    case 1:
                        response = _c.sent();
                        data = response.data;
                        return [2 /*return*/, { error: data.error, data: data.data, message: data.message }];
                    case 2:
                        error_10 = _c.sent();
                        console.log("Error create new user: ", (_a = error_10 === null || error_10 === void 0 ? void 0 : error_10.response) === null || _a === void 0 ? void 0 : _a.data);
                        console.error("Request that caused the error: ", error_10 === null || error_10 === void 0 ? void 0 : error_10.request);
                        return [2 /*return*/, { error: (_b = error_10 === null || error_10 === void 0 ? void 0 : error_10.response) === null || _b === void 0 ? void 0 : _b.data, request: error_10 === null || error_10 === void 0 ? void 0 : error_10.request, status: error_10.response ? error_10.response.status : null }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    UsersOperation.prototype.update = function (info, condition) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var response, data, error_11;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.put("".concat(this.baseUrl, "/update?user_id=").concat(condition.user_id), info, {
                                withCredentials: true,
                            })];
                    case 1:
                        response = _c.sent();
                        data = response.data;
                        return [2 /*return*/, { error: data.error, data: data.data, message: data.message }];
                    case 2:
                        error_11 = _c.sent();
                        console.log("Error update new user: ", (_a = error_11 === null || error_11 === void 0 ? void 0 : error_11.response) === null || _a === void 0 ? void 0 : _a.data);
                        console.error("Request that caused the error: ", error_11 === null || error_11 === void 0 ? void 0 : error_11.request);
                        return [2 /*return*/, { error: (_b = error_11 === null || error_11 === void 0 ? void 0 : error_11.response) === null || _b === void 0 ? void 0 : _b.data, request: error_11 === null || error_11 === void 0 ? void 0 : error_11.request, status: error_11.response ? error_11.response.status : null }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return UsersOperation;
}());
exports.UsersOperation = UsersOperation;
var AgencyOperation = /** @class */ (function () {
    function AgencyOperation() {
        // this.baseUrl = "https://tdlogistics.govt.hu/api/v1/agencies";
        this.baseUrl = "http://localhost:5000/api/v1/agencies";
    }
    AgencyOperation.prototype.checkExist = function (condition) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var response, data, error_12;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.post("".concat(this.baseUrl, "/check?agency_id=").concat(condition.agency_id), {
                                withCredentials: true,
                            })];
                    case 1:
                        response = _c.sent();
                        data = response.data;
                        return [2 /*return*/, { error: data.error, message: data.message }];
                    case 2:
                        error_12 = _c.sent();
                        console.log("Error checking exist agency: ", (_a = error_12 === null || error_12 === void 0 ? void 0 : error_12.response) === null || _a === void 0 ? void 0 : _a.data);
                        console.error("Request that caused the error: ", error_12 === null || error_12 === void 0 ? void 0 : error_12.request);
                        return [2 /*return*/, { error: (_b = error_12 === null || error_12 === void 0 ? void 0 : error_12.response) === null || _b === void 0 ? void 0 : _b.data, request: error_12 === null || error_12 === void 0 ? void 0 : error_12.request, status: error_12.response ? error_12.response.status : null }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    AgencyOperation.prototype.create = function (info) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var response, data, error_13;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.post("".concat(this.baseUrl, "/create"), info, {
                                withCredentials: true,
                            })];
                    case 1:
                        response = _c.sent();
                        data = response.data;
                        return [2 /*return*/, { error: data.error, message: data.message }];
                    case 2:
                        error_13 = _c.sent();
                        console.log("Error creating agency: ", (_a = error_13 === null || error_13 === void 0 ? void 0 : error_13.response) === null || _a === void 0 ? void 0 : _a.data);
                        console.error("Request that caused the error: ", error_13 === null || error_13 === void 0 ? void 0 : error_13.request);
                        return [2 /*return*/, { error: (_b = error_13 === null || error_13 === void 0 ? void 0 : error_13.response) === null || _b === void 0 ? void 0 : _b.data, request: error_13 === null || error_13 === void 0 ? void 0 : error_13.request, status: error_13.response ? error_13.response.status : null }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    AgencyOperation.prototype.findByAgency = function (conditions) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var response, data, error_14;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.post("".concat(this.baseUrl, "/search"), conditions, {
                                withCredentials: true,
                            })];
                    case 1:
                        response = _c.sent();
                        data = response.data;
                        return [2 /*return*/, { error: data.error, data: data.data, message: data.message }];
                    case 2:
                        error_14 = _c.sent();
                        console.log("Error finding agency: ", (_a = error_14 === null || error_14 === void 0 ? void 0 : error_14.response) === null || _a === void 0 ? void 0 : _a.data);
                        console.error("Request that caused the error: ", error_14 === null || error_14 === void 0 ? void 0 : error_14.request);
                        return [2 /*return*/, { error: (_b = error_14 === null || error_14 === void 0 ? void 0 : error_14.response) === null || _b === void 0 ? void 0 : _b.data, request: error_14 === null || error_14 === void 0 ? void 0 : error_14.request, status: error_14.response ? error_14.response.status : null }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    AgencyOperation.prototype.findByAdmin = function (conditions) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var response, data, error_15;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.post("".concat(this.baseUrl, "/search"), conditions, {
                                withCredentials: true,
                            })];
                    case 1:
                        response = _c.sent();
                        data = response.data;
                        return [2 /*return*/, { error: data.error, data: data.data, message: data.message }];
                    case 2:
                        error_15 = _c.sent();
                        console.log("Error finding agency: ", (_a = error_15 === null || error_15 === void 0 ? void 0 : error_15.response) === null || _a === void 0 ? void 0 : _a.data);
                        console.error("Request that caused the error: ", error_15 === null || error_15 === void 0 ? void 0 : error_15.request);
                        return [2 /*return*/, { error: (_b = error_15 === null || error_15 === void 0 ? void 0 : error_15.response) === null || _b === void 0 ? void 0 : _b.data, request: error_15 === null || error_15 === void 0 ? void 0 : error_15.request, status: error_15.response ? error_15.response.status : null }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    AgencyOperation.prototype.update = function (info, condition) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var response, data, error_16;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.put("".concat(this.baseUrl, "/update?agency_id=").concat(condition.agency_id), info, {
                                withCredentials: true,
                            })];
                    case 1:
                        response = _c.sent();
                        data = response.data;
                        return [2 /*return*/, { error: data.error, data: data.data, message: data.message }];
                    case 2:
                        error_16 = _c.sent();
                        console.log("Error finding agency: ", (_a = error_16 === null || error_16 === void 0 ? void 0 : error_16.response) === null || _a === void 0 ? void 0 : _a.data);
                        console.error("Request that caused the error: ", error_16 === null || error_16 === void 0 ? void 0 : error_16.request);
                        return [2 /*return*/, { error: (_b = error_16 === null || error_16 === void 0 ? void 0 : error_16.response) === null || _b === void 0 ? void 0 : _b.data, request: error_16 === null || error_16 === void 0 ? void 0 : error_16.request, status: error_16.response ? error_16.response.status : null }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    AgencyOperation.prototype.delete = function (condition) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var response, data, error_17;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.delete("".concat(this.baseUrl, "/delete?agency_id=").concat(condition.agency_id), {
                                withCredentials: true,
                            })];
                    case 1:
                        response = _c.sent();
                        data = response.data;
                        return [2 /*return*/, { error: data.error, data: data.data, message: data.message }];
                    case 2:
                        error_17 = _c.sent();
                        console.log("Error finding agency: ", (_a = error_17 === null || error_17 === void 0 ? void 0 : error_17.response) === null || _a === void 0 ? void 0 : _a.data);
                        console.error("Request that caused the error: ", error_17 === null || error_17 === void 0 ? void 0 : error_17.request);
                        return [2 /*return*/, { error: (_b = error_17 === null || error_17 === void 0 ? void 0 : error_17.response) === null || _b === void 0 ? void 0 : _b.data, request: error_17 === null || error_17 === void 0 ? void 0 : error_17.request, status: error_17.response ? error_17.response.status : null }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    AgencyOperation.prototype.updateLicense = function (info, condition) {
        return __awaiter(this, void 0, void 0, function () {
            var formData, i, response, error_18;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        formData = new FormData();
                        for (i = 0; i < info.licenseFiles.length; i++) {
                            formData.append('files', info.licenseFiles[i]);
                        }
                        return [4 /*yield*/, axios_1.default.post("".concat(this.baseUrl, "/update_agency_company_license?agency_id=").concat(condition.agency_id), formData, {
                                withCredentials: true,
                            })];
                    case 1:
                        response = _a.sent();
                        console.log('Image uploaded successfully:', response.data);
                        return [2 /*return*/, response.data]; // Trả về dữ liệu phản hồi từ máy chủ
                    case 2:
                        error_18 = _a.sent();
                        console.error('Error uploading image:', error_18.response.data);
                        throw error_18; // Ném lỗi để xử lý bên ngoài
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    AgencyOperation.prototype.findLicense = function (condition) {
        return __awaiter(this, void 0, void 0, function () {
            var response, zipFile_1, imageUrls_1, error_19;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        return [4 /*yield*/, axios_1.default.get("".concat(this.baseUrl, "/search_agency_company_license?agency_id=").concat(condition.agency_id), {
                                responseType: 'arraybuffer', // Ensure response is treated as a binary buffer
                                withCredentials: true,
                            })];
                    case 1:
                        response = _a.sent();
                        return [4 /*yield*/, JSZip.loadAsync(response.data)];
                    case 2:
                        zipFile_1 = _a.sent();
                        imageUrls_1 = [];
                        // Extract each file from the ZIP archive and create object URLs
                        return [4 /*yield*/, Promise.all(Object.keys(zipFile_1.files).map(function (filename) { return __awaiter(_this, void 0, void 0, function () {
                                var file, blob, url;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            file = zipFile_1.files[filename];
                                            return [4 /*yield*/, file.async('blob')];
                                        case 1:
                                            blob = _a.sent();
                                            url = URL.createObjectURL(blob);
                                            imageUrls_1.push(url);
                                            return [2 /*return*/];
                                    }
                                });
                            }); }))];
                    case 3:
                        // Extract each file from the ZIP archive and create object URLs
                        _a.sent();
                        return [2 /*return*/, imageUrls_1];
                    case 4:
                        error_19 = _a.sent();
                        console.error('Error getting image:', error_19.message);
                        throw error_19; // Ném lỗi để xử lý bên ngoài
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    return AgencyOperation;
}());
exports.AgencyOperation = AgencyOperation;
var TransportPartnersOperation = /** @class */ (function () {
    function TransportPartnersOperation() {
        // this.baseUrl = "https://tdlogistics.govt.hu/api/v1/transport_partners";
        this.baseUrl = "http://localhost:5000/api/v1/transport_partners";
    }
    TransportPartnersOperation.prototype.createByAdmin = function (info) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var response, data, error_20;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.post("".concat(this.baseUrl, "/create"), info, {
                                withCredentials: true,
                            })];
                    case 1:
                        response = _c.sent();
                        data = response.data;
                        return [2 /*return*/, { error: data.error, message: data.message }];
                    case 2:
                        error_20 = _c.sent();
                        console.log("Error creating new transport partner: ", (_a = error_20 === null || error_20 === void 0 ? void 0 : error_20.response) === null || _a === void 0 ? void 0 : _a.data);
                        console.error("Request that caused the error: ", error_20 === null || error_20 === void 0 ? void 0 : error_20.request);
                        return [2 /*return*/, { error: (_b = error_20 === null || error_20 === void 0 ? void 0 : error_20.response) === null || _b === void 0 ? void 0 : _b.data, request: error_20 === null || error_20 === void 0 ? void 0 : error_20.request, status: error_20.response ? error_20.response.status : null }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    TransportPartnersOperation.prototype.createByAgency = function (info) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var response, data, error_21;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.post("".concat(this.baseUrl, "/create"), info, {
                                withCredentials: true,
                            })];
                    case 1:
                        response = _c.sent();
                        data = response.data;
                        return [2 /*return*/, { error: data.error, message: data.message }];
                    case 2:
                        error_21 = _c.sent();
                        console.log("Error creating new transport partner: ", (_a = error_21 === null || error_21 === void 0 ? void 0 : error_21.response) === null || _a === void 0 ? void 0 : _a.data);
                        console.error("Request that caused the error: ", error_21 === null || error_21 === void 0 ? void 0 : error_21.request);
                        return [2 /*return*/, { error: (_b = error_21 === null || error_21 === void 0 ? void 0 : error_21.response) === null || _b === void 0 ? void 0 : _b.data, request: error_21 === null || error_21 === void 0 ? void 0 : error_21.request, status: error_21.response ? error_21.response.status : null }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    TransportPartnersOperation.prototype.findByTransportPartner = function (condition) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var response, data, error_22;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.post("".concat(this.baseUrl, "/search"), condition, {
                                withCredentials: true,
                            })];
                    case 1:
                        response = _c.sent();
                        data = response.data;
                        return [2 /*return*/, { error: data.error, data: data.data, message: data.message }];
                    case 2:
                        error_22 = _c.sent();
                        console.log("Error finding transport partner: ", (_a = error_22 === null || error_22 === void 0 ? void 0 : error_22.response) === null || _a === void 0 ? void 0 : _a.data);
                        console.error("Request that caused the error: ", error_22 === null || error_22 === void 0 ? void 0 : error_22.request);
                        return [2 /*return*/, { error: (_b = error_22 === null || error_22 === void 0 ? void 0 : error_22.response) === null || _b === void 0 ? void 0 : _b.data, request: error_22 === null || error_22 === void 0 ? void 0 : error_22.request, status: error_22.response ? error_22.response.status : null }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    TransportPartnersOperation.prototype.findByAdmin = function (conditions) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var response, data, error_23;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.post("".concat(this.baseUrl, "/search"), conditions, {
                                withCredentials: true,
                            })];
                    case 1:
                        response = _c.sent();
                        data = response.data;
                        return [2 /*return*/, { error: data.error, data: data.data, message: data.message }];
                    case 2:
                        error_23 = _c.sent();
                        console.log("Error finding transport partner: ", (_a = error_23 === null || error_23 === void 0 ? void 0 : error_23.response) === null || _a === void 0 ? void 0 : _a.data);
                        console.error("Request that caused the error: ", error_23 === null || error_23 === void 0 ? void 0 : error_23.request);
                        return [2 /*return*/, { error: (_b = error_23 === null || error_23 === void 0 ? void 0 : error_23.response) === null || _b === void 0 ? void 0 : _b.data, request: error_23 === null || error_23 === void 0 ? void 0 : error_23.request, status: error_23.response ? error_23.response.status : null }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    TransportPartnersOperation.prototype.update = function (info, condition) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var response, data, error_24;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.put("".concat(this.baseUrl, "/update?transport_partner_id=").concat(condition.transport_partner_id), info, {
                                withCredentials: true,
                            })];
                    case 1:
                        response = _c.sent();
                        data = response.data;
                        return [2 /*return*/, { error: data.error, message: data.message }];
                    case 2:
                        error_24 = _c.sent();
                        console.log("Error updating transport partner: ", (_a = error_24 === null || error_24 === void 0 ? void 0 : error_24.response) === null || _a === void 0 ? void 0 : _a.data);
                        console.error("Request that caused the error: ", error_24 === null || error_24 === void 0 ? void 0 : error_24.request);
                        return [2 /*return*/, { error: (_b = error_24 === null || error_24 === void 0 ? void 0 : error_24.response) === null || _b === void 0 ? void 0 : _b.data, request: error_24 === null || error_24 === void 0 ? void 0 : error_24.request, status: error_24.response ? error_24.response.status : null }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    TransportPartnersOperation.prototype.remove = function (condition) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var response, data, error_25;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.delete("".concat(this.baseUrl, "/delete?transport_partner_id=").concat(condition.transport_partner_id), {
                                withCredentials: true,
                            })];
                    case 1:
                        response = _c.sent();
                        data = response.data;
                        return [2 /*return*/, { error: data.error, message: data.message }];
                    case 2:
                        error_25 = _c.sent();
                        console.log("Error deleting transport partner: ", (_a = error_25 === null || error_25 === void 0 ? void 0 : error_25.response) === null || _a === void 0 ? void 0 : _a.data);
                        console.error("Request that caused the error: ", error_25 === null || error_25 === void 0 ? void 0 : error_25.request);
                        return [2 /*return*/, { error: (_b = error_25 === null || error_25 === void 0 ? void 0 : error_25.response) === null || _b === void 0 ? void 0 : _b.data, request: error_25 === null || error_25 === void 0 ? void 0 : error_25.request, status: error_25.response ? error_25.response.status : null }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return TransportPartnersOperation;
}());
exports.TransportPartnersOperation = TransportPartnersOperation;
var VehicleOperation = /** @class */ (function () {
    function VehicleOperation() {
        // this.baseUrl = "https://tdlogistics.govt.hu/api/v1/vehicles";
        this.baseUrl = "http://localhost:5000/api/v1/vehicles";
    }
    VehicleOperation.prototype.checkExist = function (condition) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var response, data, error_26;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.post("".concat(this.baseUrl, "/check?vehicle_id=").concat(condition.vehicle_id), {
                                withCredentials: true,
                            })];
                    case 1:
                        response = _c.sent();
                        data = response.data;
                        return [2 /*return*/, { error: data.error, existed: data.existed, message: data.message }];
                    case 2:
                        error_26 = _c.sent();
                        console.log("Error checking exist vehicle: ", (_a = error_26 === null || error_26 === void 0 ? void 0 : error_26.response) === null || _a === void 0 ? void 0 : _a.data);
                        console.error("Request that caused the error: ", error_26 === null || error_26 === void 0 ? void 0 : error_26.request);
                        return [2 /*return*/, { error: (_b = error_26 === null || error_26 === void 0 ? void 0 : error_26.response) === null || _b === void 0 ? void 0 : _b.data, request: error_26 === null || error_26 === void 0 ? void 0 : error_26.request, status: error_26.response ? error_26.response.status : null }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    VehicleOperation.prototype.createByAgency = function (info) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var response, data, error_27;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.post("".concat(this.baseUrl, "/create"), info, {
                                withCredentials: true,
                            })];
                    case 1:
                        response = _c.sent();
                        data = response.data;
                        return [2 /*return*/, { error: data.error, message: data.message }];
                    case 2:
                        error_27 = _c.sent();
                        console.log("Error creating new vehicle: ", (_a = error_27 === null || error_27 === void 0 ? void 0 : error_27.response) === null || _a === void 0 ? void 0 : _a.data);
                        console.error("Request that caused the error: ", error_27 === null || error_27 === void 0 ? void 0 : error_27.request);
                        return [2 /*return*/, { error: (_b = error_27 === null || error_27 === void 0 ? void 0 : error_27.response) === null || _b === void 0 ? void 0 : _b.data, request: error_27 === null || error_27 === void 0 ? void 0 : error_27.request, status: error_27.response ? error_27.response.status : null }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    VehicleOperation.prototype.createByAdmin = function (info) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var response, data, error_28;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.post("".concat(this.baseUrl, "/create"), info, {
                                withCredentials: true,
                            })];
                    case 1:
                        response = _c.sent();
                        data = response.data;
                        return [2 /*return*/, { error: data.error, message: data.message }];
                    case 2:
                        error_28 = _c.sent();
                        console.log("Error creating new vehicle: ", (_a = error_28 === null || error_28 === void 0 ? void 0 : error_28.response) === null || _a === void 0 ? void 0 : _a.data);
                        console.error("Request that caused the error: ", error_28 === null || error_28 === void 0 ? void 0 : error_28.request);
                        return [2 /*return*/, { error: (_b = error_28 === null || error_28 === void 0 ? void 0 : error_28.response) === null || _b === void 0 ? void 0 : _b.data, request: error_28 === null || error_28 === void 0 ? void 0 : error_28.request, status: error_28.response ? error_28.response.status : null }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    VehicleOperation.prototype.findByStaff = function (condition) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var response, data, error_29;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.post("".concat(this.baseUrl, "/search?staff_id=").concat(condition.staff_id), {
                                withCredentials: true,
                            })];
                    case 1:
                        response = _c.sent();
                        data = response.data;
                        return [2 /*return*/, { error: data.error, data: data.data, message: data.message }];
                    case 2:
                        error_29 = _c.sent();
                        console.log("Error finding vehicle: ", (_a = error_29 === null || error_29 === void 0 ? void 0 : error_29.response) === null || _a === void 0 ? void 0 : _a.data);
                        console.error("Request that caused the error: ", error_29 === null || error_29 === void 0 ? void 0 : error_29.request);
                        return [2 /*return*/, { error: (_b = error_29 === null || error_29 === void 0 ? void 0 : error_29.response) === null || _b === void 0 ? void 0 : _b.data, request: error_29 === null || error_29 === void 0 ? void 0 : error_29.request, status: error_29.response ? error_29.response.status : null }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    VehicleOperation.prototype.findByAdmin = function (conditions) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var response, data, error_30;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.post("".concat(this.baseUrl, "/search"), conditions, {
                                withCredentials: true,
                            })];
                    case 1:
                        response = _c.sent();
                        data = response.data;
                        return [2 /*return*/, { error: data.error, data: data.data, message: data.message }];
                    case 2:
                        error_30 = _c.sent();
                        console.log("Error finding vehicle: ", (_a = error_30 === null || error_30 === void 0 ? void 0 : error_30.response) === null || _a === void 0 ? void 0 : _a.data);
                        console.error("Request that caused the error: ", error_30 === null || error_30 === void 0 ? void 0 : error_30.request);
                        return [2 /*return*/, { error: (_b = error_30 === null || error_30 === void 0 ? void 0 : error_30.response) === null || _b === void 0 ? void 0 : _b.data, request: error_30 === null || error_30 === void 0 ? void 0 : error_30.request, status: error_30.response ? error_30.response.status : null }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    VehicleOperation.prototype.getShipment = function (condition) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var response, data, error_31;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.get("".concat(this.baseUrl, "/get_shipments?vehicle_id=").concat(condition.vehicle_id), {
                                withCredentials: true,
                            })];
                    case 1:
                        response = _c.sent();
                        data = response.data;
                        return [2 /*return*/, { error: data.error, data: data.data, message: data.message }];
                    case 2:
                        error_31 = _c.sent();
                        console.log("Error getting shipments contained by vehicle: ", (_a = error_31 === null || error_31 === void 0 ? void 0 : error_31.response) === null || _a === void 0 ? void 0 : _a.data);
                        console.error("Request that caused the error: ", error_31 === null || error_31 === void 0 ? void 0 : error_31.request);
                        return [2 /*return*/, { error: (_b = error_31 === null || error_31 === void 0 ? void 0 : error_31.response) === null || _b === void 0 ? void 0 : _b.data, request: error_31 === null || error_31 === void 0 ? void 0 : error_31.request, status: error_31.response ? error_31.response.status : null }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    VehicleOperation.prototype.update = function (info, condition) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var response, data, error_32;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.put("".concat(this.baseUrl, "/update?vehicle_id=").concat(condition.vehicle_id), info, {
                                withCredentials: true,
                            })];
                    case 1:
                        response = _c.sent();
                        data = response.data;
                        return [2 /*return*/, { error: data.error, message: data.message }];
                    case 2:
                        error_32 = _c.sent();
                        console.log("Error updating vehicle: ", (_a = error_32 === null || error_32 === void 0 ? void 0 : error_32.response) === null || _a === void 0 ? void 0 : _a.data);
                        console.error("Request that caused the error: ", error_32 === null || error_32 === void 0 ? void 0 : error_32.request);
                        return [2 /*return*/, { error: (_b = error_32 === null || error_32 === void 0 ? void 0 : error_32.response) === null || _b === void 0 ? void 0 : _b.data, request: error_32 === null || error_32 === void 0 ? void 0 : error_32.request, status: error_32.response ? error_32.response.status : null }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    VehicleOperation.prototype.addShipments = function (info, condition) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var response, data, error_33;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.patch("".concat(this.baseUrl, "/add_shipments?vehicle_id=").concat(condition.vehicle_id), info, {
                                withCredentials: true,
                            })];
                    case 1:
                        response = _c.sent();
                        data = response.data;
                        return [2 /*return*/, { error: data.error, info: data.info, message: data.message }];
                    case 2:
                        error_33 = _c.sent();
                        console.log("Error adding shipments to vehicle: ", (_a = error_33 === null || error_33 === void 0 ? void 0 : error_33.response) === null || _a === void 0 ? void 0 : _a.data);
                        console.error("Request that caused the error: ", error_33 === null || error_33 === void 0 ? void 0 : error_33.request);
                        return [2 /*return*/, { error: (_b = error_33 === null || error_33 === void 0 ? void 0 : error_33.response) === null || _b === void 0 ? void 0 : _b.data, request: error_33 === null || error_33 === void 0 ? void 0 : error_33.request, status: error_33.response ? error_33.response.status : null }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    VehicleOperation.prototype.deleteShipments = function (info, condition) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var response, data, error_34;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.patch("".concat(this.baseUrl, "/delete_shipments?vehicle_id=").concat(condition.vehicle_id), info, {
                                withCredentials: true,
                            })];
                    case 1:
                        response = _c.sent();
                        data = response.data;
                        return [2 /*return*/, { error: data.error, info: data.info, message: data.message }];
                    case 2:
                        error_34 = _c.sent();
                        console.log("Error deleting shipments from vehicle: ", (_a = error_34 === null || error_34 === void 0 ? void 0 : error_34.response) === null || _a === void 0 ? void 0 : _a.data);
                        console.error("Request that caused the error: ", error_34 === null || error_34 === void 0 ? void 0 : error_34.request);
                        return [2 /*return*/, { error: (_b = error_34 === null || error_34 === void 0 ? void 0 : error_34.response) === null || _b === void 0 ? void 0 : _b.data, request: error_34 === null || error_34 === void 0 ? void 0 : error_34.request, status: error_34.response ? error_34.response.status : null }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    VehicleOperation.prototype.deleteVehicle = function (condition) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var response, data, error_35;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.delete("".concat(this.baseUrl, "/delete?vehicle_id=").concat(condition.vehicle_id), {
                                withCredentials: true,
                            })];
                    case 1:
                        response = _c.sent();
                        data = response.data;
                        return [2 /*return*/, { error: data.error, message: data.message }];
                    case 2:
                        error_35 = _c.sent();
                        console.log("Error deleting vehicle: ", (_a = error_35 === null || error_35 === void 0 ? void 0 : error_35.response) === null || _a === void 0 ? void 0 : _a.data);
                        console.error("Request that caused the error: ", error_35 === null || error_35 === void 0 ? void 0 : error_35.request);
                        return [2 /*return*/, { error: (_b = error_35 === null || error_35 === void 0 ? void 0 : error_35.response) === null || _b === void 0 ? void 0 : _b.data, request: error_35 === null || error_35 === void 0 ? void 0 : error_35.request, status: error_35.response ? error_35.response.status : null }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return VehicleOperation;
}());
exports.VehicleOperation = VehicleOperation;
;
;
;
var StaffsOperation = /** @class */ (function () {
    function StaffsOperation() {
        // this.baseUrl = "https://tdlogistics.govt.hu/api/v1/staffs";
        this.baseUrl = "http://localhost:5000/api/v1/staffs";
    }
    // ROLE: any
    StaffsOperation.prototype.getAuthenticatedStaffInfo = function () {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var response, data, error_36;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.get("".concat(this.baseUrl, "/get_info"), {
                                withCredentials: true,
                            })];
                    case 1:
                        response = _c.sent();
                        data = response.data;
                        return [2 /*return*/, { error: data.error, data: data.info, message: data.message }];
                    case 2:
                        error_36 = _c.sent();
                        console.log("Error get authenticated staff information: ", (_a = error_36 === null || error_36 === void 0 ? void 0 : error_36.response) === null || _a === void 0 ? void 0 : _a.data);
                        console.error("Request that caused the error: ", error_36 === null || error_36 === void 0 ? void 0 : error_36.request);
                        return [2 /*return*/, { error: (_b = error_36 === null || error_36 === void 0 ? void 0 : error_36.response) === null || _b === void 0 ? void 0 : _b.data, request: error_36 === null || error_36 === void 0 ? void 0 : error_36.request, status: error_36.response ? error_36.response.status : null }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    // ROLE: any
    StaffsOperation.prototype.findByStaff = function (condition) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var response, data, error_37;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.post("".concat(this.baseUrl, "search?staff_id=").concat(condition.staff_id), {
                                withCredentials: true,
                            })];
                    case 1:
                        response = _c.sent();
                        data = response.data;
                        return [2 /*return*/, { error: data.error, data: data.data, message: data.message }];
                    case 2:
                        error_37 = _c.sent();
                        console.log("Error get one staff: ", (_a = error_37 === null || error_37 === void 0 ? void 0 : error_37.response) === null || _a === void 0 ? void 0 : _a.data);
                        console.error("Request that caused the error: ", error_37 === null || error_37 === void 0 ? void 0 : error_37.request);
                        return [2 /*return*/, { error: (_b = error_37 === null || error_37 === void 0 ? void 0 : error_37.response) === null || _b === void 0 ? void 0 : _b.data, request: error_37 === null || error_37 === void 0 ? void 0 : error_37.request, status: error_37.response ? error_37.response.status : null }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    // ROLE: ADMIN, TELLER, HUMAN_RESOURCE_MANAGER, COMPLAINTS_SOLVER, AGENCY_MANAGER, AGENCY_HUMAN_RESOURCE_MANAGER
    StaffsOperation.prototype.findByAdmin = function (conditions) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var response, data, error_38;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.post("".concat(this.baseUrl, "/search"), conditions, {
                                withCredentials: true,
                            })];
                    case 1:
                        response = _c.sent();
                        data = response.data;
                        return [2 /*return*/, { error: data.error, data: data.data, message: data.message }];
                    case 2:
                        error_38 = _c.sent();
                        console.log("Error get one staff: ", (_a = error_38 === null || error_38 === void 0 ? void 0 : error_38.response) === null || _a === void 0 ? void 0 : _a.data);
                        console.error("Request that caused the error: ", error_38 === null || error_38 === void 0 ? void 0 : error_38.request);
                        return [2 /*return*/, { error: (_b = error_38 === null || error_38 === void 0 ? void 0 : error_38.response) === null || _b === void 0 ? void 0 : _b.data, request: error_38 === null || error_38 === void 0 ? void 0 : error_38.request, status: error_38.response ? error_38.response.status : null }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    // ROLE: ADMIN, MANAGER, HUMAN_RESOURCE_MANAGER
    StaffsOperation.prototype.createByAdmin = function (info) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var response, data, error_39;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.post("".concat(this.baseUrl, "/create"), info, {
                                withCredentials: true,
                            })];
                    case 1:
                        response = _c.sent();
                        data = response.data;
                        return [2 /*return*/, { error: data.error, message: data.message }];
                    case 2:
                        error_39 = _c.sent();
                        console.log("Error create new staff: ", (_a = error_39 === null || error_39 === void 0 ? void 0 : error_39.response) === null || _a === void 0 ? void 0 : _a.data);
                        console.error("Request that caused the error: ", error_39 === null || error_39 === void 0 ? void 0 : error_39.request);
                        return [2 /*return*/, { error: (_b = error_39 === null || error_39 === void 0 ? void 0 : error_39.response) === null || _b === void 0 ? void 0 : _b.data, request: error_39 === null || error_39 === void 0 ? void 0 : error_39.request, status: error_39.response ? error_39.response.status : null }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    // ROLE: AGENCY_MANAGER, AGENCY_HUMAN_RESOURCE_MANAGER
    StaffsOperation.prototype.createByAgency = function (info) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var response, data, error_40;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.post("".concat(this.baseUrl, "/create"), info, {
                                withCredentials: true,
                            })];
                    case 1:
                        response = _c.sent();
                        data = response.data;
                        return [2 /*return*/, { error: data.error, message: data.message }];
                    case 2:
                        error_40 = _c.sent();
                        console.log("Error create new staff: ", (_a = error_40 === null || error_40 === void 0 ? void 0 : error_40.response) === null || _a === void 0 ? void 0 : _a.data);
                        console.error("Request that caused the error: ", error_40 === null || error_40 === void 0 ? void 0 : error_40.request);
                        return [2 /*return*/, { error: (_b = error_40 === null || error_40 === void 0 ? void 0 : error_40.response) === null || _b === void 0 ? void 0 : _b.data, request: error_40 === null || error_40 === void 0 ? void 0 : error_40.request, status: error_40.response ? error_40.response.status : null }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    // ROLE: ADMIN, MANAGER, HUMAN_RESOURCE_MANAGER, AGENCY_MANAGER, AGENCY_HUMAN_RESOURCE_MANAGER
    StaffsOperation.prototype.update = function (info, condition) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var response, data, error_41;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.put("".concat(this.baseUrl, "/update?staff_id=").concat(condition.staff_id), info, {
                                withCredentials: true,
                            })];
                    case 1:
                        response = _c.sent();
                        data = response.data;
                        return [2 /*return*/, { error: data.error, message: data.message }];
                    case 2:
                        error_41 = _c.sent();
                        console.log("Error create new staff: ", (_a = error_41 === null || error_41 === void 0 ? void 0 : error_41.response) === null || _a === void 0 ? void 0 : _a.data);
                        console.error("Request that caused the error: ", error_41 === null || error_41 === void 0 ? void 0 : error_41.request);
                        return [2 /*return*/, { error: (_b = error_41 === null || error_41 === void 0 ? void 0 : error_41.response) === null || _b === void 0 ? void 0 : _b.data, request: error_41 === null || error_41 === void 0 ? void 0 : error_41.request, status: error_41.response ? error_41.response.status : null }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    // ROLE: ADMIN, MANAGER, HUMAN_RESOURCE_MANAGER, AGENCY_MANAGER, AGENCY_HUMAN_RESOURCE_MANAGER
    StaffsOperation.prototype.deleteStaff = function (condition) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var response, data, error_42;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.delete("".concat(this.baseUrl, "/delete?staff_id=").concat(condition.staff_id), {
                                withCredentials: true,
                            })];
                    case 1:
                        response = _c.sent();
                        data = response.data;
                        return [2 /*return*/, { error: data.error, message: data.message }];
                    case 2:
                        error_42 = _c.sent();
                        console.log("Error deleting staff: ", (_a = error_42 === null || error_42 === void 0 ? void 0 : error_42.response) === null || _a === void 0 ? void 0 : _a.data);
                        console.error("Request that caused the error: ", error_42 === null || error_42 === void 0 ? void 0 : error_42.request);
                        return [2 /*return*/, { error: (_b = error_42 === null || error_42 === void 0 ? void 0 : error_42.response) === null || _b === void 0 ? void 0 : _b.data, request: error_42 === null || error_42 === void 0 ? void 0 : error_42.request, status: error_42.response ? error_42.response.status : null }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    // ROLE: ADMIN, MANAGER, HUMAN_RESOURCE_MANAGER, AGENCY_MANAGER, AGENCY_HUMAN_RESOURCE_MANAGER
    StaffsOperation.prototype.updateAvatar = function (info, condition) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var formData, response, data, error_43;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        formData = new FormData();
                        formData.append('avatar', info.avatarFile);
                        return [4 /*yield*/, axios_1.default.patch("".concat(this.baseUrl, "/update_avatar?staff_id=").concat(condition.staff_id), formData, {
                                withCredentials: true,
                            })];
                    case 1:
                        response = _c.sent();
                        data = response.data;
                        return [2 /*return*/, { error: data.error, message: data.message }];
                    case 2:
                        error_43 = _c.sent();
                        console.error('Error uploading image:', (_a = error_43 === null || error_43 === void 0 ? void 0 : error_43.response) === null || _a === void 0 ? void 0 : _a.data);
                        console.error("Request that caused the error: ", error_43 === null || error_43 === void 0 ? void 0 : error_43.request);
                        return [2 /*return*/, { error: (_b = error_43 === null || error_43 === void 0 ? void 0 : error_43.response) === null || _b === void 0 ? void 0 : _b.data, request: error_43 === null || error_43 === void 0 ? void 0 : error_43.request, status: error_43.response ? error_43.response.status : null }]; // Ném lỗi để xử lý bên ngoài
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    StaffsOperation.prototype.logout = function () {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var response, data, error_44;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.get("".concat(this.baseUrl, "/logout"), {
                                withCredentials: true,
                            })];
                    case 1:
                        response = _c.sent();
                        data = response.data;
                        return [2 /*return*/, { error: data.error, message: data.message }];
                    case 2:
                        error_44 = _c.sent();
                        console.log("Error logging out: ", (_a = error_44 === null || error_44 === void 0 ? void 0 : error_44.response) === null || _a === void 0 ? void 0 : _a.data);
                        console.error("Request that caused the error: ", error_44 === null || error_44 === void 0 ? void 0 : error_44.request);
                        return [2 /*return*/, { error: (_b = error_44 === null || error_44 === void 0 ? void 0 : error_44.response) === null || _b === void 0 ? void 0 : _b.data, request: error_44 === null || error_44 === void 0 ? void 0 : error_44.request, status: error_44.response ? error_44.response.status : null }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    // ROLE: any. But one staff can just change his/her own password.
    // So that, the staff_id in session must be the same with the staff_id in the query. 
    StaffsOperation.prototype.updatePassword = function (info, condition) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var response, data, error_45;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.patch("".concat(this.baseUrl, "/update_password?staff_id=").concat(condition.staff_id), info, {
                                withCredentials: true,
                            })];
                    case 1:
                        response = _c.sent();
                        data = response.data;
                        return [2 /*return*/, { error: data.error, data: data.data, message: data.message }];
                    case 2:
                        error_45 = _c.sent();
                        console.log("Error update password: ", (_a = error_45 === null || error_45 === void 0 ? void 0 : error_45.response) === null || _a === void 0 ? void 0 : _a.data);
                        console.error("Request that caused the error: ", error_45 === null || error_45 === void 0 ? void 0 : error_45.request);
                        return [2 /*return*/, { error: (_b = error_45 === null || error_45 === void 0 ? void 0 : error_45.response) === null || _b === void 0 ? void 0 : _b.data, request: error_45 === null || error_45 === void 0 ? void 0 : error_45.request, status: error_45.response ? error_45.response.status : null }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    // ROLE: any.
    StaffsOperation.prototype.getAvatar = function (condition) {
        return __awaiter(this, void 0, void 0, function () {
            var response, blob, imgUrl, error_46;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.get("".concat(this.baseUrl, "/get_avatar?staff_id=").concat(condition.staff_id), {
                                withCredentials: true,
                                responseType: 'arraybuffer',
                            })];
                    case 1:
                        response = _a.sent();
                        blob = new Blob([response.data], { type: response.headers['content-type'] });
                        imgUrl = URL.createObjectURL(blob);
                        return [2 /*return*/, imgUrl];
                    case 2:
                        error_46 = _a.sent();
                        console.error("Error getting avatar: ", error_46);
                        return [2 /*return*/, error_46.response.data];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return StaffsOperation;
}());
exports.StaffsOperation = StaffsOperation;
var BusinessOperation = /** @class */ (function () {
    function BusinessOperation() {
        // this.baseUrl = "https://tdlogistics.govt.hu/api/v1/business";
        this.baseUrl = "http://localhost:5000/api/v1/business";
    }
    BusinessOperation.prototype.signup = function (info) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var response, data, error_47;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.post("".concat(this.baseUrl, "/signup"), info, {
                                withCredentials: true,
                            })];
                    case 1:
                        response = _c.sent();
                        data = response.data;
                        return [2 /*return*/, { error: data.error, message: data.message }];
                    case 2:
                        error_47 = _c.sent();
                        console.log("Error signing up business: ", (_a = error_47 === null || error_47 === void 0 ? void 0 : error_47.response) === null || _a === void 0 ? void 0 : _a.data);
                        console.error("Request that caused the error: ", error_47 === null || error_47 === void 0 ? void 0 : error_47.request);
                        return [2 /*return*/, { error: (_b = error_47 === null || error_47 === void 0 ? void 0 : error_47.response) === null || _b === void 0 ? void 0 : _b.data, request: error_47 === null || error_47 === void 0 ? void 0 : error_47.request, status: error_47.response ? error_47.response.status : null }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    // "ADMIN", "MANAGER", "HUMAN_RESOURCE_MANAGER"
    BusinessOperation.prototype.createByAdmin = function (info) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var response, data, error_48;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.post("".concat(this.baseUrl, "/create"), info, {
                                withCredentials: true,
                            })];
                    case 1:
                        response = _c.sent();
                        data = response.data;
                        return [2 /*return*/, { error: data.error, message: data.message }];
                    case 2:
                        error_48 = _c.sent();
                        console.log("Error creating new business: ", (_a = error_48 === null || error_48 === void 0 ? void 0 : error_48.response) === null || _a === void 0 ? void 0 : _a.data);
                        console.error("Request that caused the error: ", error_48 === null || error_48 === void 0 ? void 0 : error_48.request);
                        return [2 /*return*/, { error: (_b = error_48 === null || error_48 === void 0 ? void 0 : error_48.response) === null || _b === void 0 ? void 0 : _b.data, request: error_48 === null || error_48 === void 0 ? void 0 : error_48.request, status: error_48.response ? error_48.response.status : null }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    // "AGENCY_MANAGER", "AGENCY_HUMAN_RESOURCE_MANAGER"
    BusinessOperation.prototype.createByAgency = function (info) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var response, data, error_49;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.post("".concat(this.baseUrl, "/create"), info, {
                                withCredentials: true,
                            })];
                    case 1:
                        response = _c.sent();
                        data = response.data;
                        return [2 /*return*/, { error: data.error, message: data.message }];
                    case 2:
                        error_49 = _c.sent();
                        console.log("Error creating new business: ", (_a = error_49 === null || error_49 === void 0 ? void 0 : error_49.response) === null || _a === void 0 ? void 0 : _a.data);
                        console.error("Request that caused the error: ", error_49 === null || error_49 === void 0 ? void 0 : error_49.request);
                        return [2 /*return*/, { error: (_b = error_49 === null || error_49 === void 0 ? void 0 : error_49.response) === null || _b === void 0 ? void 0 : _b.data, request: error_49 === null || error_49 === void 0 ? void 0 : error_49.request, status: error_49.response ? error_49.response.status : null }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    // "BUSINESS"
    BusinessOperation.prototype.findByBusiness = function (condition) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var response, data, error_50;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.post("".concat(this.baseUrl, "/search?business_id=").concat(condition.business_id), {
                                withCredentials: true,
                            })];
                    case 1:
                        response = _c.sent();
                        data = response.data;
                        return [2 /*return*/, { error: data.error, data: data.data, message: data.message }];
                    case 2:
                        error_50 = _c.sent();
                        console.log("Error finding business: ", (_a = error_50 === null || error_50 === void 0 ? void 0 : error_50.response) === null || _a === void 0 ? void 0 : _a.data);
                        console.error("Request that caused the error: ", error_50 === null || error_50 === void 0 ? void 0 : error_50.request);
                        return [2 /*return*/, { error: (_b = error_50 === null || error_50 === void 0 ? void 0 : error_50.response) === null || _b === void 0 ? void 0 : _b.data, request: error_50 === null || error_50 === void 0 ? void 0 : error_50.request, status: error_50.response ? error_50.response.status : null }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    // "ADMIN", "MANAGER", "HUMAN_RESOURCE_MANAGER", "TELLER", "COMPLAINTS_SOLVER",
    // "AGENCY_MANAGER", "AGENCY_HUMAN_RESOURCE_MANAGER", "AGENCY_TELLER", "AGENCY_COMPLAINTS_SOLVER"
    BusinessOperation.prototype.findByAdmin = function (conditions) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var response, data, error_51;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.post("".concat(this.baseUrl, "/search"), conditions, {
                                withCredentials: true,
                            })];
                    case 1:
                        response = _c.sent();
                        data = response.data;
                        return [2 /*return*/, { error: data.error, data: data.data, message: data.message }];
                    case 2:
                        error_51 = _c.sent();
                        console.log("Error finding business: ", (_a = error_51 === null || error_51 === void 0 ? void 0 : error_51.response) === null || _a === void 0 ? void 0 : _a.data);
                        console.error("Request that caused the error: ", error_51 === null || error_51 === void 0 ? void 0 : error_51.request);
                        return [2 /*return*/, { error: (_b = error_51 === null || error_51 === void 0 ? void 0 : error_51.response) === null || _b === void 0 ? void 0 : _b.data, request: error_51 === null || error_51 === void 0 ? void 0 : error_51.request, status: error_51.response ? error_51.response.status : null }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    // BUSINESS
    BusinessOperation.prototype.findRepresentorByBusiness = function (condition) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var response, data, error_52;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.post("".concat(this.baseUrl, "/search_representor"), condition, {
                                withCredentials: true,
                            })];
                    case 1:
                        response = _c.sent();
                        data = response.data;
                        return [2 /*return*/, { error: data.error, data: data.data, message: data.message }];
                    case 2:
                        error_52 = _c.sent();
                        console.log("Error finding representor: ", (_a = error_52 === null || error_52 === void 0 ? void 0 : error_52.response) === null || _a === void 0 ? void 0 : _a.data);
                        console.error("Request that caused the error: ", error_52 === null || error_52 === void 0 ? void 0 : error_52.request);
                        return [2 /*return*/, { error: (_b = error_52 === null || error_52 === void 0 ? void 0 : error_52.response) === null || _b === void 0 ? void 0 : _b.data, request: error_52 === null || error_52 === void 0 ? void 0 : error_52.request, status: error_52.response ? error_52.response.status : null }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    // "ADMIN", "MANAGER", "HUMAN_RESOURCE_MANAGER", "TELLER", "COMPLAINTS_SOLVER",
    // "AGENCY_MANAGER", "AGENCY_HUMAN_RESOURCE_MANAGER", "AGENCY_TELLER", "AGENCY_COMPLAINTS_SOLVER"
    BusinessOperation.prototype.findRepresentorByAdmin = function (conditions) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var response, data, error_53;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.post("".concat(this.baseUrl, "/search_representor"), conditions, {
                                withCredentials: true,
                            })];
                    case 1:
                        response = _c.sent();
                        data = response.data;
                        return [2 /*return*/, { error: data.error, data: data.data, message: data.message }];
                    case 2:
                        error_53 = _c.sent();
                        console.log("Error finding representor: ", (_a = error_53 === null || error_53 === void 0 ? void 0 : error_53.response) === null || _a === void 0 ? void 0 : _a.data);
                        console.error("Request that caused the error: ", error_53 === null || error_53 === void 0 ? void 0 : error_53.request);
                        return [2 /*return*/, { error: (_b = error_53 === null || error_53 === void 0 ? void 0 : error_53.response) === null || _b === void 0 ? void 0 : _b.data, request: error_53 === null || error_53 === void 0 ? void 0 : error_53.request, status: error_53.response ? error_53.response.status : null }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    // "ADMIN", "MANAGER", "TELLER", "AGENCY_MANAGER", "AGENCY_TELLER"
    BusinessOperation.prototype.updateBusiness = function (info, condition) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var response, data, error_54;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.put("".concat(this.baseUrl, "/update?business_id=").concat(condition.business_id), info, {
                                withCredentials: true,
                            })];
                    case 1:
                        response = _c.sent();
                        data = response.data;
                        return [2 /*return*/, { error: data.error, message: data.message }];
                    case 2:
                        error_54 = _c.sent();
                        console.log("Error updating business: ", (_a = error_54 === null || error_54 === void 0 ? void 0 : error_54.response) === null || _a === void 0 ? void 0 : _a.data);
                        console.error("Request that caused the error: ", error_54 === null || error_54 === void 0 ? void 0 : error_54.request);
                        return [2 /*return*/, { error: (_b = error_54 === null || error_54 === void 0 ? void 0 : error_54.response) === null || _b === void 0 ? void 0 : _b.data, request: error_54 === null || error_54 === void 0 ? void 0 : error_54.request, status: error_54.response ? error_54.response.status : null }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    // "ADMIN", "MANAGER", "TELLER", "AGENCY_MANAGER", "AGENCY_TELLER"
    BusinessOperation.prototype.updateBusinessRepresentor = function (info, condition) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var response, data, error_55;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.put("".concat(this.baseUrl, "/update_business_representor?business_id=").concat(condition.business_id), info, {
                                withCredentials: true,
                            })];
                    case 1:
                        response = _c.sent();
                        data = response.data;
                        return [2 /*return*/, { error: data.error, message: data.message }];
                    case 2:
                        error_55 = _c.sent();
                        console.log("Error updating business: ", (_a = error_55 === null || error_55 === void 0 ? void 0 : error_55.response) === null || _a === void 0 ? void 0 : _a.data);
                        console.error("Request that caused the error: ", error_55 === null || error_55 === void 0 ? void 0 : error_55.request);
                        return [2 /*return*/, { error: (_b = error_55 === null || error_55 === void 0 ? void 0 : error_55.response) === null || _b === void 0 ? void 0 : _b.data, request: error_55 === null || error_55 === void 0 ? void 0 : error_55.request, status: error_55.response ? error_55.response.status : null }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    // any
    BusinessOperation.prototype.checkExist = function (condition) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var response, data, error_56;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.post("".concat(this.baseUrl, "/check?tax_number=").concat(condition.tax_number), {
                                withCredentials: true,
                            })];
                    case 1:
                        response = _c.sent();
                        data = response.data;
                        return [2 /*return*/, { error: data.error, existed: data.existed, message: data.message }];
                    case 2:
                        error_56 = _c.sent();
                        console.log("Error checking exist business: ", (_a = error_56 === null || error_56 === void 0 ? void 0 : error_56.response) === null || _a === void 0 ? void 0 : _a.data);
                        console.error("Request that caused the error: ", error_56 === null || error_56 === void 0 ? void 0 : error_56.request);
                        return [2 /*return*/, { error: (_b = error_56 === null || error_56 === void 0 ? void 0 : error_56.response) === null || _b === void 0 ? void 0 : _b.data, request: error_56 === null || error_56 === void 0 ? void 0 : error_56.request, status: error_56.response ? error_56.response.status : null }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    // "ADMIN", "MANAGER", "TELLER", "AGENCY_MANAGER", "AGENCY_TELLER"
    BusinessOperation.prototype.removeBusiness = function (condition) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var response, data, error_57;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.delete("".concat(this.baseUrl, "/delete?business_id=").concat(condition.business_id, "&agency_id=").concat(condition.agency_id), {
                                withCredentials: true,
                            })];
                    case 1:
                        response = _c.sent();
                        data = response.data;
                        return [2 /*return*/, { error: data.error, message: data.message }];
                    case 2:
                        error_57 = _c.sent();
                        console.log("Error deleting business: ", (_a = error_57 === null || error_57 === void 0 ? void 0 : error_57.response) === null || _a === void 0 ? void 0 : _a.data);
                        console.error("Request that caused the error: ", error_57 === null || error_57 === void 0 ? void 0 : error_57.request);
                        return [2 /*return*/, { error: (_b = error_57 === null || error_57 === void 0 ? void 0 : error_57.response) === null || _b === void 0 ? void 0 : _b.data, request: error_57 === null || error_57 === void 0 ? void 0 : error_57.request, status: error_57.response ? error_57.response.status : null }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    // "ADMIN", "MANAGER", "TELLER", "AGENCY_MANAGER", "AGENCY_TELLER"
    BusinessOperation.prototype.updateContract = function (info, condition) {
        return __awaiter(this, void 0, void 0, function () {
            var formData, response, data, error_58;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        formData = new FormData();
                        formData.append('contract', info.contractFile);
                        return [4 /*yield*/, axios_1.default.patch("".concat(this.baseUrl, "/update_contract?business_id=").concat(condition.business_id), formData, {
                                withCredentials: true,
                            })];
                    case 1:
                        response = _a.sent();
                        data = response.data;
                        return [2 /*return*/, { error: data.error, message: data.message }];
                    case 2:
                        error_58 = _a.sent();
                        console.error('Error uploading file:', error_58.response.data);
                        return [2 /*return*/, error_58.response.data]; // Ném lỗi để xử lý bên ngoài
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    // "ADMIN", "MANAGER", "HUMAN_RESOURCE_MANAGER", "TELLER", "COMPLAINTS_SOLVER",
    // "AGENCY_MANAGER", "AGENCY_HUMAN_RESOURCE_MANAGER", "AGENCY_TELLER", "AGENCY_COMPLAINTS_SOLVER", "BUSINESS"
    BusinessOperation.prototype.findContract = function (condition) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var response, blob, fileUrl, error_59;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.get("".concat(this.baseUrl, "/get_contract?business_id=").concat(condition.business_id), {
                                responseType: 'arraybuffer',
                                withCredentials: true,
                            })];
                    case 1:
                        response = _c.sent();
                        blob = new Blob([response.data], { type: response.headers['content-type'] });
                        fileUrl = URL.createObjectURL(blob);
                        return [2 /*return*/, fileUrl];
                    case 2:
                        error_59 = _c.sent();
                        console.error("Error getting contract: ", (_a = error_59 === null || error_59 === void 0 ? void 0 : error_59.response) === null || _a === void 0 ? void 0 : _a.data);
                        console.error("Request that caused the error: ", error_59 === null || error_59 === void 0 ? void 0 : error_59.request);
                        return [2 /*return*/, { error: (_b = error_59 === null || error_59 === void 0 ? void 0 : error_59.response) === null || _b === void 0 ? void 0 : _b.data, request: error_59 === null || error_59 === void 0 ? void 0 : error_59.request, status: error_59.response ? error_59.response.status : null }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    // ROLE: ADMIN, MANAGER, TELLER
    BusinessOperation.prototype.approve = function (info, condition) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var response, data, error_60;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.post("".concat(this.baseUrl, "/approve?business_id=").concat(condition.business_id), info, {
                                withCredentials: true,
                            })];
                    case 1:
                        response = _c.sent();
                        data = response.data;
                        return [2 /*return*/, { error: data.error, message: data.message }];
                    case 2:
                        error_60 = _c.sent();
                        console.error("Error approving new business: ", (_a = error_60 === null || error_60 === void 0 ? void 0 : error_60.response) === null || _a === void 0 ? void 0 : _a.data);
                        console.error("Request that caused the error: ", error_60 === null || error_60 === void 0 ? void 0 : error_60.request);
                        return [2 /*return*/, { error: (_b = error_60 === null || error_60 === void 0 ? void 0 : error_60.response) === null || _b === void 0 ? void 0 : _b.data, request: error_60 === null || error_60 === void 0 ? void 0 : error_60.request, status: error_60.response ? error_60.response.status : null }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return BusinessOperation;
}());
exports.BusinessOperation = BusinessOperation;
;
var PartnerStaffOperation = /** @class */ (function () {
    function PartnerStaffOperation() {
        // this.baseUrl = "https://tdlogistics.govt.hu/api/v1/partner_staffs";
        this.baseUrl = "http://localhost:5000/api/v1/partner_staffs";
    }
    // ROLE: PARTNER_DRIVER, PARTNER_SHIPPER
    PartnerStaffOperation.prototype.getAuthenticatedPartnerStaffInfo = function () {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var response, data, error_61;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.get("".concat(this.baseUrl, "/get_info"), {
                                withCredentials: true,
                            })];
                    case 1:
                        response = _c.sent();
                        data = response.data;
                        return [2 /*return*/, { error: data.error, data: data.data, message: data.message }];
                    case 2:
                        error_61 = _c.sent();
                        console.log("Error getting authenticated partner staff information: ", (_a = error_61 === null || error_61 === void 0 ? void 0 : error_61.response) === null || _a === void 0 ? void 0 : _a.data);
                        console.error("Request that caused the error: ", error_61 === null || error_61 === void 0 ? void 0 : error_61.request);
                        return [2 /*return*/, { error: (_b = error_61 === null || error_61 === void 0 ? void 0 : error_61.response) === null || _b === void 0 ? void 0 : _b.data, request: error_61 === null || error_61 === void 0 ? void 0 : error_61.request, status: error_61.response ? error_61.response.status : null }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    // ROLE: ADMIN, MANAGER, HUMAN_RESOURCE_MANAGER, AGENCY_MANAGER, AGENCY_HUMAN_RESOURCE_MANAGER
    PartnerStaffOperation.prototype.create = function (info) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var response, data, error_62;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.post("".concat(this.baseUrl, "/create"), info, {
                                withCredentials: true,
                            })];
                    case 1:
                        response = _c.sent();
                        data = response.data;
                        return [2 /*return*/, { error: data.error, message: data.message }];
                    case 2:
                        error_62 = _c.sent();
                        console.log("Error creating partner staff: ", (_a = error_62 === null || error_62 === void 0 ? void 0 : error_62.response) === null || _a === void 0 ? void 0 : _a.data);
                        console.error("Request that caused the error: ", error_62 === null || error_62 === void 0 ? void 0 : error_62.request);
                        return [2 /*return*/, { error: (_b = error_62 === null || error_62 === void 0 ? void 0 : error_62.response) === null || _b === void 0 ? void 0 : _b.data, request: error_62 === null || error_62 === void 0 ? void 0 : error_62.request, status: error_62.response ? error_62.response.status : null }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    // ROLE: PARTNER_DRIVER, PARTNER_SHIPPER
    PartnerStaffOperation.prototype.findByPartnerStaff = function (condition) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var response, data, error_63;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.post("".concat(this.baseUrl, "/search"), condition, {
                                withCredentials: true,
                            })];
                    case 1:
                        response = _c.sent();
                        data = response.data;
                        return [2 /*return*/, { error: data.error, data: data.data, message: data.message }];
                    case 2:
                        error_63 = _c.sent();
                        console.log("Error finding partner staff: ", (_a = error_63 === null || error_63 === void 0 ? void 0 : error_63.response) === null || _a === void 0 ? void 0 : _a.data);
                        console.error("Request that caused the error: ", error_63 === null || error_63 === void 0 ? void 0 : error_63.request);
                        return [2 /*return*/, { error: (_b = error_63 === null || error_63 === void 0 ? void 0 : error_63.response) === null || _b === void 0 ? void 0 : _b.data, request: error_63 === null || error_63 === void 0 ? void 0 : error_63.request, status: error_63.response ? error_63.response.status : null }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    // ROLE: TRANSPORT_PARTNER_REPRESENTOR
    PartnerStaffOperation.prototype.findByPartner = function (conditions) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var response, data, error_64;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.post("".concat(this.baseUrl, "/search"), conditions, {
                                withCredentials: true,
                            })];
                    case 1:
                        response = _c.sent();
                        data = response.data;
                        return [2 /*return*/, { error: data.error, data: data.data, message: data.message }];
                    case 2:
                        error_64 = _c.sent();
                        console.log("Error finding partner staff: ", (_a = error_64 === null || error_64 === void 0 ? void 0 : error_64.response) === null || _a === void 0 ? void 0 : _a.data);
                        console.error("Request that caused the error: ", error_64 === null || error_64 === void 0 ? void 0 : error_64.request);
                        return [2 /*return*/, { error: (_b = error_64 === null || error_64 === void 0 ? void 0 : error_64.response) === null || _b === void 0 ? void 0 : _b.data, request: error_64 === null || error_64 === void 0 ? void 0 : error_64.request, status: error_64.response ? error_64.response.status : null }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    // ROLE: ADMIN, MANAGER, HUMAN_RESOURCE_MANAGER, TELLER, COMPLAINTS_SOLVER, AGENCY_MANAGER, AGENCY_HUMAN_RESOURCE_MANAGER, AGENCY_TELLER, AGENCY_COMPLAINTS_SOLVER 
    PartnerStaffOperation.prototype.findByAdmin = function (conditions) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var response, data, error_65;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.post("".concat(this.baseUrl, "/search"), conditions, {
                                withCredentials: true,
                            })];
                    case 1:
                        response = _c.sent();
                        data = response.data;
                        return [2 /*return*/, { error: data.error, data: data.data, message: data.message }];
                    case 2:
                        error_65 = _c.sent();
                        console.log("Error finding partner staff: ", (_a = error_65 === null || error_65 === void 0 ? void 0 : error_65.response) === null || _a === void 0 ? void 0 : _a.data);
                        console.error("Request that caused the error: ", error_65 === null || error_65 === void 0 ? void 0 : error_65.request);
                        return [2 /*return*/, { error: (_b = error_65 === null || error_65 === void 0 ? void 0 : error_65.response) === null || _b === void 0 ? void 0 : _b.data, request: error_65 === null || error_65 === void 0 ? void 0 : error_65.request, status: error_65.response ? error_65.response.status : null }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    // ROLE: ADMIN, MANAGER, HUMAN_RESOURCE_MANAGER, AGENCY_MANAGER, AGENCY_HUMAN_RESOURCE_MANAGER
    PartnerStaffOperation.prototype.updatePartnerStaff = function (info, condition) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var response, data, error_66;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.post("".concat(this.baseUrl, "/update?staff_id=").concat(condition.staff_id), info, {
                                withCredentials: true,
                            })];
                    case 1:
                        response = _c.sent();
                        data = response.data;
                        return [2 /*return*/, { error: data.error, message: data.message }];
                    case 2:
                        error_66 = _c.sent();
                        console.log("Error updating partner staff: ", (_a = error_66 === null || error_66 === void 0 ? void 0 : error_66.response) === null || _a === void 0 ? void 0 : _a.data);
                        console.error("Request that caused the error: ", error_66 === null || error_66 === void 0 ? void 0 : error_66.request);
                        return [2 /*return*/, { error: (_b = error_66 === null || error_66 === void 0 ? void 0 : error_66.response) === null || _b === void 0 ? void 0 : _b.data, request: error_66 === null || error_66 === void 0 ? void 0 : error_66.request, status: error_66.response ? error_66.response.status : null }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    // ROLE: any
    PartnerStaffOperation.prototype.checkExist = function (condition) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var response, data, error_67;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.post("".concat(this.baseUrl, "/check?cccd=").concat(condition.cccd), {
                                withCredentials: true,
                            })];
                    case 1:
                        response = _c.sent();
                        data = response.data;
                        return [2 /*return*/, { error: data.error, existed: data.existed, message: data.message }];
                    case 2:
                        error_67 = _c.sent();
                        console.log("Error checking exist partner staff: ", (_a = error_67 === null || error_67 === void 0 ? void 0 : error_67.response) === null || _a === void 0 ? void 0 : _a.data);
                        console.error("Request that caused the error: ", error_67 === null || error_67 === void 0 ? void 0 : error_67.request);
                        return [2 /*return*/, { error: (_b = error_67 === null || error_67 === void 0 ? void 0 : error_67.response) === null || _b === void 0 ? void 0 : _b.data, request: error_67 === null || error_67 === void 0 ? void 0 : error_67.request, status: error_67.response ? error_67.response.status : null }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    // ROLE: ADMIN, MANAGER, HUMAN_RESOURCE_MANAGER, AGENCY_MANAGER, AGENCY_HUMAN_RESOURCE_MANAGER
    PartnerStaffOperation.prototype.deletePartnerStaff = function (condition) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var response, data, error_68;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.post("".concat(this.baseUrl, "/delete?staff_id=").concat(condition.staff_id), {
                                withCredentials: true,
                            })];
                    case 1:
                        response = _c.sent();
                        data = response.data;
                        return [2 /*return*/, { error: data.error, message: data.message }];
                    case 2:
                        error_68 = _c.sent();
                        console.log("Error deleting business: ", (_a = error_68 === null || error_68 === void 0 ? void 0 : error_68.response) === null || _a === void 0 ? void 0 : _a.data);
                        console.error("Request that caused the error: ", error_68 === null || error_68 === void 0 ? void 0 : error_68.request);
                        return [2 /*return*/, { error: (_b = error_68 === null || error_68 === void 0 ? void 0 : error_68.response) === null || _b === void 0 ? void 0 : _b.data, request: error_68 === null || error_68 === void 0 ? void 0 : error_68.request, status: error_68.response ? error_68.response.status : null }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    // ROLE: PARTNER_DRIVER, PARTNER_SHIPPER
    PartnerStaffOperation.prototype.updatePassword = function (info) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var response, data, error_69;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.patch("".concat(this.baseUrl, "/update_password"), info, {
                                withCredentials: true,
                            })];
                    case 1:
                        response = _c.sent();
                        data = response.data;
                        return [2 /*return*/, { error: data.error, data: data.data, message: data.message }];
                    case 2:
                        error_69 = _c.sent();
                        console.log("Error update password: ", (_a = error_69 === null || error_69 === void 0 ? void 0 : error_69.response) === null || _a === void 0 ? void 0 : _a.data);
                        console.error("Request that caused the error: ", error_69 === null || error_69 === void 0 ? void 0 : error_69.request);
                        return [2 /*return*/, { error: (_b = error_69 === null || error_69 === void 0 ? void 0 : error_69.response) === null || _b === void 0 ? void 0 : _b.data, request: error_69 === null || error_69 === void 0 ? void 0 : error_69.request, status: error_69.response ? error_69.response.status : null }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    // ROLE: ADMIN, MANAGER, HUMAN_RESOURCE_MANAGER, AGENCY_MANAGER, AGENCY_HUMAN_RESOURCE_MANAGER
    PartnerStaffOperation.prototype.updatePartnerStaffAvatar = function (info, condition) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var formData, response, data, error_70;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        formData = new FormData();
                        formData.append('avatar', info.avatarFile);
                        return [4 /*yield*/, axios_1.default.patch("".concat(this.baseUrl, "/update_avatar?staff_id=").concat(condition.staff_id), formData, {
                                withCredentials: true,
                            })];
                    case 1:
                        response = _c.sent();
                        data = response.data;
                        return [2 /*return*/, { error: data.error, message: data.message }];
                    case 2:
                        error_70 = _c.sent();
                        console.error('Error uploading image:', (_a = error_70 === null || error_70 === void 0 ? void 0 : error_70.response) === null || _a === void 0 ? void 0 : _a.data);
                        console.error("Request that caused the error: ", error_70 === null || error_70 === void 0 ? void 0 : error_70.request);
                        return [2 /*return*/, { error: (_b = error_70 === null || error_70 === void 0 ? void 0 : error_70.response) === null || _b === void 0 ? void 0 : _b.data, request: error_70 === null || error_70 === void 0 ? void 0 : error_70.request, status: error_70.response ? error_70.response.status : null }]; // Ném lỗi để xử lý bên ngoài
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    // ROLE: ADMIN, MANAGER, HUMAN_RESOURCE_MANAGER, AGENCY_MANAGER, AGENCY_HUMAN_RESOURCE_MANAGER
    PartnerStaffOperation.prototype.updatePartnerStaffLicense = function (info, condition) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var formData, response, data, error_71;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        formData = new FormData();
                        formData.append('license_before', info.license_before);
                        formData.append('license_after', info.license_after);
                        return [4 /*yield*/, axios_1.default.patch("".concat(this.baseUrl, "/update_licenses?staff_id=").concat(condition.staff_id), formData, {
                                withCredentials: true,
                            })];
                    case 1:
                        response = _c.sent();
                        data = response.data;
                        return [2 /*return*/, { error: data.error, message: data.message }];
                    case 2:
                        error_71 = _c.sent();
                        console.error('Error uploading image:', (_a = error_71 === null || error_71 === void 0 ? void 0 : error_71.response) === null || _a === void 0 ? void 0 : _a.data);
                        console.error("Request that caused the error: ", error_71 === null || error_71 === void 0 ? void 0 : error_71.request);
                        return [2 /*return*/, { error: (_b = error_71 === null || error_71 === void 0 ? void 0 : error_71.response) === null || _b === void 0 ? void 0 : _b.data, request: error_71 === null || error_71 === void 0 ? void 0 : error_71.request, status: error_71.response ? error_71.response.status : null }]; // Ném lỗi để xử lý bên ngoài
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    // ROLE: ADMIN, MANAGER, HUMAN_RESOURCE_MANAGER, AGENCY_MANAGER, AGENCY_HUMAN_RESOURCE_MANAGER, PARTNER_DRIVER, PARTNER_SHIPPER
    PartnerStaffOperation.prototype.findPartnerStaffAvatar = function (condition) {
        return __awaiter(this, void 0, void 0, function () {
            var response, blob, fileUrl, error_72;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.get("".concat(this.baseUrl, "/get_avatar?staff_id=").concat(condition.staff_id), {
                                responseType: 'arraybuffer',
                                withCredentials: true,
                            })];
                    case 1:
                        response = _a.sent();
                        blob = new Blob([response.data], { type: response.headers['content-type'] });
                        fileUrl = URL.createObjectURL(blob);
                        return [2 /*return*/, fileUrl];
                    case 2:
                        error_72 = _a.sent();
                        console.error("Error getting avatar: ", error_72);
                        return [2 /*return*/, error_72.response.data];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    // ROLE: ADMIN, MANAGER, HUMAN_RESOURCE_MANAGER, AGENCY_MANAGER, AGENCY_HUMAN_RESOURCE_MANAGER, PARTNER_DRIVER, PARTNER_SHIPPER
    PartnerStaffOperation.prototype.findPartnerStaffLicenseBefore = function (condition) {
        return __awaiter(this, void 0, void 0, function () {
            var response, blob, fileUrl, error_73;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.get("".concat(this.baseUrl, "/get_license_before?staff_id=").concat(condition.staff_id), {
                                responseType: 'arraybuffer',
                                withCredentials: true,
                            })];
                    case 1:
                        response = _a.sent();
                        blob = new Blob([response.data], { type: response.headers['content-type'] });
                        fileUrl = URL.createObjectURL(blob);
                        return [2 /*return*/, fileUrl];
                    case 2:
                        error_73 = _a.sent();
                        console.error("Error getting license front: ", error_73);
                        return [2 /*return*/, error_73.response.data];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    // ROLE: ADMIN, MANAGER, HUMAN_RESOURCE_MANAGER, AGENCY_MANAGER, AGENCY_HUMAN_RESOURCE_MANAGER, PARTNER_DRIVER, PARTNER_SHIPPER
    PartnerStaffOperation.prototype.findPartnerStaffLicenseAfter = function (condition) {
        return __awaiter(this, void 0, void 0, function () {
            var response, blob, fileUrl, error_74;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.get("".concat(this.baseUrl, "/get_license_after?staff_id=").concat(condition.staff_id), {
                                responseType: 'arraybuffer',
                                withCredentials: true,
                            })];
                    case 1:
                        response = _a.sent();
                        blob = new Blob([response.data], { type: response.headers['content-type'] });
                        fileUrl = URL.createObjectURL(blob);
                        return [2 /*return*/, fileUrl];
                    case 2:
                        error_74 = _a.sent();
                        console.error("Error getting license after: ", error_74);
                        return [2 /*return*/, error_74.response.data];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return PartnerStaffOperation;
}());
exports.PartnerStaffOperation = PartnerStaffOperation;
var ShippersOperation = /** @class */ (function () {
    function ShippersOperation() {
        this.baseUrl = "http://localhost:5000/api/v1/shippers";
    }
    ShippersOperation.prototype.getTask = function (condition) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var response, data, error_75;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.post("".concat(this.baseUrl, "/get_tasks"), condition, {
                                withCredentials: true,
                            })];
                    case 1:
                        response = _c.sent();
                        data = response.data;
                        return [2 /*return*/, { error: data.error, data: data.data, message: data.message }];
                    case 2:
                        error_75 = _c.sent();
                        console.log("Error getting tasks: ", (_a = error_75 === null || error_75 === void 0 ? void 0 : error_75.response) === null || _a === void 0 ? void 0 : _a.data);
                        console.error("Request that caused the error: ", error_75 === null || error_75 === void 0 ? void 0 : error_75.request);
                        return [2 /*return*/, { error: (_b = error_75 === null || error_75 === void 0 ? void 0 : error_75.response) === null || _b === void 0 ? void 0 : _b.data, request: error_75 === null || error_75 === void 0 ? void 0 : error_75.request, status: error_75.response ? error_75.response.status : null }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ShippersOperation.prototype.confirmCompletedTask = function (info) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var response, data, error_76;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.patch("".concat(this.baseUrl, "/confirm_completed"), info, {
                                withCredentials: true,
                            })];
                    case 1:
                        response = _c.sent();
                        data = response.data;
                        return [2 /*return*/, { error: data.error, message: data.message }];
                    case 2:
                        error_76 = _c.sent();
                        console.log("Error confirming completed task: ", (_a = error_76 === null || error_76 === void 0 ? void 0 : error_76.response) === null || _a === void 0 ? void 0 : _a.data);
                        console.error("Request that caused the error: ", error_76 === null || error_76 === void 0 ? void 0 : error_76.request);
                        return [2 /*return*/, { error: (_b = error_76 === null || error_76 === void 0 ? void 0 : error_76.response) === null || _b === void 0 ? void 0 : _b.data, request: error_76 === null || error_76 === void 0 ? void 0 : error_76.request, status: error_76.response ? error_76.response.status : null }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ShippersOperation.prototype.getHistory = function (condition) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var response, data, error_77;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.post("".concat(this.baseUrl, "/get_history"), condition, {
                                withCredentials: true,
                            })];
                    case 1:
                        response = _c.sent();
                        data = response.data;
                        return [2 /*return*/, { error: data.error, data: data.data, message: data.message }];
                    case 2:
                        error_77 = _c.sent();
                        console.log("Error getting history: ", (_a = error_77 === null || error_77 === void 0 ? void 0 : error_77.response) === null || _a === void 0 ? void 0 : _a.data);
                        console.error("Request that caused the error: ", error_77 === null || error_77 === void 0 ? void 0 : error_77.request);
                        return [2 /*return*/, { error: (_b = error_77 === null || error_77 === void 0 ? void 0 : error_77.response) === null || _b === void 0 ? void 0 : _b.data, request: error_77 === null || error_77 === void 0 ? void 0 : error_77.request, status: error_77.response ? error_77.response.status : null }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return ShippersOperation;
}());
exports.ShippersOperation = ShippersOperation;
var ShipmentsOperation = /** @class */ (function () {
    function ShipmentsOperation() {
        // this.baseUrl = "https://tdlogistics.govt.hu/api/v1/shipments";
        this.baseUrl = "http://localhost:5000/api/v1/shipments";
    }
    ShipmentsOperation.prototype.check = function (condition) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var response, data, error_78;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.get("".concat(this.baseUrl, "/check?shipment_id=").concat(condition.shipment_id), {
                                withCredentials: true,
                            })];
                    case 1:
                        response = _c.sent();
                        data = response.data;
                        return [2 /*return*/, { error: data.error, existed: data.existed, message: data.message }];
                    case 2:
                        error_78 = _c.sent();
                        console.log("Error checking exist shipment: ", (_a = error_78 === null || error_78 === void 0 ? void 0 : error_78.response) === null || _a === void 0 ? void 0 : _a.data);
                        console.error("Request that caused the error: ", error_78 === null || error_78 === void 0 ? void 0 : error_78.request);
                        return [2 /*return*/, { error: (_b = error_78 === null || error_78 === void 0 ? void 0 : error_78.response) === null || _b === void 0 ? void 0 : _b.data, request: error_78 === null || error_78 === void 0 ? void 0 : error_78.request, status: error_78.response ? error_78.response.status : null }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    // ROLE: ADMIN, MANAGER, TELLER, AGENCY_MANAGER, AGENCY_TELLER
    ShipmentsOperation.prototype.create = function (info) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var response, data, error_79;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.post("".concat(this.baseUrl, "/create"), info, {
                                withCredentials: true,
                            })];
                    case 1:
                        response = _c.sent();
                        data = response.data;
                        return [2 /*return*/, { error: data.error, message: data.message }];
                    case 2:
                        error_79 = _c.sent();
                        console.log("Error creating shipment: ", (_a = error_79 === null || error_79 === void 0 ? void 0 : error_79.response) === null || _a === void 0 ? void 0 : _a.data);
                        console.error("Request that caused the error: ", error_79 === null || error_79 === void 0 ? void 0 : error_79.request);
                        return [2 /*return*/, { error: (_b = error_79 === null || error_79 === void 0 ? void 0 : error_79.response) === null || _b === void 0 ? void 0 : _b.data, request: error_79 === null || error_79 === void 0 ? void 0 : error_79.request, status: error_79.response ? error_79.response.status : null }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ShipmentsOperation.prototype.getOrdersFromShipment = function (condition) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var response, data, error_80;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.get("".concat(this.baseUrl, "/get_orders?shipment_id=").concat(condition.shipment_id), {
                                withCredentials: true,
                            })];
                    case 1:
                        response = _c.sent();
                        data = response.data;
                        return [2 /*return*/, { error: data.error, data: data.data, message: data.message }];
                    case 2:
                        error_80 = _c.sent();
                        console.log("Error getting orders from shipment: ", (_a = error_80 === null || error_80 === void 0 ? void 0 : error_80.response) === null || _a === void 0 ? void 0 : _a.data);
                        console.error("Request that caused the error: ", error_80 === null || error_80 === void 0 ? void 0 : error_80.request);
                        return [2 /*return*/, { error: (_b = error_80 === null || error_80 === void 0 ? void 0 : error_80.response) === null || _b === void 0 ? void 0 : _b.data, request: error_80 === null || error_80 === void 0 ? void 0 : error_80.request, status: error_80.response ? error_80.response.status : null }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    // ROLE: ADMIN, MANAGER, TELLER, AGENCY_MANAGER, AGENCY_TELLER
    ShipmentsOperation.prototype.addOrdersToShipment = function (condition, info) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var response, data, error_81;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.post("".concat(this.baseUrl, "/add_orders?shipment_id=").concat(condition.shipment_id), info, {
                                withCredentials: true,
                            })];
                    case 1:
                        response = _c.sent();
                        data = response.data;
                        return [2 /*return*/, { error: data.error, message: data.message }];
                    case 2:
                        error_81 = _c.sent();
                        console.log("Error adding orders to shipment: ", (_a = error_81 === null || error_81 === void 0 ? void 0 : error_81.response) === null || _a === void 0 ? void 0 : _a.data);
                        console.error("Request that caused the error: ", error_81 === null || error_81 === void 0 ? void 0 : error_81.request);
                        return [2 /*return*/, { error: (_b = error_81 === null || error_81 === void 0 ? void 0 : error_81.response) === null || _b === void 0 ? void 0 : _b.data, request: error_81 === null || error_81 === void 0 ? void 0 : error_81.request, status: error_81.response ? error_81.response.status : null }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    // ROLE: ADMIN, MANAGER, TELLER, AGENCY_MANAGER, AGENCY_TELLER
    ShipmentsOperation.prototype.deleteOrderFromShipment = function (condition, info) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var response, data, error_82;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.post("".concat(this.baseUrl, "/remove_orders?shipment_id=").concat(condition.shipment_id), info, {
                                withCredentials: true,
                            })];
                    case 1:
                        response = _c.sent();
                        data = response.data;
                        return [2 /*return*/, { error: data.error, message: data.message }];
                    case 2:
                        error_82 = _c.sent();
                        console.log("Error deleting order from shipment: ", (_a = error_82 === null || error_82 === void 0 ? void 0 : error_82.response) === null || _a === void 0 ? void 0 : _a.data);
                        console.error("Request that caused the error: ", error_82 === null || error_82 === void 0 ? void 0 : error_82.request);
                        return [2 /*return*/, { error: (_b = error_82 === null || error_82 === void 0 ? void 0 : error_82.response) === null || _b === void 0 ? void 0 : _b.data, request: error_82 === null || error_82 === void 0 ? void 0 : error_82.request, status: error_82.response ? error_82.response.status : null }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    // ROLE: AGENCY_MANAGER, AGENCY_TELLER
    ShipmentsOperation.prototype.confirmCreate = function (condition) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var response, data, error_83;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.post("".concat(this.baseUrl, "/confirm_create"), condition, {
                                withCredentials: true,
                            })];
                    case 1:
                        response = _c.sent();
                        data = response.data;
                        return [2 /*return*/, { error: data.error, message: data.message }];
                    case 2:
                        error_83 = _c.sent();
                        console.log("Error confirming creat shipment: ", (_a = error_83 === null || error_83 === void 0 ? void 0 : error_83.response) === null || _a === void 0 ? void 0 : _a.data);
                        console.error("Request that caused the error: ", error_83 === null || error_83 === void 0 ? void 0 : error_83.request);
                        return [2 /*return*/, { error: (_b = error_83 === null || error_83 === void 0 ? void 0 : error_83.response) === null || _b === void 0 ? void 0 : _b.data, request: error_83 === null || error_83 === void 0 ? void 0 : error_83.request, status: error_83.response ? error_83.response.status : null }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    // ROLE: ADMIN, MANAGER, TELLER, AGENCY_MANAGER, AGENCY_TELLER
    ShipmentsOperation.prototype.get = function (condition) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var response, data, error_84;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.post("".concat(this.baseUrl, "/get"), condition, {
                                withCredentials: true,
                            })];
                    case 1:
                        response = _c.sent();
                        data = response.data;
                        return [2 /*return*/, { error: data.error, data: data.data, message: data.message }];
                    case 2:
                        error_84 = _c.sent();
                        console.log("Error getting shipments: ", (_a = error_84 === null || error_84 === void 0 ? void 0 : error_84.response) === null || _a === void 0 ? void 0 : _a.data);
                        console.error("Request that caused the error: ", error_84 === null || error_84 === void 0 ? void 0 : error_84.request);
                        return [2 /*return*/, { error: (_b = error_84 === null || error_84 === void 0 ? void 0 : error_84.response) === null || _b === void 0 ? void 0 : _b.data, request: error_84 === null || error_84 === void 0 ? void 0 : error_84.request, status: error_84.response ? error_84.response.status : null }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    // ROLE: ADMIN, MANAGER, TELLER, AGENCY_MANAGER, AGENCY_TELLER
    ShipmentsOperation.prototype.delete = function (condition) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var response, data, error_85;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.delete("".concat(this.baseUrl, "/delete?shipment_id=").concat(condition.shipment_id), {
                                withCredentials: true,
                            })];
                    case 1:
                        response = _c.sent();
                        data = response.data;
                        return [2 /*return*/, { error: data.error, message: data.message }];
                    case 2:
                        error_85 = _c.sent();
                        console.log("Error deleting shipment: ", (_a = error_85 === null || error_85 === void 0 ? void 0 : error_85.response) === null || _a === void 0 ? void 0 : _a.data);
                        console.error("Request that caused the error: ", error_85 === null || error_85 === void 0 ? void 0 : error_85.request);
                        return [2 /*return*/, { error: (_b = error_85 === null || error_85 === void 0 ? void 0 : error_85.response) === null || _b === void 0 ? void 0 : _b.data, request: error_85 === null || error_85 === void 0 ? void 0 : error_85.request, status: error_85.response ? error_85.response.status : null }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    // ROLE: ADMIN, MANAGER, TELLER, AGENCY_MANAGER, AGENCY_TELLER
    ShipmentsOperation.prototype.decompose = function (condition, info) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var response, data, error_86;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.post("".concat(this.baseUrl, "/decompose?shipment_id=").concat(condition.shipment_id), info, {
                                withCredentials: true,
                            })];
                    case 1:
                        response = _c.sent();
                        data = response.data;
                        return [2 /*return*/, { error: data.error, message: data.message }];
                    case 2:
                        error_86 = _c.sent();
                        console.log("Error decomposing shipment: ", (_a = error_86 === null || error_86 === void 0 ? void 0 : error_86.response) === null || _a === void 0 ? void 0 : _a.data);
                        console.error("Request that caused the error: ", error_86 === null || error_86 === void 0 ? void 0 : error_86.request);
                        return [2 /*return*/, { error: (_b = error_86 === null || error_86 === void 0 ? void 0 : error_86.response) === null || _b === void 0 ? void 0 : _b.data, request: error_86 === null || error_86 === void 0 ? void 0 : error_86.request, status: error_86.response ? error_86.response.status : null }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    // ROLE: AGENCY_MANAGER, AGENCY_TELLER
    ShipmentsOperation.prototype.receive = function (condition) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var response, data, error_87;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.post("".concat(this.baseUrl, "/receive"), condition, {
                                withCredentials: true,
                            })];
                    case 1:
                        response = _c.sent();
                        data = response.data;
                        return [2 /*return*/, { error: data.error, message: data.message }];
                    case 2:
                        error_87 = _c.sent();
                        console.log("Error receiving shipment: ", (_a = error_87 === null || error_87 === void 0 ? void 0 : error_87.response) === null || _a === void 0 ? void 0 : _a.data);
                        console.error("Request that caused the error: ", error_87 === null || error_87 === void 0 ? void 0 : error_87.request);
                        return [2 /*return*/, { error: (_b = error_87 === null || error_87 === void 0 ? void 0 : error_87.response) === null || _b === void 0 ? void 0 : _b.data, request: error_87 === null || error_87 === void 0 ? void 0 : error_87.request, status: error_87.response ? error_87.response.status : null }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    // ROLE: SHIPPER, AGENCY_SHIPPER, PARTNER_SHIPPER
    ShipmentsOperation.prototype.undertake = function (info) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var response, data, error_88;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.post("".concat(this.baseUrl, "/undertake"), info, {
                                withCredentials: true,
                            })];
                    case 1:
                        response = _c.sent();
                        data = response.data;
                        return [2 /*return*/, { error: data.error, message: data.message }];
                    case 2:
                        error_88 = _c.sent();
                        console.log("Error undertaking shipment: ", (_a = error_88 === null || error_88 === void 0 ? void 0 : error_88.response) === null || _a === void 0 ? void 0 : _a.data);
                        console.error("Request that caused the error: ", error_88 === null || error_88 === void 0 ? void 0 : error_88.request);
                        return [2 /*return*/, { error: (_b = error_88 === null || error_88 === void 0 ? void 0 : error_88.response) === null || _b === void 0 ? void 0 : _b.data, request: error_88 === null || error_88 === void 0 ? void 0 : error_88.request, status: error_88.response ? error_88.response.status : null }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return ShipmentsOperation;
}());
exports.ShipmentsOperation = ShipmentsOperation;
;
var OrdersOperation = /** @class */ (function () {
    function OrdersOperation() {
        this.baseUrl = "http://localhost:5000/api/v1/orders";
    }
    OrdersOperation.prototype.get = function (conditions) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var response, data, error_89;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.post("".concat(this.baseUrl, "/search"), conditions, {
                                withCredentials: true,
                            })];
                    case 1:
                        response = _c.sent();
                        data = response.data;
                        return [2 /*return*/, { error: data.error, data: data.data, message: data.message }];
                    case 2:
                        error_89 = _c.sent();
                        console.log("Error getting orders: ", (_a = error_89 === null || error_89 === void 0 ? void 0 : error_89.response) === null || _a === void 0 ? void 0 : _a.data);
                        console.error("Request that caused the error: ", error_89 === null || error_89 === void 0 ? void 0 : error_89.request);
                        return [2 /*return*/, { error: (_b = error_89 === null || error_89 === void 0 ? void 0 : error_89.response) === null || _b === void 0 ? void 0 : _b.data, request: error_89 === null || error_89 === void 0 ? void 0 : error_89.request, status: error_89.response ? error_89.response.status : null }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    OrdersOperation.prototype.calculatefee = function (info) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var response, data, error_90;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.post("".concat(this.baseUrl, "/calculatefee"), info, {
                                withCredentials: true,
                            })];
                    case 1:
                        response = _c.sent();
                        data = response.data;
                        return [2 /*return*/, { error: data.error, data: data.data, message: data.message }];
                    case 2:
                        error_90 = _c.sent();
                        console.log("Error getting orders: ", (_a = error_90 === null || error_90 === void 0 ? void 0 : error_90.response) === null || _a === void 0 ? void 0 : _a.data);
                        console.error("Request that caused the error: ", error_90 === null || error_90 === void 0 ? void 0 : error_90.request);
                        return [2 /*return*/, { error: (_b = error_90 === null || error_90 === void 0 ? void 0 : error_90.response) === null || _b === void 0 ? void 0 : _b.data, request: error_90 === null || error_90 === void 0 ? void 0 : error_90.request, status: error_90.response ? error_90.response.status : null }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    OrdersOperation.prototype.checkExist = function (condition) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var response, data, error_91;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.get("".concat(this.baseUrl, "/check?order_id=").concat(condition.order_id), {
                                withCredentials: true,
                            })];
                    case 1:
                        response = _c.sent();
                        data = response.data;
                        return [2 /*return*/, { error: data.error, exist: data.existed, message: data.message }];
                    case 2:
                        error_91 = _c.sent();
                        console.log("Error checking exist order: ", (_a = error_91 === null || error_91 === void 0 ? void 0 : error_91.response) === null || _a === void 0 ? void 0 : _a.data);
                        console.error("Request that caused the error: ", error_91 === null || error_91 === void 0 ? void 0 : error_91.request);
                        return [2 /*return*/, { error: (_b = error_91 === null || error_91 === void 0 ? void 0 : error_91.response) === null || _b === void 0 ? void 0 : _b.data, request: error_91 === null || error_91 === void 0 ? void 0 : error_91.request, status: error_91.response ? error_91.response.status : null }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    OrdersOperation.prototype.checkFileFormat = function (info) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var formData, response, data, error_92;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        formData = new FormData();
                        formData.append("file", info.file);
                        return [4 /*yield*/, axios_1.default.post("".concat(this.baseUrl, "/check_file_format"), formData, {
                                headers: {
                                    'Content-Type': 'multipart/form-data',
                                },
                                withCredentials: true,
                            })];
                    case 1:
                        response = _c.sent();
                        data = response.data;
                        return [2 /*return*/, { error: data.error, valid: data.valid, message: data.message }];
                    case 2:
                        error_92 = _c.sent();
                        console.error('Error checking file format:', (_a = error_92 === null || error_92 === void 0 ? void 0 : error_92.response) === null || _a === void 0 ? void 0 : _a.data);
                        console.error("Request that caused the error: ", error_92 === null || error_92 === void 0 ? void 0 : error_92.request);
                        return [2 /*return*/, { error: (_b = error_92 === null || error_92 === void 0 ? void 0 : error_92.response) === null || _b === void 0 ? void 0 : _b.data, request: error_92 === null || error_92 === void 0 ? void 0 : error_92.request, status: error_92.response ? error_92.response.status : null }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    OrdersOperation.prototype.createByUser = function (socket, info) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                try {
                    socket.emit("notifyNewOrder", info);
                }
                catch (error) {
                    console.log("Error creating new order: ", error);
                }
                return [2 /*return*/];
            });
        });
    };
    OrdersOperation.prototype.createByAdminAndAgency = function (socket, info) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                try {
                    socket.emit("notifyNewOrder", info);
                }
                catch (error) {
                    console.log("Error creating new order: ", error);
                }
                return [2 /*return*/];
            });
        });
    };
    OrdersOperation.prototype.createByFile = function (info) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var formData, response, data, error_93;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        formData = new FormData();
                        formData.append("file", info.file);
                        return [4 /*yield*/, axios_1.default.post("".concat(this.baseUrl, "/create_by_file"), formData, {
                                headers: {
                                    'Content-Type': 'multipart/form-data',
                                },
                                withCredentials: true,
                            })];
                    case 1:
                        response = _c.sent();
                        data = response.data;
                        return [2 /*return*/, { error: data.error, message: data.message }];
                    case 2:
                        error_93 = _c.sent();
                        console.error('Error creating orders by file:', (_a = error_93 === null || error_93 === void 0 ? void 0 : error_93.response) === null || _a === void 0 ? void 0 : _a.data);
                        console.error("Request that caused the error: ", error_93 === null || error_93 === void 0 ? void 0 : error_93.request);
                        return [2 /*return*/, { error: (_b = error_93 === null || error_93 === void 0 ? void 0 : error_93.response) === null || _b === void 0 ? void 0 : _b.data, request: error_93 === null || error_93 === void 0 ? void 0 : error_93.request, status: error_93.response ? error_93.response.status : null }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    OrdersOperation.prototype.update = function (info, condition) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var response, data, error_94;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.put("".concat(this.baseUrl, "/update?order_id=").concat(condition.order_id), info, {
                                withCredentials: true,
                            })];
                    case 1:
                        response = _c.sent();
                        data = response.data;
                        return [2 /*return*/, { error: data.error, message: data.message }];
                    case 2:
                        error_94 = _c.sent();
                        console.log("Error updating order: ", (_a = error_94 === null || error_94 === void 0 ? void 0 : error_94.response) === null || _a === void 0 ? void 0 : _a.data);
                        console.error("Request that caused the error: ", error_94 === null || error_94 === void 0 ? void 0 : error_94.request);
                        return [2 /*return*/, { error: (_b = error_94 === null || error_94 === void 0 ? void 0 : error_94.response) === null || _b === void 0 ? void 0 : _b.data, request: error_94 === null || error_94 === void 0 ? void 0 : error_94.request, status: error_94.response ? error_94.response.status : null }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    OrdersOperation.prototype.cancel = function (condition) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var response, data, error_95;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.delete("".concat(this.baseUrl, "/cancel?order_id=").concat(condition.order_id), {
                                withCredentials: true,
                            })];
                    case 1:
                        response = _c.sent();
                        data = response.data;
                        return [2 /*return*/, { error: data.error, message: data.message }];
                    case 2:
                        error_95 = _c.sent();
                        console.log("Error canceling order: ", (_a = error_95 === null || error_95 === void 0 ? void 0 : error_95.response) === null || _a === void 0 ? void 0 : _a.data);
                        console.error("Request that caused the error: ", error_95 === null || error_95 === void 0 ? void 0 : error_95.request);
                        return [2 /*return*/, { error: (_b = error_95 === null || error_95 === void 0 ? void 0 : error_95.response) === null || _b === void 0 ? void 0 : _b.data, request: error_95 === null || error_95 === void 0 ? void 0 : error_95.request, status: error_95.response ? error_95.response.status : null }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    OrdersOperation.prototype.calculateFee = function (info) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var response, data, error_96;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.post("".concat(this.baseUrl, "/calculate_fee"), info, {
                                withCredentials: true,
                            })];
                    case 1:
                        response = _c.sent();
                        data = response.data;
                        return [2 /*return*/, { error: data.error, data: data.data, message: data.message }];
                    case 2:
                        error_96 = _c.sent();
                        console.log("Error calculating fee: ", (_a = error_96 === null || error_96 === void 0 ? void 0 : error_96.response) === null || _a === void 0 ? void 0 : _a.data);
                        console.error("Request that caused the error: ", error_96 === null || error_96 === void 0 ? void 0 : error_96.request);
                        return [2 /*return*/, { error: (_b = error_96 === null || error_96 === void 0 ? void 0 : error_96.response) === null || _b === void 0 ? void 0 : _b.data, request: error_96 === null || error_96 === void 0 ? void 0 : error_96.request, status: error_96.response ? error_96.response.status : null }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    OrdersOperation.prototype.updateImage = function (info, condition) {
        return __awaiter(this, void 0, void 0, function () {
            var formData, i, response, error_97;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        formData = new FormData();
                        for (i = 0; i < info.files.length; i++) {
                            formData.append('files', info.files[i]);
                        }
                        return [4 /*yield*/, axios_1.default.post("".concat(this.baseUrl, "/update_images?order_id=").concat(condition.order_id, "&type=").concat(condition.type), formData, {
                                withCredentials: true,
                            })];
                    case 1:
                        response = _a.sent();
                        console.log('Image uploaded successfully:', response.data);
                        return [2 /*return*/, response.data]; // Trả về dữ liệu phản hồi từ máy chủ
                    case 2:
                        error_97 = _a.sent();
                        console.error('Error uploading image:', error_97.response.data);
                        throw error_97; // Ném lỗi để xử lý bên ngoài
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    //get_images
    OrdersOperation.prototype.getImage = function (condition) {
        return __awaiter(this, void 0, void 0, function () {
            var response, zipFile_2, imageUrls_2, error_98;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        return [4 /*yield*/, axios_1.default.get("".concat(this.baseUrl, "/get_images?order_id=").concat(condition.order_id, "&type=").concat(condition.type), {
                                responseType: 'arraybuffer', // Ensure response is treated as a binary buffer
                                withCredentials: true,
                            })];
                    case 1:
                        response = _a.sent();
                        return [4 /*yield*/, JSZip.loadAsync(response.data)];
                    case 2:
                        zipFile_2 = _a.sent();
                        imageUrls_2 = [];
                        // Extract each file from the ZIP archive and create object URLs
                        return [4 /*yield*/, Promise.all(Object.keys(zipFile_2.files).map(function (filename) { return __awaiter(_this, void 0, void 0, function () {
                                var file, blob, url;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            file = zipFile_2.files[filename];
                                            return [4 /*yield*/, file.async('blob')];
                                        case 1:
                                            blob = _a.sent();
                                            url = URL.createObjectURL(blob);
                                            imageUrls_2.push(url);
                                            return [2 /*return*/];
                                    }
                                });
                            }); }))];
                    case 3:
                        // Extract each file from the ZIP archive and create object URLs
                        _a.sent();
                        return [2 /*return*/, imageUrls_2];
                    case 4:
                        error_98 = _a.sent();
                        console.error('Error getting image:', error_98.message);
                        throw error_98; // Ném lỗi để xử lý bên ngoài
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    return OrdersOperation;
}());
exports.OrdersOperation = OrdersOperation;
var ScheduleOperation = /** @class */ (function () {
    function ScheduleOperation() {
        this.baseUrl = "http://localhost:5000/api/v1/schedules";
    }
    ScheduleOperation.prototype.get = function (conditions) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var response, data, error_99;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.post("".concat(this.baseUrl, "/search"), conditions, {
                                withCredentials: true
                            })];
                    case 1:
                        response = _c.sent();
                        data = response.data;
                        return [2 /*return*/, { error: data, data: data.data, message: data.message }];
                    case 2:
                        error_99 = _c.sent();
                        console.log("Error getting tasks: ", (_a = error_99 === null || error_99 === void 0 ? void 0 : error_99.response) === null || _a === void 0 ? void 0 : _a.data);
                        console.error("Request that caused the error: ", error_99 === null || error_99 === void 0 ? void 0 : error_99.request);
                        return [2 /*return*/, { error: (_b = error_99 === null || error_99 === void 0 ? void 0 : error_99.response) === null || _b === void 0 ? void 0 : _b.data, request: error_99 === null || error_99 === void 0 ? void 0 : error_99.request, status: error_99.response ? error_99.response.status : null }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ScheduleOperation.prototype.create = function (info) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var response, data, error_100;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.post("".concat(this.baseUrl, "/create"), info, {
                                withCredentials: true
                            })];
                    case 1:
                        response = _c.sent();
                        data = response.data;
                        return [2 /*return*/, { error: data, message: data.message }];
                    case 2:
                        error_100 = _c.sent();
                        console.log("Error creating new tasks: ", (_a = error_100 === null || error_100 === void 0 ? void 0 : error_100.response) === null || _a === void 0 ? void 0 : _a.data);
                        console.error("Request that caused the error: ", error_100 === null || error_100 === void 0 ? void 0 : error_100.request);
                        return [2 /*return*/, { error: (_b = error_100 === null || error_100 === void 0 ? void 0 : error_100.response) === null || _b === void 0 ? void 0 : _b.data, request: error_100 === null || error_100 === void 0 ? void 0 : error_100.request, status: error_100.response ? error_100.response.status : null }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ScheduleOperation.prototype.update = function (info, condition) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var response, data, error_101;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.put("".concat(this.baseUrl, "/update?id=").concat(condition.id), info, {
                                withCredentials: true
                            })];
                    case 1:
                        response = _c.sent();
                        data = response.data;
                        return [2 /*return*/, { error: data, message: data.message }];
                    case 2:
                        error_101 = _c.sent();
                        console.log("Error updating tasks: ", (_a = error_101 === null || error_101 === void 0 ? void 0 : error_101.response) === null || _a === void 0 ? void 0 : _a.data);
                        console.error("Request that caused the error: ", error_101 === null || error_101 === void 0 ? void 0 : error_101.request);
                        return [2 /*return*/, { error: (_b = error_101 === null || error_101 === void 0 ? void 0 : error_101.response) === null || _b === void 0 ? void 0 : _b.data, request: error_101 === null || error_101 === void 0 ? void 0 : error_101.request, status: error_101.response ? error_101.response.status : null }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ScheduleOperation.prototype.deleteTask = function (condition) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var response, data, error_102;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.delete("".concat(this.baseUrl, "/delete?id=").concat(condition.id), {
                                withCredentials: true
                            })];
                    case 1:
                        response = _c.sent();
                        data = response.data;
                        return [2 /*return*/, { error: data, message: data.message }];
                    case 2:
                        error_102 = _c.sent();
                        console.log("Error deleting tasks: ", (_a = error_102 === null || error_102 === void 0 ? void 0 : error_102.response) === null || _a === void 0 ? void 0 : _a.data);
                        console.error("Request that caused the error: ", error_102 === null || error_102 === void 0 ? void 0 : error_102.request);
                        return [2 /*return*/, { error: (_b = error_102 === null || error_102 === void 0 ? void 0 : error_102.response) === null || _b === void 0 ? void 0 : _b.data, request: error_102 === null || error_102 === void 0 ? void 0 : error_102.request, status: error_102.response ? error_102.response.status : null }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return ScheduleOperation;
}());
exports.ScheduleOperation = ScheduleOperation;
var AdministrativeOperation = /** @class */ (function () {
    function AdministrativeOperation() {
        this.baseUrl = "http://localhost:5000/api/v1/administrative";
    }
    AdministrativeOperation.prototype.get = function (conditions) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var response, data, error_103;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.post("".concat(this.baseUrl, "/search"), conditions, {
                                withCredentials: true
                            })];
                    case 1:
                        response = _c.sent();
                        data = response.data;
                        return [2 /*return*/, { error: data, data: data.data, message: data.message }];
                    case 2:
                        error_103 = _c.sent();
                        console.error("Error getting administrative: ", (_a = error_103 === null || error_103 === void 0 ? void 0 : error_103.response) === null || _a === void 0 ? void 0 : _a.data);
                        console.error("Request that caused the error: ", error_103 === null || error_103 === void 0 ? void 0 : error_103.request);
                        return [2 /*return*/, { error: (_b = error_103 === null || error_103 === void 0 ? void 0 : error_103.response) === null || _b === void 0 ? void 0 : _b.data, request: error_103 === null || error_103 === void 0 ? void 0 : error_103.request, status: error_103.response ? error_103.response.status : null }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return AdministrativeOperation;
}());
exports.AdministrativeOperation = AdministrativeOperation;
