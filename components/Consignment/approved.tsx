import React from "react";
import { Button } from "@nextui-org/react";
import axios from "axios";
import { ShipmentsOperation, ShipmentID } from "@/TDLib/tdlogistics";

export function approve(
  row: any,
  info: any,
  reloadData: () => void
): JSX.Element {
  if (
    info?.role === "ADMIN" ||
    info?.role === "MANAGER" ||
    info?.role === "TELLER"
  ) {
    const a = new ShipmentsOperation();
    // axios.get("http://localhost:5000/get_session").then((res) => {
    //   console.log("res", res.data);
    // });

    const handleConfirm = async () => {
      const ID: ShipmentID = {
        shipment_id: row.original.shipment_id,
      };
      console.log("ID", ID);
      try {
        const response = await a.approve(ID);
        console.log("response", response);
        if (response.error) {
          alert(response.message);
          return;
        }
        alert(response.message);
        reloadData();
      } catch (e) {
        console.log(e);
      }
    };

    return (
      <div className="relative mr-2 w-full flex justify-center">
        <Button
          onClick={handleConfirm}
          className="bg-transparent hover:bg-white font-bold hover:text-black py-1 px-[8px] border border-gray-600 hover:border-transparent rounded-full "
        >
          ✔
        </Button>
      </div>
    );
  }
}
