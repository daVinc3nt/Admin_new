import { StaffsOperation } from "@/TDLib/tdlogistics";
import Cookies from "js-cookie"
const action = new StaffsOperation()
export function Logout(){

    const confirmDelete = () => {
        return window.confirm("Bạn có muốn là thoát phiên đăng nhập không?");
    };

    // Gọi hàm confirmDelete và lưu kết quả vào biến result
    const result = confirmDelete();
    // Nếu result là true, tức là người dùng nhấn yes
    if (result) {
        Cookies.remove("connect.sid");
        action.logout()
    }
    // Nếu result là false, tức là người dùng nhấn no
    else {
        // Không làm gì cả
    };
}