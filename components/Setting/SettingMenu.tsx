import React from "react";
import { useState, useEffect } from "react";
import LoadingSkeleton from "../LoadingSkeleton/loadingSkeleton";
import { FormattedMessage } from "react-intl";
const SettingMenu = () => {
  const [number, setNumber] = useState(0);

  const confirmDelete = () => {
    return window.confirm("Bạn có chắc chắn muốn thay đổi không?");
  };
  const handlesubmit = () => {
    // Gọi hàm confirmDelete và lưu kết quả vào biến result
    const result = confirmDelete();
    // Nếu result là true, tức là người dùng nhấn yes
    if (result) {
      const settingNumberInput = document.getElementById(
        "settingNumber"
      ) as HTMLInputElement;
      const settingNumberValue = parseInt(settingNumberInput.value, 10);
      if (settingNumberValue <= 0 || isNaN(settingNumberValue)) {
        alert("Giá trị không hợp lệ!");
        return;
      } else if (settingNumberValue > 24) {
        alert("Nên chọn giá trị nhỏ hơn 24!");
        return;
      }
      setNumber(settingNumberValue);
    }
    // Nếu result là false, tức là người dùng nhấn no
    else {
      // Không làm gì cả
    }
  };

  return (
    <div className="h-[calc(100vh-3rem)] content-center overflow-y-hidden flex flex-col w-full">
      <div className="h-full items-center w-full left-0 right-0 overflow-y-scroll no-scrollbar">
        <section className="p-2 flex justify-center">
          <div className="container shadow-sm rounded-xl px-3 text-white bg-[#1a1b23]">
            <div className="relative text-3xl font-bold border-b-[1px] border-gray-600">
              <div className=" font-bold text-xl sm:text-3xl pt-3 pb-2 text-center">
                Cài đặt
              </div>
            </div>
            <div className="w-full h-screen">
              <div>
                <div>
                  Cài đặt backup ( thời gian backup hiện tại : {number} giờ )
                </div>
                <div className="relative flex w-full max-w-[24rem] mt-5">
                  <div className="relative h-10 w-full min-w-[200px]">
                    <input
                      type="number"
                      name="number"
                      id="settingNumber"
                      className="peer h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 pr-20 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-blue-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                    />
                    <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-blue-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-blue-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-blue-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-500">
                      Nhập thông số (đơn vị giờ)
                    </label>
                  </div>

                  <button
                    type="submit"
                    className="!absolute right-1 top-1 select-none rounded bg-blue-500 py-2 px-4 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-blue-gray-500/20 transition-all hover:shadow-lg hover:shadow-blue-gray-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                    onClick={handlesubmit}
                  >
                    OK
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default SettingMenu;
