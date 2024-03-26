"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tdlogistics_1 = require("./tdlogistics");
var phoneNumber = "0981430418";
var email = "minh.luxuanhcmut.edu.vn";
var otp = "8647";
var staffsAuthenticate = new tdlogistics_1.PartnerStaffAuthenticate();
var username = "minhluxuan";
var password = "MinhLuXuan@TDlogistics2k24";
staffsAuthenticate.login(username, password)
    .then(function (result) { return console.log(result); })
    .catch(function (error) { return console.log(error); });
