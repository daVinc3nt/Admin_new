import { UsersAuthenticate , StaffsAuthenticate, UsersOperation, BusinessAuthenticate, PartnerStaffAuthenticate } from "./tdlogistics";

const phoneNumber = "0981430418";
const email = "minh.luxuanhcmut.edu.vn";
const otp = "8647";


const staffsAuthenticate = new PartnerStaffAuthenticate();
const username = "minhluxuan";
const password = "MinhLuXuan@TDlogistics2k24";


staffsAuthenticate.login(username, password)
.then(result => console.log(result))
.catch(error => console.log(error));
