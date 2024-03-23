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
        this.baseUrl = "http://localhost:4000/api/v1/users";
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
        this.baseUrl = "http://localhost:4000/api/v1/staffs";
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
        this.baseUrl = "http://localhost:4000/api/v1/business";
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
        this.baseUrl = "http://localhost:4000/api/v1/partner_staffs";
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
        this.baseUrl = "http://localhost:4000/api/v1/users";
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
        this.baseUrl = "http://localhost:4000/api/v1/agencies";
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
    return AgencyOperation;
}());
exports.AgencyOperation = AgencyOperation;
var TransportPartnersOperation = /** @class */ (function () {
    function TransportPartnersOperation() {
        // this.baseUrl = "https://tdlogistics.govt.hu/api/v1/transport_partners";
        this.baseUrl = "http://localhost:4000/api/v1/transport_partners";
    }
    TransportPartnersOperation.prototype.createByAdmin = function (info) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var response, data, error_18;
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
                        error_18 = _c.sent();
                        console.log("Error creating new transport partner: ", (_a = error_18 === null || error_18 === void 0 ? void 0 : error_18.response) === null || _a === void 0 ? void 0 : _a.data);
                        console.error("Request that caused the error: ", error_18 === null || error_18 === void 0 ? void 0 : error_18.request);
                        return [2 /*return*/, { error: (_b = error_18 === null || error_18 === void 0 ? void 0 : error_18.response) === null || _b === void 0 ? void 0 : _b.data, request: error_18 === null || error_18 === void 0 ? void 0 : error_18.request, status: error_18.response ? error_18.response.status : null }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    TransportPartnersOperation.prototype.createByAgency = function (info) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var response, data, error_19;
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
                        error_19 = _c.sent();
                        console.log("Error creating new transport partner: ", (_a = error_19 === null || error_19 === void 0 ? void 0 : error_19.response) === null || _a === void 0 ? void 0 : _a.data);
                        console.error("Request that caused the error: ", error_19 === null || error_19 === void 0 ? void 0 : error_19.request);
                        return [2 /*return*/, { error: (_b = error_19 === null || error_19 === void 0 ? void 0 : error_19.response) === null || _b === void 0 ? void 0 : _b.data, request: error_19 === null || error_19 === void 0 ? void 0 : error_19.request, status: error_19.response ? error_19.response.status : null }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    TransportPartnersOperation.prototype.findByTransportPartner = function (condition) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var response, data, error_20;
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
                        error_20 = _c.sent();
                        console.log("Error finding transport partner: ", (_a = error_20 === null || error_20 === void 0 ? void 0 : error_20.response) === null || _a === void 0 ? void 0 : _a.data);
                        console.error("Request that caused the error: ", error_20 === null || error_20 === void 0 ? void 0 : error_20.request);
                        return [2 /*return*/, { error: (_b = error_20 === null || error_20 === void 0 ? void 0 : error_20.response) === null || _b === void 0 ? void 0 : _b.data, request: error_20 === null || error_20 === void 0 ? void 0 : error_20.request, status: error_20.response ? error_20.response.status : null }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    TransportPartnersOperation.prototype.findByAdmin = function (conditions) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var response, data, error_21;
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
                        error_21 = _c.sent();
                        console.log("Error finding transport partner: ", (_a = error_21 === null || error_21 === void 0 ? void 0 : error_21.response) === null || _a === void 0 ? void 0 : _a.data);
                        console.error("Request that caused the error: ", error_21 === null || error_21 === void 0 ? void 0 : error_21.request);
                        return [2 /*return*/, { error: (_b = error_21 === null || error_21 === void 0 ? void 0 : error_21.response) === null || _b === void 0 ? void 0 : _b.data, request: error_21 === null || error_21 === void 0 ? void 0 : error_21.request, status: error_21.response ? error_21.response.status : null }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    TransportPartnersOperation.prototype.update = function (info, condition) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var response, data, error_22;
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
                        error_22 = _c.sent();
                        console.log("Error updating transport partner: ", (_a = error_22 === null || error_22 === void 0 ? void 0 : error_22.response) === null || _a === void 0 ? void 0 : _a.data);
                        console.error("Request that caused the error: ", error_22 === null || error_22 === void 0 ? void 0 : error_22.request);
                        return [2 /*return*/, { error: (_b = error_22 === null || error_22 === void 0 ? void 0 : error_22.response) === null || _b === void 0 ? void 0 : _b.data, request: error_22 === null || error_22 === void 0 ? void 0 : error_22.request, status: error_22.response ? error_22.response.status : null }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    TransportPartnersOperation.prototype.remove = function (condition) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var response, data, error_23;
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
                        error_23 = _c.sent();
                        console.log("Error deleting transport partner: ", (_a = error_23 === null || error_23 === void 0 ? void 0 : error_23.response) === null || _a === void 0 ? void 0 : _a.data);
                        console.error("Request that caused the error: ", error_23 === null || error_23 === void 0 ? void 0 : error_23.request);
                        return [2 /*return*/, { error: (_b = error_23 === null || error_23 === void 0 ? void 0 : error_23.response) === null || _b === void 0 ? void 0 : _b.data, request: error_23 === null || error_23 === void 0 ? void 0 : error_23.request, status: error_23.response ? error_23.response.status : null }];
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
        this.baseUrl = "http://localhost:4000/api/v1/vehicles";
    }
    VehicleOperation.prototype.checkExist = function (condition) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var response, data, error_24;
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
                        error_24 = _c.sent();
                        console.log("Error checking exist vehicle: ", (_a = error_24 === null || error_24 === void 0 ? void 0 : error_24.response) === null || _a === void 0 ? void 0 : _a.data);
                        console.error("Request that caused the error: ", error_24 === null || error_24 === void 0 ? void 0 : error_24.request);
                        return [2 /*return*/, { error: (_b = error_24 === null || error_24 === void 0 ? void 0 : error_24.response) === null || _b === void 0 ? void 0 : _b.data, request: error_24 === null || error_24 === void 0 ? void 0 : error_24.request, status: error_24.response ? error_24.response.status : null }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    VehicleOperation.prototype.createByAgency = function (info) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var response, data, error_25;
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
                        error_25 = _c.sent();
                        console.log("Error creating new vehicle: ", (_a = error_25 === null || error_25 === void 0 ? void 0 : error_25.response) === null || _a === void 0 ? void 0 : _a.data);
                        console.error("Request that caused the error: ", error_25 === null || error_25 === void 0 ? void 0 : error_25.request);
                        return [2 /*return*/, { error: (_b = error_25 === null || error_25 === void 0 ? void 0 : error_25.response) === null || _b === void 0 ? void 0 : _b.data, request: error_25 === null || error_25 === void 0 ? void 0 : error_25.request, status: error_25.response ? error_25.response.status : null }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    VehicleOperation.prototype.createByAdmin = function (info) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var response, data, error_26;
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
                        error_26 = _c.sent();
                        console.log("Error creating new vehicle: ", (_a = error_26 === null || error_26 === void 0 ? void 0 : error_26.response) === null || _a === void 0 ? void 0 : _a.data);
                        console.error("Request that caused the error: ", error_26 === null || error_26 === void 0 ? void 0 : error_26.request);
                        return [2 /*return*/, { error: (_b = error_26 === null || error_26 === void 0 ? void 0 : error_26.response) === null || _b === void 0 ? void 0 : _b.data, request: error_26 === null || error_26 === void 0 ? void 0 : error_26.request, status: error_26.response ? error_26.response.status : null }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    VehicleOperation.prototype.findByStaff = function (condition) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var response, data, error_27;
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
                        error_27 = _c.sent();
                        console.log("Error finding vehicle: ", (_a = error_27 === null || error_27 === void 0 ? void 0 : error_27.response) === null || _a === void 0 ? void 0 : _a.data);
                        console.error("Request that caused the error: ", error_27 === null || error_27 === void 0 ? void 0 : error_27.request);
                        return [2 /*return*/, { error: (_b = error_27 === null || error_27 === void 0 ? void 0 : error_27.response) === null || _b === void 0 ? void 0 : _b.data, request: error_27 === null || error_27 === void 0 ? void 0 : error_27.request, status: error_27.response ? error_27.response.status : null }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    VehicleOperation.prototype.findByAdmin = function (conditions) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var response, data, error_28;
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
                        error_28 = _c.sent();
                        console.log("Error finding vehicle: ", (_a = error_28 === null || error_28 === void 0 ? void 0 : error_28.response) === null || _a === void 0 ? void 0 : _a.data);
                        console.error("Request that caused the error: ", error_28 === null || error_28 === void 0 ? void 0 : error_28.request);
                        return [2 /*return*/, { error: (_b = error_28 === null || error_28 === void 0 ? void 0 : error_28.response) === null || _b === void 0 ? void 0 : _b.data, request: error_28 === null || error_28 === void 0 ? void 0 : error_28.request, status: error_28.response ? error_28.response.status : null }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    VehicleOperation.prototype.getShipment = function (condition) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var response, data, error_29;
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
                        error_29 = _c.sent();
                        console.log("Error getting shipments contained by vehicle: ", (_a = error_29 === null || error_29 === void 0 ? void 0 : error_29.response) === null || _a === void 0 ? void 0 : _a.data);
                        console.error("Request that caused the error: ", error_29 === null || error_29 === void 0 ? void 0 : error_29.request);
                        return [2 /*return*/, { error: (_b = error_29 === null || error_29 === void 0 ? void 0 : error_29.response) === null || _b === void 0 ? void 0 : _b.data, request: error_29 === null || error_29 === void 0 ? void 0 : error_29.request, status: error_29.response ? error_29.response.status : null }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    VehicleOperation.prototype.update = function (info, condition) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var response, data, error_30;
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
                        error_30 = _c.sent();
                        console.log("Error updating vehicle: ", (_a = error_30 === null || error_30 === void 0 ? void 0 : error_30.response) === null || _a === void 0 ? void 0 : _a.data);
                        console.error("Request that caused the error: ", error_30 === null || error_30 === void 0 ? void 0 : error_30.request);
                        return [2 /*return*/, { error: (_b = error_30 === null || error_30 === void 0 ? void 0 : error_30.response) === null || _b === void 0 ? void 0 : _b.data, request: error_30 === null || error_30 === void 0 ? void 0 : error_30.request, status: error_30.response ? error_30.response.status : null }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    VehicleOperation.prototype.addShipments = function (info, condition) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var response, data, error_31;
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
                        error_31 = _c.sent();
                        console.log("Error adding shipments to vehicle: ", (_a = error_31 === null || error_31 === void 0 ? void 0 : error_31.response) === null || _a === void 0 ? void 0 : _a.data);
                        console.error("Request that caused the error: ", error_31 === null || error_31 === void 0 ? void 0 : error_31.request);
                        return [2 /*return*/, { error: (_b = error_31 === null || error_31 === void 0 ? void 0 : error_31.response) === null || _b === void 0 ? void 0 : _b.data, request: error_31 === null || error_31 === void 0 ? void 0 : error_31.request, status: error_31.response ? error_31.response.status : null }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    VehicleOperation.prototype.deleteShipments = function (info, condition) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var response, data, error_32;
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
                        error_32 = _c.sent();
                        console.log("Error deleting shipments from vehicle: ", (_a = error_32 === null || error_32 === void 0 ? void 0 : error_32.response) === null || _a === void 0 ? void 0 : _a.data);
                        console.error("Request that caused the error: ", error_32 === null || error_32 === void 0 ? void 0 : error_32.request);
                        return [2 /*return*/, { error: (_b = error_32 === null || error_32 === void 0 ? void 0 : error_32.response) === null || _b === void 0 ? void 0 : _b.data, request: error_32 === null || error_32 === void 0 ? void 0 : error_32.request, status: error_32.response ? error_32.response.status : null }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    VehicleOperation.prototype.deleteVehicle = function (condition) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var response, data, error_33;
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
                        error_33 = _c.sent();
                        console.log("Error deleting vehicle: ", (_a = error_33 === null || error_33 === void 0 ? void 0 : error_33.response) === null || _a === void 0 ? void 0 : _a.data);
                        console.error("Request that caused the error: ", error_33 === null || error_33 === void 0 ? void 0 : error_33.request);
                        return [2 /*return*/, { error: (_b = error_33 === null || error_33 === void 0 ? void 0 : error_33.response) === null || _b === void 0 ? void 0 : _b.data, request: error_33 === null || error_33 === void 0 ? void 0 : error_33.request, status: error_33.response ? error_33.response.status : null }];
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
        this.baseUrl = "http://localhost:4000/api/v1/staffs";
    }
    // ROLE: any
    StaffsOperation.prototype.getAuthenticatedStaffInfo = function () {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var response, data, error_34;
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
                        error_34 = _c.sent();
                        console.log("Error get authenticated staff information: ", (_a = error_34 === null || error_34 === void 0 ? void 0 : error_34.response) === null || _a === void 0 ? void 0 : _a.data);
                        console.error("Request that caused the error: ", error_34 === null || error_34 === void 0 ? void 0 : error_34.request);
                        return [2 /*return*/, { error: (_b = error_34 === null || error_34 === void 0 ? void 0 : error_34.response) === null || _b === void 0 ? void 0 : _b.data, request: error_34 === null || error_34 === void 0 ? void 0 : error_34.request, status: error_34.response ? error_34.response.status : null }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    // ROLE: any
    StaffsOperation.prototype.findByStaff = function (condition) {
        return __awaiter(this, void 0, void 0, function () {
            var response, data, error_35;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.post("".concat(this.baseUrl, "search?staff_id=").concat(condition.staff_id), {
                                withCredentials: true,
                            })];
                    case 1:
                        response = _a.sent();
                        data = response.data;
                        return [2 /*return*/, { error: data.error, data: data.data, message: data.message }];
                    case 2:
                        error_35 = _a.sent();
                        console.log("Error get one staff: ", error_35.response.data);
                        return [2 /*return*/, error_35.response.data];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    // ROLE: ADMIN, TELLER, HUMAN_RESOURCE_MANAGER, COMPLAINTS_SOLVER, AGENCY_MANAGER, AGENCY_HUMAN_RESOURCE_MANAGER
    StaffsOperation.prototype.findByAdmin = function (conditions) {
        return __awaiter(this, void 0, void 0, function () {
            var response, data, error_36;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.post("".concat(this.baseUrl, "/search"), conditions, {
                                withCredentials: true,
                            })];
                    case 1:
                        response = _a.sent();
                        data = response.data;
                        return [2 /*return*/, { error: data.error, data: data.data, message: data.message }];
                    case 2:
                        error_36 = _a.sent();
                        console.log("Error get one staff: ", error_36.response.data);
                        return [2 /*return*/, error_36.response.data];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    // ROLE: ADMIN, MANAGER, HUMAN_RESOURCE_MANAGER
    StaffsOperation.prototype.createByAdmin = function (info) {
        return __awaiter(this, void 0, void 0, function () {
            var response, data, error_37;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.post("".concat(this.baseUrl, "/create"), info, {
                                withCredentials: true,
                            })];
                    case 1:
                        response = _a.sent();
                        data = response.data;
                        return [2 /*return*/, { error: data.error, message: data.message }];
                    case 2:
                        error_37 = _a.sent();
                        console.log("Error create new staff: ", error_37.response.data);
                        return [2 /*return*/, error_37.response.data];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    // ROLE: AGENCY_MANAGER, AGENCY_HUMAN_RESOURCE_MANAGER
    StaffsOperation.prototype.createByAgency = function (info) {
        return __awaiter(this, void 0, void 0, function () {
            var response, data, error_38;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.post("".concat(this.baseUrl, "/create"), info, {
                                withCredentials: true,
                            })];
                    case 1:
                        response = _a.sent();
                        data = response.data;
                        return [2 /*return*/, { error: data.error, message: data.message }];
                    case 2:
                        error_38 = _a.sent();
                        console.log("Error create new staff: ", error_38.response.data);
                        return [2 /*return*/, error_38.response.data];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    // ROLE: ADMIN, MANAGER, HUMAN_RESOURCE_MANAGER, AGENCY_MANAGER, AGENCY_HUMAN_RESOURCE_MANAGER
    StaffsOperation.prototype.update = function (info, condition) {
        return __awaiter(this, void 0, void 0, function () {
            var response, data, error_39;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.put("".concat(this.baseUrl, "/update?staff_id=").concat(condition.staff_id), info, {
                                withCredentials: true,
                            })];
                    case 1:
                        response = _a.sent();
                        data = response.data;
                        return [2 /*return*/, { error: data.error, message: data.message }];
                    case 2:
                        error_39 = _a.sent();
                        console.log("Error create new staff: ", error_39.response.data);
                        return [2 /*return*/, error_39.response.data];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    // ROLE: ADMIN, MANAGER, HUMAN_RESOURCE_MANAGER, AGENCY_MANAGER, AGENCY_HUMAN_RESOURCE_MANAGER
    StaffsOperation.prototype.deleteStaff = function (condition) {
        return __awaiter(this, void 0, void 0, function () {
            var response, data, error_40;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.delete("".concat(this.baseUrl, "/delete?staff_id=").concat(condition.staff_id), {
                                withCredentials: true,
                            })];
                    case 1:
                        response = _a.sent();
                        data = response.data;
                        return [2 /*return*/, { error: data.error, message: data.message }];
                    case 2:
                        error_40 = _a.sent();
                        console.log("Error deleting staff: ", error_40.response.data);
                        return [2 /*return*/, error_40.response.data];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    // ROLE: ADMIN, MANAGER, HUMAN_RESOURCE_MANAGER, AGENCY_MANAGER, AGENCY_HUMAN_RESOURCE_MANAGER
    StaffsOperation.prototype.updateAvatar = function (info, condition) {
        return __awaiter(this, void 0, void 0, function () {
            var formData, response, data, error_41;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        formData = new FormData();
                        formData.append('avatar', info.avatarFile);
                        return [4 /*yield*/, axios_1.default.patch("".concat(this.baseUrl, "/update_avatar?staff_id=").concat(condition.staff_id), formData, {
                                withCredentials: true,
                            })];
                    case 1:
                        response = _a.sent();
                        data = response.data;
                        return [2 /*return*/, { error: data.error, message: data.message }];
                    case 2:
                        error_41 = _a.sent();
                        console.error('Error uploading image:', error_41.response.data);
                        return [2 /*return*/, error_41.response.data]; // Ném lỗi để xử lý bên ngoài
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    StaffsOperation.prototype.logout = function () {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var response, data, error_42;
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
                        error_42 = _c.sent();
                        console.log("Error logging out: ", (_a = error_42 === null || error_42 === void 0 ? void 0 : error_42.response) === null || _a === void 0 ? void 0 : _a.data);
                        console.error("Request that caused the error: ", error_42 === null || error_42 === void 0 ? void 0 : error_42.request);
                        return [2 /*return*/, { error: (_b = error_42 === null || error_42 === void 0 ? void 0 : error_42.response) === null || _b === void 0 ? void 0 : _b.data, request: error_42 === null || error_42 === void 0 ? void 0 : error_42.request, status: error_42.response ? error_42.response.status : null }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    // ROLE: any. But one staff can just change his/her own password.
    // So that, the staff_id in session must be the same with the staff_id in the query. 
    StaffsOperation.prototype.updatePassword = function (info, condition) {
        return __awaiter(this, void 0, void 0, function () {
            var response, data, error_43;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.patch("".concat(this.baseUrl, "/update_password?staff_id=").concat(condition.staff_id), info, {
                                withCredentials: true,
                            })];
                    case 1:
                        response = _a.sent();
                        data = response.data;
                        return [2 /*return*/, { error: data.error, data: data.data, message: data.message }];
                    case 2:
                        error_43 = _a.sent();
                        console.log("Error update password: ", error_43.response.data);
                        return [2 /*return*/, error_43.response.data];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    // ROLE: any.
    StaffsOperation.prototype.getAvatar = function (condition) {
        return __awaiter(this, void 0, void 0, function () {
            var response, blob, imgUrl, error_44;
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
                        error_44 = _a.sent();
                        console.error("Error getting avatar: ", error_44);
                        return [2 /*return*/, error_44.response.data];
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
        this.baseUrl = "http://localhost:4000/api/v1/business";
    }
    // "ADMIN", "MANAGER", "HUMAN_RESOURCE_MANAGER"
    BusinessOperation.prototype.createByAdmin = function (info) {
        return __awaiter(this, void 0, void 0, function () {
            var response, data, error_45;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.post("".concat(this.baseUrl, "/create"), info, {
                                withCredentials: true,
                            })];
                    case 1:
                        response = _a.sent();
                        data = response.data;
                        return [2 /*return*/, { error: data.error, message: data.message }];
                    case 2:
                        error_45 = _a.sent();
                        console.log("Error creating new business: ", error_45.response.data);
                        return [2 /*return*/, error_45.response.data];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    // "AGENCY_MANAGER", "AGENCY_HUMAN_RESOURCE_MANAGER"
    BusinessOperation.prototype.createByAgency = function (info) {
        return __awaiter(this, void 0, void 0, function () {
            var response, data, error_46;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.post("".concat(this.baseUrl, "/create"), info, {
                                withCredentials: true,
                            })];
                    case 1:
                        response = _a.sent();
                        data = response.data;
                        return [2 /*return*/, { error: data.error, message: data.message }];
                    case 2:
                        error_46 = _a.sent();
                        console.log("Error creating new business: ", error_46.response.data);
                        return [2 /*return*/, error_46.response.data];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    // "BUSINESS"
    BusinessOperation.prototype.findByBusiness = function (condition) {
        return __awaiter(this, void 0, void 0, function () {
            var response, data, error_47;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.post("".concat(this.baseUrl, "/search?business_id=").concat(condition.business_id), {
                                withCredentials: true,
                            })];
                    case 1:
                        response = _a.sent();
                        data = response.data;
                        return [2 /*return*/, { error: data.error, data: data.data, message: data.message }];
                    case 2:
                        error_47 = _a.sent();
                        console.log("Error finding business: ", error_47.response.data);
                        return [2 /*return*/, error_47.response.data];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    // "ADMIN", "MANAGER", "HUMAN_RESOURCE_MANAGER", "TELLER", "COMPLAINTS_SOLVER",
    // "AGENCY_MANAGER", "AGENCY_HUMAN_RESOURCE_MANAGER", "AGENCY_TELLER", "AGENCY_COMPLAINTS_SOLVER"
    BusinessOperation.prototype.findByAdmin = function (conditions) {
        return __awaiter(this, void 0, void 0, function () {
            var response, data, error_48;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.post("".concat(this.baseUrl, "/search"), conditions, {
                                withCredentials: true,
                            })];
                    case 1:
                        response = _a.sent();
                        data = response.data;
                        return [2 /*return*/, { error: data.error, data: data.data, message: data.message }];
                    case 2:
                        error_48 = _a.sent();
                        console.log("Error finding business: ", error_48.response.data);
                        return [2 /*return*/, error_48.response.data];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    // BUSINESS
    BusinessOperation.prototype.findRepresentorByBusiness = function (condition) {
        return __awaiter(this, void 0, void 0, function () {
            var response, data, error_49;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.post("".concat(this.baseUrl, "/search_representor"), condition, {
                                withCredentials: true,
                            })];
                    case 1:
                        response = _a.sent();
                        data = response.data;
                        return [2 /*return*/, { error: data.error, data: data.data, message: data.message }];
                    case 2:
                        error_49 = _a.sent();
                        console.log("Error finding representor: ", error_49.response.data);
                        return [2 /*return*/, error_49.response.data];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    // "ADMIN", "MANAGER", "HUMAN_RESOURCE_MANAGER", "TELLER", "COMPLAINTS_SOLVER",
    // "AGENCY_MANAGER", "AGENCY_HUMAN_RESOURCE_MANAGER", "AGENCY_TELLER", "AGENCY_COMPLAINTS_SOLVER"
    BusinessOperation.prototype.findRepresentorByAdmin = function (conditions) {
        return __awaiter(this, void 0, void 0, function () {
            var response, data, error_50;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.post("".concat(this.baseUrl, "/search_representor"), conditions, {
                                withCredentials: true,
                            })];
                    case 1:
                        response = _a.sent();
                        data = response.data;
                        return [2 /*return*/, { error: data.error, data: data.data, message: data.message }];
                    case 2:
                        error_50 = _a.sent();
                        console.log("Error finding representor: ", error_50.response.data);
                        return [2 /*return*/, error_50.response.data];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    // "ADMIN", "MANAGER", "TELLER", "AGENCY_MANAGER", "AGENCY_TELLER"
    BusinessOperation.prototype.updateBusiness = function (info, condition) {
        return __awaiter(this, void 0, void 0, function () {
            var response, data, error_51;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.put("".concat(this.baseUrl, "/update?business_id=").concat(condition.business_id), info, {
                                withCredentials: true,
                            })];
                    case 1:
                        response = _a.sent();
                        data = response.data;
                        return [2 /*return*/, { error: data.error, message: data.message }];
                    case 2:
                        error_51 = _a.sent();
                        console.log("Error updating business: ", error_51.response.data);
                        return [2 /*return*/, error_51.response.data];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    // "ADMIN", "MANAGER", "TELLER", "AGENCY_MANAGER", "AGENCY_TELLER"
    BusinessOperation.prototype.updateBusinessRepresentor = function (info, condition) {
        return __awaiter(this, void 0, void 0, function () {
            var response, data, error_52;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.post("".concat(this.baseUrl, "/update_business_representor?business_id=").concat(condition.business_id), info, {
                                withCredentials: true,
                            })];
                    case 1:
                        response = _a.sent();
                        data = response.data;
                        return [2 /*return*/, { error: data.error, message: data.message }];
                    case 2:
                        error_52 = _a.sent();
                        console.log("Error updating business: ", error_52.response.data);
                        return [2 /*return*/, error_52.response.data];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    // any
    BusinessOperation.prototype.checkExist = function (condition) {
        return __awaiter(this, void 0, void 0, function () {
            var response, data, error_53;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.post("".concat(this.baseUrl, "/check?tax_number=").concat(condition.tax_number), {
                                withCredentials: true,
                            })];
                    case 1:
                        response = _a.sent();
                        data = response.data;
                        return [2 /*return*/, { error: data.error, existed: data.existed, message: data.message }];
                    case 2:
                        error_53 = _a.sent();
                        console.log("Error checking exist business: ", error_53.response.data);
                        return [2 /*return*/, error_53.response.data];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    // "ADMIN", "MANAGER", "TELLER", "AGENCY_MANAGER", "AGENCY_TELLER"
    BusinessOperation.prototype.removeBusiness = function (condition) {
        return __awaiter(this, void 0, void 0, function () {
            var response, data, error_54;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.post("".concat(this.baseUrl, "/delete?business_id=").concat(condition.business_id, "&agency_id=").concat(condition.agency_id), {
                                withCredentials: true,
                            })];
                    case 1:
                        response = _a.sent();
                        data = response.data;
                        return [2 /*return*/, { error: data.error, message: data.message }];
                    case 2:
                        error_54 = _a.sent();
                        console.log("Error deleting business: ", error_54.response.data);
                        return [2 /*return*/, error_54.response.data];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    // "ADMIN", "MANAGER", "TELLER", "AGENCY_MANAGER", "AGENCY_TELLER"
    BusinessOperation.prototype.updateContract = function (info, condition) {
        return __awaiter(this, void 0, void 0, function () {
            var formData, response, data, error_55;
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
                        error_55 = _a.sent();
                        console.error('Error uploading file:', error_55.response.data);
                        return [2 /*return*/, error_55.response.data]; // Ném lỗi để xử lý bên ngoài
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    // "ADMIN", "MANAGER", "HUMAN_RESOURCE_MANAGER", "TELLER", "COMPLAINTS_SOLVER",
    // "AGENCY_MANAGER", "AGENCY_HUMAN_RESOURCE_MANAGER", "AGENCY_TELLER", "AGENCY_COMPLAINTS_SOLVER", "BUSINESS"
    BusinessOperation.prototype.findContract = function (condition) {
        return __awaiter(this, void 0, void 0, function () {
            var response, blob, fileUrl, error_56;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.get("".concat(this.baseUrl, "/get_contract?business_id=").concat(condition.business_id), {
                                responseType: 'arraybuffer',
                            })];
                    case 1:
                        response = _a.sent();
                        blob = new Blob([response.data], { type: response.headers['content-type'] });
                        fileUrl = URL.createObjectURL(blob);
                        return [2 /*return*/, fileUrl];
                    case 2:
                        error_56 = _a.sent();
                        console.error("Error getting contract: ", error_56);
                        return [2 /*return*/, error_56.response.data];
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
        this.baseUrl = "http://localhost:4000/api/v1/partner_staffs";
    }
    // ROLE: PARTNER_DRIVER, PARTNER_SHIPPER
    PartnerStaffOperation.prototype.getAuthenticatedPartnerStaffInfo = function () {
        return __awaiter(this, void 0, void 0, function () {
            var response, data, error_57;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.get("".concat(this.baseUrl, "/get_info"), {
                                withCredentials: true,
                            })];
                    case 1:
                        response = _a.sent();
                        data = response.data;
                        return [2 /*return*/, { error: data.error, data: data.data, message: data.message }];
                    case 2:
                        error_57 = _a.sent();
                        console.log("Error getting authenticated partner staff information: ", error_57.response.data);
                        return [2 /*return*/, error_57.response.data];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    // ROLE: ADMIN, MANAGER, HUMAN_RESOURCE_MANAGER, AGENCY_MANAGER, AGENCY_HUMAN_RESOURCE_MANAGER
    PartnerStaffOperation.prototype.create = function (info) {
        return __awaiter(this, void 0, void 0, function () {
            var response, data, error_58;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.post("".concat(this.baseUrl, "/create"), info, {
                                withCredentials: true,
                            })];
                    case 1:
                        response = _a.sent();
                        data = response.data;
                        return [2 /*return*/, { error: data.error, message: data.message }];
                    case 2:
                        error_58 = _a.sent();
                        console.log("Error creating partner staff: ", error_58.response.data);
                        return [2 /*return*/, error_58.response.data];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    // ROLE: PARTNER_DRIVER, PARTNER_SHIPPER
    PartnerStaffOperation.prototype.findByPartnerStaff = function (condition) {
        return __awaiter(this, void 0, void 0, function () {
            var response, data, error_59;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.post("".concat(this.baseUrl, "/search"), condition, {
                                withCredentials: true,
                            })];
                    case 1:
                        response = _a.sent();
                        data = response.data;
                        return [2 /*return*/, { error: data.error, data: data.data, message: data.message }];
                    case 2:
                        error_59 = _a.sent();
                        console.log("Error finding partner staff: ", error_59.response.data);
                        return [2 /*return*/, error_59.response.data];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    // ROLE: TRANSPORT_PARTNER_REPRESENTOR
    PartnerStaffOperation.prototype.findByPartner = function (conditions) {
        return __awaiter(this, void 0, void 0, function () {
            var response, data, error_60;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.post("".concat(this.baseUrl, "/search"), conditions, {
                                withCredentials: true,
                            })];
                    case 1:
                        response = _a.sent();
                        data = response.data;
                        return [2 /*return*/, { error: data.error, data: data.data, message: data.message }];
                    case 2:
                        error_60 = _a.sent();
                        console.log("Error finding partner staff: ", error_60.response.data);
                        return [2 /*return*/, error_60.response.data];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    // ROLE: ADMIN, MANAGER, HUMAN_RESOURCE_MANAGER, TELLER, COMPLAINTS_SOLVER, AGENCY_MANAGER, AGENCY_HUMAN_RESOURCE_MANAGER, AGENCY_TELLER, AGENCY_COMPLAINTS_SOLVER 
    PartnerStaffOperation.prototype.findByAdmin = function (conditions) {
        return __awaiter(this, void 0, void 0, function () {
            var response, data, error_61;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.post("".concat(this.baseUrl, "/search"), conditions, {
                                withCredentials: true,
                            })];
                    case 1:
                        response = _a.sent();
                        data = response.data;
                        return [2 /*return*/, { error: data.error, data: data.data, message: data.message }];
                    case 2:
                        error_61 = _a.sent();
                        console.log("Error finding partner staff: ", error_61.response.data);
                        return [2 /*return*/, error_61.response.data];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    // ROLE: ADMIN, MANAGER, HUMAN_RESOURCE_MANAGER, AGENCY_MANAGER, AGENCY_HUMAN_RESOURCE_MANAGER
    PartnerStaffOperation.prototype.updatePartnerStaff = function (info, condition) {
        return __awaiter(this, void 0, void 0, function () {
            var response, data, error_62;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.post("".concat(this.baseUrl, "/update?staff_id=").concat(condition.staff_id), info, {
                                withCredentials: true,
                            })];
                    case 1:
                        response = _a.sent();
                        data = response.data;
                        return [2 /*return*/, { error: data.error, message: data.message }];
                    case 2:
                        error_62 = _a.sent();
                        console.log("Error updating partner staff: ", error_62.response.data);
                        return [2 /*return*/, error_62.response.data];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    // ROLE: any
    PartnerStaffOperation.prototype.checkExist = function (condition) {
        return __awaiter(this, void 0, void 0, function () {
            var response, data, error_63;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.post("".concat(this.baseUrl, "/check?cccd=").concat(condition.cccd), {
                                withCredentials: true,
                            })];
                    case 1:
                        response = _a.sent();
                        data = response.data;
                        return [2 /*return*/, { error: data.error, existed: data.existed, message: data.message }];
                    case 2:
                        error_63 = _a.sent();
                        console.log("Error checking exist partner staff: ", error_63.response.data);
                        return [2 /*return*/, error_63.response.data];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    // ROLE: ADMIN, MANAGER, HUMAN_RESOURCE_MANAGER, AGENCY_MANAGER, AGENCY_HUMAN_RESOURCE_MANAGER
    PartnerStaffOperation.prototype.deletePartnerStaff = function (condition) {
        return __awaiter(this, void 0, void 0, function () {
            var response, data, error_64;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.post("".concat(this.baseUrl, "/delete?staff_id=").concat(condition.staff_id), {
                                withCredentials: true,
                            })];
                    case 1:
                        response = _a.sent();
                        data = response.data;
                        return [2 /*return*/, { error: data.error, message: data.message }];
                    case 2:
                        error_64 = _a.sent();
                        console.log("Error deleting business: ", error_64.response.data);
                        return [2 /*return*/, error_64.response.data];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    // ROLE: PARTNER_DRIVER, PARTNER_SHIPPER
    PartnerStaffOperation.prototype.updatePassword = function (info) {
        return __awaiter(this, void 0, void 0, function () {
            var response, data, error_65;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.patch("".concat(this.baseUrl, "/update_password"), info, {
                                withCredentials: true,
                            })];
                    case 1:
                        response = _a.sent();
                        data = response.data;
                        return [2 /*return*/, { error: data.error, data: data.data, message: data.message }];
                    case 2:
                        error_65 = _a.sent();
                        console.log("Error update password: ", error_65.response.data);
                        return [2 /*return*/, error_65.response.data];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    // ROLE: ADMIN, MANAGER, HUMAN_RESOURCE_MANAGER, AGENCY_MANAGER, AGENCY_HUMAN_RESOURCE_MANAGER
    PartnerStaffOperation.prototype.updatePartnerStaffAvatar = function (info, condition) {
        return __awaiter(this, void 0, void 0, function () {
            var formData, response, data, error_66;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        formData = new FormData();
                        formData.append('avatar', info.avatarFile);
                        return [4 /*yield*/, axios_1.default.patch("".concat(this.baseUrl, "/update_avatar?staff_id=").concat(condition.staff_id), formData, {
                                withCredentials: true,
                            })];
                    case 1:
                        response = _a.sent();
                        data = response.data;
                        return [2 /*return*/, { error: data.error, message: data.message }];
                    case 2:
                        error_66 = _a.sent();
                        console.error('Error uploading image:', error_66.response.data);
                        return [2 /*return*/, error_66.response.data]; // Ném lỗi để xử lý bên ngoài
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    // ROLE: ADMIN, MANAGER, HUMAN_RESOURCE_MANAGER, AGENCY_MANAGER, AGENCY_HUMAN_RESOURCE_MANAGER
    PartnerStaffOperation.prototype.updatePartnerStaffLicense = function (info, condition) {
        return __awaiter(this, void 0, void 0, function () {
            var formData, response, data, error_67;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        formData = new FormData();
                        formData.append('license_before', info.license_before);
                        formData.append('license_after', info.license_after);
                        return [4 /*yield*/, axios_1.default.patch("".concat(this.baseUrl, "/update_licenses?staff_id=").concat(condition.staff_id), formData, {
                                withCredentials: true,
                            })];
                    case 1:
                        response = _a.sent();
                        data = response.data;
                        return [2 /*return*/, { error: data.error, message: data.message }];
                    case 2:
                        error_67 = _a.sent();
                        console.error('Error uploading image:', error_67.response.data);
                        return [2 /*return*/, error_67.response.data]; // Ném lỗi để xử lý bên ngoài
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    // ROLE: ADMIN, MANAGER, HUMAN_RESOURCE_MANAGER, AGENCY_MANAGER, AGENCY_HUMAN_RESOURCE_MANAGER, PARTNER_DRIVER, PARTNER_SHIPPER
    PartnerStaffOperation.prototype.findPartnerStaffAvatar = function (condition) {
        return __awaiter(this, void 0, void 0, function () {
            var response, blob, fileUrl, error_68;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.get("".concat(this.baseUrl, "/get_avatar?staff_id=").concat(condition.staff_id), {
                                responseType: 'arraybuffer',
                            })];
                    case 1:
                        response = _a.sent();
                        blob = new Blob([response.data], { type: response.headers['content-type'] });
                        fileUrl = URL.createObjectURL(blob);
                        return [2 /*return*/, fileUrl];
                    case 2:
                        error_68 = _a.sent();
                        console.error("Error getting avatar: ", error_68);
                        return [2 /*return*/, error_68.response.data];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    // ROLE: ADMIN, MANAGER, HUMAN_RESOURCE_MANAGER, AGENCY_MANAGER, AGENCY_HUMAN_RESOURCE_MANAGER, PARTNER_DRIVER, PARTNER_SHIPPER
    PartnerStaffOperation.prototype.findPartnerStaffLicenseBefore = function (condition) {
        return __awaiter(this, void 0, void 0, function () {
            var response, blob, fileUrl, error_69;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.get("".concat(this.baseUrl, "/get_license_before?staff_id=").concat(condition.staff_id), {
                                responseType: 'arraybuffer',
                            })];
                    case 1:
                        response = _a.sent();
                        blob = new Blob([response.data], { type: response.headers['content-type'] });
                        fileUrl = URL.createObjectURL(blob);
                        return [2 /*return*/, fileUrl];
                    case 2:
                        error_69 = _a.sent();
                        console.error("Error getting license front: ", error_69);
                        return [2 /*return*/, error_69.response.data];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    // ROLE: ADMIN, MANAGER, HUMAN_RESOURCE_MANAGER, AGENCY_MANAGER, AGENCY_HUMAN_RESOURCE_MANAGER, PARTNER_DRIVER, PARTNER_SHIPPER
    PartnerStaffOperation.prototype.findPartnerStaffLicenseAfter = function (condition) {
        return __awaiter(this, void 0, void 0, function () {
            var response, blob, fileUrl, error_70;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.get("".concat(this.baseUrl, "/get_license_after?staff_id=").concat(condition.staff_id), {
                                responseType: 'arraybuffer',
                            })];
                    case 1:
                        response = _a.sent();
                        blob = new Blob([response.data], { type: response.headers['content-type'] });
                        fileUrl = URL.createObjectURL(blob);
                        return [2 /*return*/, fileUrl];
                    case 2:
                        error_70 = _a.sent();
                        console.error("Error getting license after: ", error_70);
                        return [2 /*return*/, error_70.response.data];
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
        this.baseUrl = "http://localhost:4000/api/v1/shippers";
    }
    ShippersOperation.prototype.getTask = function (condition) {
        return __awaiter(this, void 0, void 0, function () {
            var response, data, error_71;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.post("".concat(this.baseUrl, "/get_tasks"), condition, {
                                withCredentials: true,
                            })];
                    case 1:
                        response = _a.sent();
                        data = response.data;
                        return [2 /*return*/, { error: data.error, data: data.data, message: data.message }];
                    case 2:
                        error_71 = _a.sent();
                        console.log("Error getting tasks: ", error_71.response.data);
                        return [2 /*return*/, error_71.response.data];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ShippersOperation.prototype.confirmCompletedTask = function (info) {
        return __awaiter(this, void 0, void 0, function () {
            var response, data, error_72;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.patch("".concat(this.baseUrl, "/confirm_completed"), info, {
                                withCredentials: true,
                            })];
                    case 1:
                        response = _a.sent();
                        data = response.data;
                        return [2 /*return*/, { error: data.error, message: data.message }];
                    case 2:
                        error_72 = _a.sent();
                        console.log("Error confirming completed task: ", error_72.response.data);
                        return [2 /*return*/, error_72.response.data];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ShippersOperation.prototype.getHistory = function (condition) {
        return __awaiter(this, void 0, void 0, function () {
            var response, data, error_73;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.post("".concat(this.baseUrl, "/get_history"), condition, {
                                withCredentials: true,
                            })];
                    case 1:
                        response = _a.sent();
                        data = response.data;
                        return [2 /*return*/, { error: data.error, data: data.data, message: data.message }];
                    case 2:
                        error_73 = _a.sent();
                        console.log("Error getting history: ", error_73.response.data);
                        return [2 /*return*/, error_73.response.data];
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
        this.baseUrl = "http://localhost:4000/api/v1/shipments";
    }
    ShipmentsOperation.prototype.check = function (condition) {
        return __awaiter(this, void 0, void 0, function () {
            var response, data, error_74;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.get("".concat(this.baseUrl, "/check?shipment_id=").concat(condition.shipment_id), {
                                withCredentials: true,
                            })];
                    case 1:
                        response = _a.sent();
                        data = response.data;
                        return [2 /*return*/, { error: data.error, existed: data.existed, message: data.message }];
                    case 2:
                        error_74 = _a.sent();
                        console.log("Error checking exist shipment: ", error_74.response.data);
                        return [2 /*return*/, error_74.response.data];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    // ROLE: ADMIN, MANAGER, TELLER, AGENCY_MANAGER, AGENCY_TELLER
    ShipmentsOperation.prototype.create = function (info) {
        return __awaiter(this, void 0, void 0, function () {
            var response, data, error_75;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.post("".concat(this.baseUrl, "/create"), info, {
                                withCredentials: true,
                            })];
                    case 1:
                        response = _a.sent();
                        data = response.data;
                        return [2 /*return*/, { error: data.error, message: data.message }];
                    case 2:
                        error_75 = _a.sent();
                        console.log("Error creating shipment: ", error_75.response.data);
                        return [2 /*return*/, error_75.response.data];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ShipmentsOperation.prototype.getOrdersFromShipment = function (condition) {
        return __awaiter(this, void 0, void 0, function () {
            var response, data, error_76;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.get("".concat(this.baseUrl, "/get_orders?shipment_id=").concat(condition.shipment_id), {
                                withCredentials: true,
                            })];
                    case 1:
                        response = _a.sent();
                        data = response.data;
                        return [2 /*return*/, { error: data.error, data: data.data, message: data.message }];
                    case 2:
                        error_76 = _a.sent();
                        console.log("Error getting orders from shipment: ", error_76.response.data);
                        return [2 /*return*/, error_76.response.data];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    // ROLE: ADMIN, MANAGER, TELLER, AGENCY_MANAGER, AGENCY_TELLER
    ShipmentsOperation.prototype.addOrdersToShipment = function (condition, info) {
        return __awaiter(this, void 0, void 0, function () {
            var response, data, error_77;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.post("".concat(this.baseUrl, "/add_orders?shipment_id=").concat(condition.shipment_id), info, {
                                withCredentials: true,
                            })];
                    case 1:
                        response = _a.sent();
                        data = response.data;
                        return [2 /*return*/, { error: data.error, message: data.message }];
                    case 2:
                        error_77 = _a.sent();
                        console.log("Error adding orders to shipment: ", error_77.response.data);
                        return [2 /*return*/, error_77.response.data];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    // ROLE: ADMIN, MANAGER, TELLER, AGENCY_MANAGER, AGENCY_TELLER
    ShipmentsOperation.prototype.deleteOrderFromShipment = function (condition, info) {
        return __awaiter(this, void 0, void 0, function () {
            var response, data, error_78;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.post("".concat(this.baseUrl, "/remove_orders?shipment_id=").concat(condition.shipment_id), info, {
                                withCredentials: true,
                            })];
                    case 1:
                        response = _a.sent();
                        data = response.data;
                        return [2 /*return*/, { error: data.error, message: data.message }];
                    case 2:
                        error_78 = _a.sent();
                        console.log("Error deleting order from shipment: ", error_78.response.data);
                        return [2 /*return*/, error_78.response.data];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    // ROLE: AGENCY_MANAGER, AGENCY_TELLER
    ShipmentsOperation.prototype.confirmCreate = function (condition) {
        return __awaiter(this, void 0, void 0, function () {
            var response, data, error_79;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.post("".concat(this.baseUrl, "/confirm_create"), condition, {
                                withCredentials: true,
                            })];
                    case 1:
                        response = _a.sent();
                        data = response.data;
                        return [2 /*return*/, { error: data.error, message: data.message }];
                    case 2:
                        error_79 = _a.sent();
                        console.log("Error confirming creat shipment: ", error_79.response.data);
                        return [2 /*return*/, error_79.response.data];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    // ROLE: ADMIN, MANAGER, TELLER, AGENCY_MANAGER, AGENCY_TELLER
    ShipmentsOperation.prototype.get = function (condition) {
        return __awaiter(this, void 0, void 0, function () {
            var response, data, error_80;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.post("".concat(this.baseUrl, "/get"), condition, {
                                withCredentials: true,
                            })];
                    case 1:
                        response = _a.sent();
                        data = response.data;
                        return [2 /*return*/, { error: data.error, data: data.data, message: data.message }];
                    case 2:
                        error_80 = _a.sent();
                        console.log("Error getting shipments: ", error_80.response.data);
                        return [2 /*return*/, error_80.response.data];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    // ROLE: ADMIN, MANAGER, TELLER, AGENCY_MANAGER, AGENCY_TELLER
    ShipmentsOperation.prototype.delete = function (condition) {
        return __awaiter(this, void 0, void 0, function () {
            var response, data, error_81;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.delete("".concat(this.baseUrl, "/delete?shipment_id=").concat(condition.shipment_id), {
                                withCredentials: true,
                            })];
                    case 1:
                        response = _a.sent();
                        data = response.data;
                        return [2 /*return*/, { error: data.error, message: data.message }];
                    case 2:
                        error_81 = _a.sent();
                        console.log("Error deleting shipment: ", error_81.response.data);
                        return [2 /*return*/, error_81.response.data];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    // ROLE: ADMIN, MANAGER, TELLER, AGENCY_MANAGER, AGENCY_TELLER
    ShipmentsOperation.prototype.decompose = function (condition, info) {
        return __awaiter(this, void 0, void 0, function () {
            var response, data, error_82;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.post("".concat(this.baseUrl, "/decompose?shipment_id=").concat(condition.shipment_id), info, {
                                withCredentials: true,
                            })];
                    case 1:
                        response = _a.sent();
                        data = response.data;
                        return [2 /*return*/, { error: data.error, message: data.message }];
                    case 2:
                        error_82 = _a.sent();
                        console.log("Error decomposing shipment: ", error_82.response.data);
                        return [2 /*return*/, error_82.response.data];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    // ROLE: AGENCY_MANAGER, AGENCY_TELLER
    ShipmentsOperation.prototype.receive = function (condition) {
        return __awaiter(this, void 0, void 0, function () {
            var response, data, error_83;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.post("".concat(this.baseUrl, "/receive"), condition, {
                                withCredentials: true,
                            })];
                    case 1:
                        response = _a.sent();
                        data = response.data;
                        return [2 /*return*/, { error: data.error, message: data.message }];
                    case 2:
                        error_83 = _a.sent();
                        console.log("Error receiving shipment: ", error_83.response.data);
                        return [2 /*return*/, error_83.response.data];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    // ROLE: SHIPPER, AGENCY_SHIPPER, PARTNER_SHIPPER
    ShipmentsOperation.prototype.undertake = function (info) {
        return __awaiter(this, void 0, void 0, function () {
            var response, data, error_84;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.post("".concat(this.baseUrl, "/undertake"), info, {
                                withCredentials: true,
                            })];
                    case 1:
                        response = _a.sent();
                        data = response.data;
                        return [2 /*return*/, { error: data.error, message: data.message }];
                    case 2:
                        error_84 = _a.sent();
                        console.log("Error undertaking shipment: ", error_84.response.data);
                        return [2 /*return*/, error_84.response.data];
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
        this.baseUrl = "http://localhost:4000/api/v1/orders";
    }
    OrdersOperation.prototype.get = function (conditions) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var response, data, error_85;
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
                        error_85 = _c.sent();
                        console.log("Error getting orders: ", (_a = error_85 === null || error_85 === void 0 ? void 0 : error_85.response) === null || _a === void 0 ? void 0 : _a.data);
                        console.error("Request that caused the error: ", error_85 === null || error_85 === void 0 ? void 0 : error_85.request);
                        return [2 /*return*/, { error: (_b = error_85 === null || error_85 === void 0 ? void 0 : error_85.response) === null || _b === void 0 ? void 0 : _b.data, request: error_85 === null || error_85 === void 0 ? void 0 : error_85.request, status: error_85.response ? error_85.response.status : null }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    OrdersOperation.prototype.calculatefee = function (info) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var response, data, error_86;
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
                        error_86 = _c.sent();
                        console.log("Error getting orders: ", (_a = error_86 === null || error_86 === void 0 ? void 0 : error_86.response) === null || _a === void 0 ? void 0 : _a.data);
                        console.error("Request that caused the error: ", error_86 === null || error_86 === void 0 ? void 0 : error_86.request);
                        return [2 /*return*/, { error: (_b = error_86 === null || error_86 === void 0 ? void 0 : error_86.response) === null || _b === void 0 ? void 0 : _b.data, request: error_86 === null || error_86 === void 0 ? void 0 : error_86.request, status: error_86.response ? error_86.response.status : null }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    OrdersOperation.prototype.checkExist = function (condition) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var response, data, error_87;
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
                        error_87 = _c.sent();
                        console.log("Error checking exist order: ", (_a = error_87 === null || error_87 === void 0 ? void 0 : error_87.response) === null || _a === void 0 ? void 0 : _a.data);
                        console.error("Request that caused the error: ", error_87 === null || error_87 === void 0 ? void 0 : error_87.request);
                        return [2 /*return*/, { error: (_b = error_87 === null || error_87 === void 0 ? void 0 : error_87.response) === null || _b === void 0 ? void 0 : _b.data, request: error_87 === null || error_87 === void 0 ? void 0 : error_87.request, status: error_87.response ? error_87.response.status : null }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    OrdersOperation.prototype.checkFileFormat = function (info) {
        return __awaiter(this, void 0, void 0, function () {
            var formData, response, data, error_88;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        formData = new FormData();
                        formData.append("file", info.file);
                        return [4 /*yield*/, axios_1.default.post("".concat(this.baseUrl, "/check_file_format"), formData, {
                                headers: {
                                    'Content-Type': 'multipart/form-data',
                                },
                                withCredentials: true,
                            })];
                    case 1:
                        response = _a.sent();
                        data = response.data;
                        return [2 /*return*/, { error: data.error, valid: data.valid, message: data.message }];
                    case 2:
                        error_88 = _a.sent();
                        console.error('Error checking file format:', error_88.response.data);
                        return [2 /*return*/, error_88.response.data];
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
        return __awaiter(this, void 0, void 0, function () {
            var formData, response, data, error_89;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        formData = new FormData();
                        formData.append("file", info.file);
                        return [4 /*yield*/, axios_1.default.post("".concat(this.baseUrl, "/create_by_file"), formData, {
                                headers: {
                                    'Content-Type': 'multipart/form-data',
                                },
                                withCredentials: true,
                            })];
                    case 1:
                        response = _a.sent();
                        data = response.data;
                        return [2 /*return*/, { error: data.error, message: data.message }];
                    case 2:
                        error_89 = _a.sent();
                        console.error('Error creating orders by file:', error_89.response.data);
                        return [2 /*return*/, error_89.response.data];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    OrdersOperation.prototype.update = function (info, condition) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var response, data, error_90;
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
                        error_90 = _c.sent();
                        console.log("Error updating order: ", (_a = error_90 === null || error_90 === void 0 ? void 0 : error_90.response) === null || _a === void 0 ? void 0 : _a.data);
                        console.error("Request that caused the error: ", error_90 === null || error_90 === void 0 ? void 0 : error_90.request);
                        return [2 /*return*/, { error: (_b = error_90 === null || error_90 === void 0 ? void 0 : error_90.response) === null || _b === void 0 ? void 0 : _b.data, request: error_90 === null || error_90 === void 0 ? void 0 : error_90.request, status: error_90.response ? error_90.response.status : null }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    OrdersOperation.prototype.cancel = function (condition) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var response, data, error_91;
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
                        error_91 = _c.sent();
                        console.log("Error canceling order: ", (_a = error_91 === null || error_91 === void 0 ? void 0 : error_91.response) === null || _a === void 0 ? void 0 : _a.data);
                        console.error("Request that caused the error: ", error_91 === null || error_91 === void 0 ? void 0 : error_91.request);
                        return [2 /*return*/, { error: (_b = error_91 === null || error_91 === void 0 ? void 0 : error_91.response) === null || _b === void 0 ? void 0 : _b.data, request: error_91 === null || error_91 === void 0 ? void 0 : error_91.request, status: error_91.response ? error_91.response.status : null }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    OrdersOperation.prototype.calculateFee = function (info) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var response, data, error_92;
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
                        error_92 = _c.sent();
                        console.log("Error calculating fee: ", (_a = error_92 === null || error_92 === void 0 ? void 0 : error_92.response) === null || _a === void 0 ? void 0 : _a.data);
                        console.error("Request that caused the error: ", error_92 === null || error_92 === void 0 ? void 0 : error_92.request);
                        return [2 /*return*/, { error: (_b = error_92 === null || error_92 === void 0 ? void 0 : error_92.response) === null || _b === void 0 ? void 0 : _b.data, request: error_92 === null || error_92 === void 0 ? void 0 : error_92.request, status: error_92.response ? error_92.response.status : null }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    OrdersOperation.prototype.updateImage = function (info, condition) {
        return __awaiter(this, void 0, void 0, function () {
            var formData, i, response, error_93;
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
                        error_93 = _a.sent();
                        console.error('Error uploading image:', error_93.response.data);
                        throw error_93; // Ném lỗi để xử lý bên ngoài
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    //get_images
    OrdersOperation.prototype.getImage = function (condition) {
        return __awaiter(this, void 0, void 0, function () {
            var response, zipFile_1, imageUrls_1, error_94;
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
                        error_94 = _a.sent();
                        console.error('Error getting image:', error_94.message);
                        throw error_94; // Ném lỗi để xử lý bên ngoài
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
        this.baseUrl = "http://localhost:4000/api/v1/schedules";
    }
    ScheduleOperation.prototype.get = function (conditions) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var response, data, error_95;
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
                        error_95 = _c.sent();
                        console.log("Error getting tasks: ", (_a = error_95 === null || error_95 === void 0 ? void 0 : error_95.response) === null || _a === void 0 ? void 0 : _a.data);
                        console.error("Request that caused the error: ", error_95 === null || error_95 === void 0 ? void 0 : error_95.request);
                        return [2 /*return*/, { error: (_b = error_95 === null || error_95 === void 0 ? void 0 : error_95.response) === null || _b === void 0 ? void 0 : _b.data, request: error_95 === null || error_95 === void 0 ? void 0 : error_95.request, status: error_95.response ? error_95.response.status : null }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ScheduleOperation.prototype.create = function (info) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var response, data, error_96;
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
                        error_96 = _c.sent();
                        console.log("Error creating new tasks: ", (_a = error_96 === null || error_96 === void 0 ? void 0 : error_96.response) === null || _a === void 0 ? void 0 : _a.data);
                        console.error("Request that caused the error: ", error_96 === null || error_96 === void 0 ? void 0 : error_96.request);
                        return [2 /*return*/, { error: (_b = error_96 === null || error_96 === void 0 ? void 0 : error_96.response) === null || _b === void 0 ? void 0 : _b.data, request: error_96 === null || error_96 === void 0 ? void 0 : error_96.request, status: error_96.response ? error_96.response.status : null }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ScheduleOperation.prototype.update = function (info, condition) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var response, data, error_97;
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
                        error_97 = _c.sent();
                        console.log("Error updating tasks: ", (_a = error_97 === null || error_97 === void 0 ? void 0 : error_97.response) === null || _a === void 0 ? void 0 : _a.data);
                        console.error("Request that caused the error: ", error_97 === null || error_97 === void 0 ? void 0 : error_97.request);
                        return [2 /*return*/, { error: (_b = error_97 === null || error_97 === void 0 ? void 0 : error_97.response) === null || _b === void 0 ? void 0 : _b.data, request: error_97 === null || error_97 === void 0 ? void 0 : error_97.request, status: error_97.response ? error_97.response.status : null }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ScheduleOperation.prototype.deleteTask = function (condition) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var response, data, error_98;
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
                        error_98 = _c.sent();
                        console.log("Error deleting tasks: ", (_a = error_98 === null || error_98 === void 0 ? void 0 : error_98.response) === null || _a === void 0 ? void 0 : _a.data);
                        console.error("Request that caused the error: ", error_98 === null || error_98 === void 0 ? void 0 : error_98.request);
                        return [2 /*return*/, { error: (_b = error_98 === null || error_98 === void 0 ? void 0 : error_98.response) === null || _b === void 0 ? void 0 : _b.data, request: error_98 === null || error_98 === void 0 ? void 0 : error_98.request, status: error_98.response ? error_98.response.status : null }];
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
        this.baseUrl = "http://localhost:4000/api/v1/administrative";
    }
    AdministrativeOperation.prototype.get = function (conditions) {
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
                        console.error("Error getting tasks: ", (_a = error_99 === null || error_99 === void 0 ? void 0 : error_99.response) === null || _a === void 0 ? void 0 : _a.data);
                        console.error("Request that caused the error: ", error_99 === null || error_99 === void 0 ? void 0 : error_99.request);
                        return [2 /*return*/, { error: (_b = error_99 === null || error_99 === void 0 ? void 0 : error_99.response) === null || _b === void 0 ? void 0 : _b.data, request: error_99 === null || error_99 === void 0 ? void 0 : error_99.request, status: error_99.response ? error_99.response.status : null }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return AdministrativeOperation;
}());
exports.AdministrativeOperation = AdministrativeOperation;
