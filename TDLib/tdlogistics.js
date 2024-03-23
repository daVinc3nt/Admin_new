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
        return __awaiter(this, void 0, void 0, function () {
            var response, data, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.post("".concat(this.baseUrl, "/send_otp"), {
                                phone_number: phoneNumber,
                                email: email,
                            }, {
                                withCredentials: true,
                            })];
                    case 1:
                        response = _a.sent();
                        data = response.data;
                        return [2 /*return*/, { error: data.error, message: data.message }];
                    case 2:
                        error_1 = _a.sent();
                        console.log("Error sending OTP: ", error_1.response.data);
                        return [2 /*return*/, error_1.response.data];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    UsersAuthenticate.prototype.verifyOTP = function (phoneNumber, otp) {
        return __awaiter(this, void 0, void 0, function () {
            var response, data, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.post("".concat(this.baseUrl, "/verify_otp"), {
                                phone_number: phoneNumber,
                                otp: otp,
                            }, {
                                withCredentials: true,
                            })];
                    case 1:
                        response = _a.sent();
                        data = response.data;
                        return [2 /*return*/, { error: data.error, valid: data.valid, message: data.message }];
                    case 2:
                        error_2 = _a.sent();
                        console.log("Error verifying OTP:", error_2.response.data);
                        return [2 /*return*/, error_2.response.data];
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
        return __awaiter(this, void 0, void 0, function () {
            var response, data, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.post("".concat(this.baseUrl, "/login"), {
                                username: username,
                                password: password,
                            }, {
                                withCredentials: true,
                            })];
                    case 1:
                        response = _a.sent();
                        data = response.data;
                        return [2 /*return*/, { error: data.error, valid: data.valid, message: data.message }];
                    case 2:
                        error_3 = _a.sent();
                        console.log("Error logging in: ", error_3.response.data);
                        return [2 /*return*/, error_3.response.data];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    StaffsAuthenticate.prototype.sendOTP = function (phone_number, email) {
        return __awaiter(this, void 0, void 0, function () {
            var response, data, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.post("".concat(this.baseUrl, "/send_otp"), {
                                phone_number: phone_number,
                                email: email,
                            }, {
                                withCredentials: true,
                            })];
                    case 1:
                        response = _a.sent();
                        data = response.data;
                        return [2 /*return*/, { error: data.error, message: data.message }];
                    case 2:
                        error_4 = _a.sent();
                        console.log("Error sending OTP: ", error_4.response.data);
                        return [2 /*return*/, error_4.response.data];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    StaffsAuthenticate.prototype.verifyOTP = function (phone_number, email, otp) {
        return __awaiter(this, void 0, void 0, function () {
            var response, data, error_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.post("".concat(this.baseUrl, "/verify_otp"), {
                                phone_number: phone_number,
                                email: email,
                                otp: otp,
                            }, {
                                withCredentials: true,
                            })];
                    case 1:
                        response = _a.sent();
                        data = response.data;
                        return [2 /*return*/, { error: data.error, message: data.message }];
                    case 2:
                        error_5 = _a.sent();
                        console.log("Error verify OTP", error_5.response.data);
                        return [2 /*return*/, error_5.response.data];
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
        return __awaiter(this, void 0, void 0, function () {
            var response, data, error_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.post("".concat(this.baseUrl, "/login"), {
                                username: username,
                                password: password,
                            }, {
                                withCredentials: true,
                            })];
                    case 1:
                        response = _a.sent();
                        data = response.data;
                        return [2 /*return*/, { error: data.error, valid: data.valid, message: data.message }];
                    case 2:
                        error_6 = _a.sent();
                        console.log("Error logging in: ", error_6.response.data);
                        return [2 /*return*/, error_6.response.data];
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
        return __awaiter(this, void 0, void 0, function () {
            var response, data, error_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.post("".concat(this.baseUrl, "/login"), {
                                username: username,
                                password: password,
                            }, {
                                withCredentials: true,
                            })];
                    case 1:
                        response = _a.sent();
                        data = response.data;
                        return [2 /*return*/, { error: data.error, valid: data.valid, message: data.message }];
                    case 2:
                        error_7 = _a.sent();
                        console.log("Error logging in: ", error_7.response.data);
                        return [2 /*return*/, error_7.response.data];
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
        return __awaiter(this, void 0, void 0, function () {
            var response, data, error_8;
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
                        error_8 = _a.sent();
                        console.log("Error get one user: ", error_8.response.data);
                        return [2 /*return*/, error_8.response.data];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    UsersOperation.prototype.findByAdmin = function (conditions) {
        return __awaiter(this, void 0, void 0, function () {
            var response, data, error_9;
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
                        error_9 = _a.sent();
                        console.log("Error get one user: ", error_9.response.data);
                        return [2 /*return*/, error_9.response.data];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    UsersOperation.prototype.create = function (info) {
        return __awaiter(this, void 0, void 0, function () {
            var response, data, error_10;
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
                        return [2 /*return*/, { error: data.error, data: data.data, message: data.message }];
                    case 2:
                        error_10 = _a.sent();
                        console.log("Error create new user: ", error_10.response.data);
                        return [2 /*return*/, error_10.response.data];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    UsersOperation.prototype.update = function (info, condition) {
        return __awaiter(this, void 0, void 0, function () {
            var response, data, error_11;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.put("".concat(this.baseUrl, "/update?user_id=").concat(condition.user_id), info, {
                                withCredentials: true,
                            })];
                    case 1:
                        response = _a.sent();
                        data = response.data;
                        return [2 /*return*/, { error: data.error, data: data.data, message: data.message }];
                    case 2:
                        error_11 = _a.sent();
                        console.log("Error update new user: ", error_11.response.data);
                        return [2 /*return*/, error_11.response.data];
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
        return __awaiter(this, void 0, void 0, function () {
            var response, data, error_12;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.post("".concat(this.baseUrl, "/check?agency_id=").concat(condition.agency_id), {
                                withCredentials: true,
                            })];
                    case 1:
                        response = _a.sent();
                        data = response.data;
                        return [2 /*return*/, { error: data.error, message: data.message }];
                    case 2:
                        error_12 = _a.sent();
                        console.log("Error checking exist agency: ", error_12.response.data);
                        return [2 /*return*/, error_12.response.data];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    AgencyOperation.prototype.create = function (info) {
        return __awaiter(this, void 0, void 0, function () {
            var response, data, error_13;
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
                        error_13 = _a.sent();
                        console.log("Error creating agency: ", error_13.response.data);
                        return [2 /*return*/, error_13.response.data];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    AgencyOperation.prototype.findByAgency = function (conditions) {
        return __awaiter(this, void 0, void 0, function () {
            var response, data, error_14;
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
                        error_14 = _a.sent();
                        console.log("Error finding agency: ", error_14.response.data);
                        return [2 /*return*/, error_14.response.data];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    AgencyOperation.prototype.findByAdmin = function (conditions) {
        return __awaiter(this, void 0, void 0, function () {
            var response, data, error_15;
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
                        error_15 = _a.sent();
                        console.log("Error finding agency: ", error_15.response.data);
                        return [2 /*return*/, error_15.response.data];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    AgencyOperation.prototype.update = function (info, condition) {
        return __awaiter(this, void 0, void 0, function () {
            var response, data, error_16;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.put("".concat(this.baseUrl, "/update?agency_id=").concat(condition.agency_id), info, {
                                withCredentials: true,
                            })];
                    case 1:
                        response = _a.sent();
                        data = response.data;
                        return [2 /*return*/, { error: data.error, data: data.data, message: data.message }];
                    case 2:
                        error_16 = _a.sent();
                        console.log("Error finding agency: ", error_16.response.data);
                        return [2 /*return*/, error_16.response.data];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    AgencyOperation.prototype.delete = function (condition) {
        return __awaiter(this, void 0, void 0, function () {
            var response, data, error_17;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.delete("".concat(this.baseUrl, "/delete?agency_id=").concat(condition.agency_id), {
                                withCredentials: true,
                            })];
                    case 1:
                        response = _a.sent();
                        data = response.data;
                        return [2 /*return*/, { error: data.error, data: data.data, message: data.message }];
                    case 2:
                        error_17 = _a.sent();
                        console.log("Error finding agency: ", error_17.response.data);
                        return [2 /*return*/, error_17.response.data];
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
        this.baseUrl = "http://localhost:5000/api/v1/transport_partners";
    }
    TransportPartnersOperation.prototype.createByAdmin = function (info) {
        return __awaiter(this, void 0, void 0, function () {
            var response, data, error_18;
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
                        error_18 = _a.sent();
                        console.log("Error creating new transport partner: ", error_18.response.data);
                        return [2 /*return*/, error_18.response.data];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    TransportPartnersOperation.prototype.createByAgency = function (info) {
        return __awaiter(this, void 0, void 0, function () {
            var response, data, error_19;
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
                        error_19 = _a.sent();
                        console.log("Error creating new transport partner: ", error_19.response.data);
                        return [2 /*return*/, error_19.response.data];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    TransportPartnersOperation.prototype.findByTransportPartner = function (condition) {
        return __awaiter(this, void 0, void 0, function () {
            var response, data, error_20;
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
                        error_20 = _a.sent();
                        console.log("Error finding transport partner: ", error_20.response.data);
                        return [2 /*return*/, error_20.response.data];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    TransportPartnersOperation.prototype.findByAdmin = function (conditions) {
        return __awaiter(this, void 0, void 0, function () {
            var response, data, error_21;
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
                        error_21 = _a.sent();
                        console.log("Error finding transport partner: ", error_21.response.data);
                        return [2 /*return*/, error_21.response.data];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    TransportPartnersOperation.prototype.update = function (info, condition) {
        return __awaiter(this, void 0, void 0, function () {
            var response, data, error_22;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.put("".concat(this.baseUrl, "/update?transport_partner_id=").concat(condition.transport_partner_id), info, {
                                withCredentials: true,
                            })];
                    case 1:
                        response = _a.sent();
                        data = response.data;
                        return [2 /*return*/, { error: data.error, message: data.message }];
                    case 2:
                        error_22 = _a.sent();
                        console.log("Error updating transport partner: ", error_22.response.data);
                        return [2 /*return*/, error_22.response.data];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    TransportPartnersOperation.prototype.remove = function (condition) {
        return __awaiter(this, void 0, void 0, function () {
            var response, data, error_23;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.delete("".concat(this.baseUrl, "/delete?transport_partner_id=").concat(condition.transport_partner_id), {
                                withCredentials: true,
                            })];
                    case 1:
                        response = _a.sent();
                        data = response.data;
                        return [2 /*return*/, { error: data.error, message: data.message }];
                    case 2:
                        error_23 = _a.sent();
                        console.log("Error deleting transport partner: ", error_23.response.data);
                        return [2 /*return*/, error_23.response.data];
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
        return __awaiter(this, void 0, void 0, function () {
            var response, data, error_24;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.post("".concat(this.baseUrl, "/check?vehicle_id=").concat(condition.vehicle_id), {
                                withCredentials: true,
                            })];
                    case 1:
                        response = _a.sent();
                        data = response.data;
                        return [2 /*return*/, { error: data.error, existed: data.existed, message: data.message }];
                    case 2:
                        error_24 = _a.sent();
                        console.log("Error checking exist vehicle: ", error_24.response.data);
                        return [2 /*return*/, error_24.response.data];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    VehicleOperation.prototype.createByAgency = function (info) {
        return __awaiter(this, void 0, void 0, function () {
            var response, data, error_25;
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
                        error_25 = _a.sent();
                        console.log("Error creating new vehicle: ", error_25.response.data);
                        return [2 /*return*/, error_25.response.data];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    VehicleOperation.prototype.createByAdmin = function (info) {
        return __awaiter(this, void 0, void 0, function () {
            var response, data, error_26;
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
                        error_26 = _a.sent();
                        console.log("Error creating new vehicle: ", error_26.response.data);
                        return [2 /*return*/, error_26.response.data];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    VehicleOperation.prototype.findByStaff = function (condition) {
        return __awaiter(this, void 0, void 0, function () {
            var response, data, error_27;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.post("".concat(this.baseUrl, "/search?staff_id=").concat(condition.staff_id), {
                                withCredentials: true,
                            })];
                    case 1:
                        response = _a.sent();
                        data = response.data;
                        return [2 /*return*/, { error: data.error, data: data.data, message: data.message }];
                    case 2:
                        error_27 = _a.sent();
                        console.log("Error finding vehicle: ", error_27.response.data);
                        return [2 /*return*/, error_27.response.data];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    VehicleOperation.prototype.findByAdmin = function (conditions) {
        return __awaiter(this, void 0, void 0, function () {
            var response, data, error_28;
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
                        error_28 = _a.sent();
                        console.log("Error finding vehicle: ", error_28.response.data);
                        return [2 /*return*/, error_28.response.data];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    VehicleOperation.prototype.getShipment = function (condition) {
        return __awaiter(this, void 0, void 0, function () {
            var response, data, error_29;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.get("".concat(this.baseUrl, "/get_shipments?vehicle_id=").concat(condition.vehicle_id), {
                                withCredentials: true,
                            })];
                    case 1:
                        response = _a.sent();
                        data = response.data;
                        return [2 /*return*/, { error: data.error, data: data.data, message: data.message }];
                    case 2:
                        error_29 = _a.sent();
                        console.log("Error getting shipments contained by vehicle: ", error_29.response.data);
                        return [2 /*return*/, error_29.response.data];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    VehicleOperation.prototype.update = function (info, condition) {
        return __awaiter(this, void 0, void 0, function () {
            var response, data, error_30;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.put("".concat(this.baseUrl, "/update?vehicle_id=").concat(condition.vehicle_id), info, {
                                withCredentials: true,
                            })];
                    case 1:
                        response = _a.sent();
                        data = response.data;
                        return [2 /*return*/, { error: data.error, message: data.message }];
                    case 2:
                        error_30 = _a.sent();
                        console.log("Error updating vehicle: ", error_30.response.data);
                        return [2 /*return*/, error_30.response.data];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    VehicleOperation.prototype.addShipments = function (info, condition) {
        return __awaiter(this, void 0, void 0, function () {
            var response, data, error_31;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.patch("".concat(this.baseUrl, "/add_shipments?vehicle_id=").concat(condition.vehicle_id), info, {
                                withCredentials: true,
                            })];
                    case 1:
                        response = _a.sent();
                        data = response.data;
                        return [2 /*return*/, { error: data.error, info: data.info, message: data.message }];
                    case 2:
                        error_31 = _a.sent();
                        console.log("Error adding shipments to vehicle: ", error_31.response.data);
                        return [2 /*return*/, error_31.response.data];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    VehicleOperation.prototype.deleteShipments = function (info, condition) {
        return __awaiter(this, void 0, void 0, function () {
            var response, data, error_32;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.patch("".concat(this.baseUrl, "/delete_shipments?vehicle_id=").concat(condition.vehicle_id), info, {
                                withCredentials: true,
                            })];
                    case 1:
                        response = _a.sent();
                        data = response.data;
                        return [2 /*return*/, { error: data.error, info: data.info, message: data.message }];
                    case 2:
                        error_32 = _a.sent();
                        console.log("Error deleting shipments from vehicle: ", error_32.response.data);
                        return [2 /*return*/, error_32.response.data];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    VehicleOperation.prototype.deleteVehicle = function (condition) {
        return __awaiter(this, void 0, void 0, function () {
            var response, data, error_33;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.delete("".concat(this.baseUrl, "/delete?vehicle_id=").concat(condition.vehicle_id), {
                                withCredentials: true,
                            })];
                    case 1:
                        response = _a.sent();
                        data = response.data;
                        return [2 /*return*/, { error: data.error, message: data.message }];
                    case 2:
                        error_33 = _a.sent();
                        console.log("Error deleting vehicle: ", error_33.response.data);
                        return [2 /*return*/, error_33.response.data];
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
        return __awaiter(this, void 0, void 0, function () {
            var response, data, error_34;
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
                        return [2 /*return*/, { error: data.error, data: data.info, message: data.message }];
                    case 2:
                        error_34 = _a.sent();
                        console.log("Error get authenticated staff information: ", error_34.response.data);
                        return [2 /*return*/, error_34.response.data];
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
        return __awaiter(this, void 0, void 0, function () {
            var response, data, error_42;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.get("".concat(this.baseUrl, "/logout"), {
                                withCredentials: true,
                            })];
                    case 1:
                        response = _a.sent();
                        data = response.data;
                        return [2 /*return*/, { error: data.error, message: data.message }];
                    case 2:
                        error_42 = _a.sent();
                        console.log("Error logging out: ", error_42.response.data);
                        return [2 /*return*/, error_42.response.data];
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
        this.baseUrl = "http://localhost:5000/api/v1/business";
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
                        return [4 /*yield*/, axios_1.default.post("".concat(this.baseUrl, "/update?business_id=").concat(condition.business_id), info, {
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
        this.baseUrl = "http://localhost:5000/api/v1/partner_staffs";
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
        this.baseUrl = "http://localhost:5000/api/v1/shippers";
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
        this.baseUrl = "http://localhost:5000/api/v1/shipments";
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
        this.baseUrl = "http://localhost:5000/api/v1/orders";
    }
    OrdersOperation.prototype.get = function (conditions) {
        return __awaiter(this, void 0, void 0, function () {
            var response, data, error_85;
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
                        error_85 = _a.sent();
                        console.log("Error getting orders: ", error_85.response.data);
                        return [2 /*return*/, error_85.response.data];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    OrdersOperation.prototype.calculatefee = function (info) {
        return __awaiter(this, void 0, void 0, function () {
            var response, data, error_86;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.post("".concat(this.baseUrl, "/calculatefee"), info, {
                                withCredentials: true,
                            })];
                    case 1:
                        response = _a.sent();
                        data = response.data;
                        return [2 /*return*/, { error: data.error, data: data.data, message: data.message }];
                    case 2:
                        error_86 = _a.sent();
                        console.log("Error getting orders: ", error_86.response.data);
                        return [2 /*return*/, error_86.response.data];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    OrdersOperation.prototype.checkExist = function (condition) {
        return __awaiter(this, void 0, void 0, function () {
            var response, data, error_87;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.get("".concat(this.baseUrl, "/check?order_id=").concat(condition.order_id), {
                                withCredentials: true,
                            })];
                    case 1:
                        response = _a.sent();
                        data = response.data;
                        return [2 /*return*/, { error: data.error, exist: data.existed, message: data.message }];
                    case 2:
                        error_87 = _a.sent();
                        console.log("Error checking exist order: ", error_87.response.data);
                        return [2 /*return*/, error_87.response.data];
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
        return __awaiter(this, void 0, void 0, function () {
            var response, data, error_90;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.put("".concat(this.baseUrl, "/update?order_id=").concat(condition.order_id), info, {
                                withCredentials: true,
                            })];
                    case 1:
                        response = _a.sent();
                        data = response.data;
                        return [2 /*return*/, { error: data.error, message: data.message }];
                    case 2:
                        error_90 = _a.sent();
                        console.log("Error updating order: ", error_90.response.data);
                        return [2 /*return*/, error_90.response.data];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    OrdersOperation.prototype.cancel = function (condition) {
        return __awaiter(this, void 0, void 0, function () {
            var response, data, error_91;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.delete("".concat(this.baseUrl, "/cancel?order_id=").concat(condition.order_id), {
                                withCredentials: true,
                            })];
                    case 1:
                        response = _a.sent();
                        data = response.data;
                        return [2 /*return*/, { error: data.error, message: data.message }];
                    case 2:
                        error_91 = _a.sent();
                        console.log("Error canceling order: ", error_91.response.data);
                        return [2 /*return*/, error_91.response.data];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    OrdersOperation.prototype.calculateFee = function (info) {
        return __awaiter(this, void 0, void 0, function () {
            var response, data, error_92;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.post("".concat(this.baseUrl, "/calculate_fee"), info, {
                                withCredentials: true,
                            })];
                    case 1:
                        response = _a.sent();
                        data = response.data;
                        return [2 /*return*/, { error: data.error, data: data.data, message: data.message }];
                    case 2:
                        error_92 = _a.sent();
                        console.log("Error calculating fee: ", error_92.response.data);
                        return [2 /*return*/, error_92.response.data];
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
        this.baseUrl = "http://localhost:5000/api/v1/schedules";
    }
    ScheduleOperation.prototype.get = function (conditions) {
        return __awaiter(this, void 0, void 0, function () {
            var response, data, error_95;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.post("".concat(this.baseUrl, "/search"), conditions, {
                                withCredentials: true
                            })];
                    case 1:
                        response = _a.sent();
                        data = response.data;
                        return [2 /*return*/, { error: data, data: data.data, message: data.message }];
                    case 2:
                        error_95 = _a.sent();
                        console.log("Error getting tasks: ", error_95.response.data);
                        return [2 /*return*/, error_95.response.data];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ScheduleOperation.prototype.create = function (info) {
        return __awaiter(this, void 0, void 0, function () {
            var response, data, error_96;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.post("".concat(this.baseUrl, "/create"), info, {
                                withCredentials: true
                            })];
                    case 1:
                        response = _a.sent();
                        data = response.data;
                        return [2 /*return*/, { error: data, message: data.message }];
                    case 2:
                        error_96 = _a.sent();
                        console.log("Error creating new tasks: ", error_96.response.data);
                        return [2 /*return*/, error_96.response.data];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ScheduleOperation.prototype.update = function (info, condition) {
        return __awaiter(this, void 0, void 0, function () {
            var response, data, error_97;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.put("".concat(this.baseUrl, "/update?id=").concat(condition.id), info, {
                                withCredentials: true
                            })];
                    case 1:
                        response = _a.sent();
                        data = response.data;
                        return [2 /*return*/, { error: data, message: data.message }];
                    case 2:
                        error_97 = _a.sent();
                        console.log("Error updating tasks: ", error_97.response.data);
                        return [2 /*return*/, error_97.response.data];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ScheduleOperation.prototype.deleteTask = function (condition) {
        return __awaiter(this, void 0, void 0, function () {
            var response, data, error_98;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.delete("".concat(this.baseUrl, "/delete?id=").concat(condition.id), {
                                withCredentials: true
                            })];
                    case 1:
                        response = _a.sent();
                        data = response.data;
                        return [2 /*return*/, { error: data, message: data.message }];
                    case 2:
                        error_98 = _a.sent();
                        console.log("Error deleting tasks: ", error_98.response.data);
                        return [2 /*return*/, error_98.response.data];
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
        return __awaiter(this, void 0, void 0, function () {
            var response, data, error_99;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.post("".concat(this.baseUrl, "/search"), conditions, {
                                withCredentials: true
                            })];
                    case 1:
                        response = _a.sent();
                        data = response.data;
                        return [2 /*return*/, { error: data, data: data.data, message: data.message }];
                    case 2:
                        error_99 = _a.sent();
                        console.log("Error getting tasks: ", error_99.response.data);
                        return [2 /*return*/, error_99.response.data];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return AdministrativeOperation;
}());
exports.AdministrativeOperation = AdministrativeOperation;
