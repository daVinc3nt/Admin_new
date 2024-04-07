import { StaffsOperation } from "@/TDLib/tdlogistics";
import Cookies from "js-cookie"
import { NextRouter, useRouter } from "next/router";
const action = new StaffsOperation()
export function Logout(router: NextRouter){
    const confirmDelete = () => {
        return window.confirm("Bạn có muốn là thoát phiên đăng nhập không?");
    };

    // Gọi hàm confirmDelete và lưu kết quả vào biến result
    const result = confirmDelete();
    // Nếu result là true, tức là người dùng nhấn yes
    if (result) {
        action.logout()
        router.push("/log")
    }
    // Nếu result là false, tức là người dùng nhấn no
    else {
        // Không làm gì cả
    };
}