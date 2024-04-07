import React from "react";
import { FormattedMessage } from "react-intl";
import { useState, useCallback } from "react";
import { set } from "date-fns";
import { OrdersOperation } from "@/TDLib/tdlogistics";
import { on } from "events";
function DiffCheck({ consignment1, consignment2, Setmessage, onCompare }) {
  const getDifferentOrders = () => {
    const differentOrders = [];
    consignment1.order_ids.forEach((order_id) => {
      if (!consignment2.order_ids.includes(order_id)) {
        differentOrders.push(order_id);
      }
    });
    consignment2.order_ids.forEach((order_id) => {
      if (!consignment1.order_ids.includes(order_id)) {
        differentOrders.push(order_id);
      }
    });

    return differentOrders;
  };

  const differentOrders = getDifferentOrders();
  const [checkorder, setcheckorder] = useState([]);
  const [searchorder, setsearchorder] = useState("");
  const handleSearch = (e) => {
    if (e === "") {
      return;
    }
    if (checkorder.includes(e)) {
      alert("Order already exists");
      setsearchorder("");
      return;
    }
    checkorder.push(e);
    setsearchorder("");
  };
  const handlecompare = useCallback(() => {
    if (checkorder.length === 0) {
      alert("Please add order to compare");
      return;
    }
    let extra = [];
    let missing = [];
    checkorder.forEach((order) => {
      if (!consignment1.order_ids.includes(order)) {
        extra.push(order);
      }
    });
    consignment1.order_ids.forEach((order) => {
      if (!checkorder.includes(order)) {
        missing.push(order);
      }
    });
    if (missing.length > 0) {
      alert("Các đơn hàng bị thiếu \n" + missing.join("\n"));
      Setmessage("Các đơn hàng bị thiếu \n" + missing.join("\n"));
      onCompare("Các đơn hàng bị thiếu \n" + missing.join("\n"));
      return;
    }
    if (extra.length > 0) {
      alert("Các đơn hàng bị dư " + extra.join(","));
      Setmessage("Các đơn hàng bị dư " + extra.join(","));
      onCompare("Các đơn hàng bị dư " + extra.join(","));
      return;
    }
  }, [checkorder, consignment1.order_ids, onCompare]);
  return (
    <div className="flex flex-col md:flex-row justify-between w-full gap-2 h-full">
      <div className="w-full md:w-1/2 h-full flex flex-col gap-2">
        <div className="w-full text-center flex flex-col">
          <FormattedMessage id="Consignment.Decompose.Title3" />:{" "}
          <span className="mt-3">{consignment1.shipment_id}</span>
        </div>
        <div className="border border-[#545e7b] p-2 mt-2 mb-4 w-full rounded-xl grow overflow-y-scroll no-scrollbar flex gap-2 flex-col">
          {consignment1.order_ids.map((order_id, index) => (
            <div
              className="flex flex-row border-black border rounded-md "
              key={index}
            >
              <div
                className={` w-full rounded-lg p-2  h-10 flex flex-col items-center justify-center ${
                  differentOrders.includes(order_id) ? "text-red-500" : ""
                }`}
              >
                {order_id}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="w-full md:w-1/2 h-full flex flex-col ">
        <div className="w-full text-center flex flex-col">
          <FormattedMessage id="Consignment.Decompose.Title2" />:{" "}
          <div className="flex flex-row rounded-md mx-3 gap-1">
            <input
              className="h-10 rounded-lg mt-2 mb-1 p-3 w-full border-black border text-black bg-transparent drop-shadow-md hover:drop-shadow-xl  hover:shadow-md "
              placeholder="Enter Shipment ID"
              value={searchorder}
              onChange={(e) => {
                setsearchorder(e.target.value.trim());
              }}
            />
            <button
              className="bg-green-500  ease-in-out hover:scale-110 border-black hover:translate-x-0 delay-75 border hover:bg-green-400  text-white rounded-md p-1 w-14 h-10 mt-2"
              onClick={() => handleSearch(searchorder)}
            >
              +
            </button>
            <button
              className="bg-yellow-500 text-xs ease-in-out hover:scale-110 border-black hover:translate-x-0 delay-75 border hover:bg-yellow-400  text-white rounded-md p-1 w-14 h-10 mt-2"
              onClick={handlecompare}
            >
              So sánh
            </button>
          </div>
        </div>

        <div className="border border-[#545e7b] p-2 mb-4 w-full rounded-xl grow overflow-y-scroll no-scrollbar flex gap-2 flex-col">
          {checkorder.map((order_id, index) => (
            <div
              className="flex flex-row border-black border rounded-md"
              key={index}
            >
              <div
                className={` w-full rounded-lg p-2  h-10 flex flex-col items-center justify-center ${
                  differentOrders.includes(order_id) ? "text-red-500" : ""
                }`}
              >
                {order_id}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default DiffCheck;
