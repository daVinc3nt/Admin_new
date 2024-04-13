import { VehicleData, createColumns } from "./column";
import { DataTable } from "./datatable";
import https from "https";
import {
  FindingVehicleByAdminConditions,
  FindingVehicleByStaffCondition,
  VehicleOperation,
} from "@/TDLib/tdlogistics";

const vehicle = new VehicleOperation();
const condition: FindingVehicleByAdminConditions[] = [];
const condition2: FindingVehicleByStaffCondition[] = [];

async function getData(info: any): Promise<any> {
  // Fetch data from your API here.
  if (info?.role === "ADMIN") {
    try {
      const response = await vehicle.findByAdmin(condition[0]);
      // console.log(response);
      return response.data;
    } catch (e) {
      alert("Error: " + e);
      return "Error";
    }
  } else {
    try {
      const response = await vehicle.findByStaff(condition2[0]);

      // console.log(response);
      return response.data;
    } catch (e) {
      alert("Error: " + e);
      return "Error";
    }
  }
}

export default async function DemoPage(reloadData, info) {
  const data = await getData(info);
  // console.log(data);
  const columns = await createColumns(reloadData, info);
  if (info?.role === "ADMIN") {
    return (
      <DataTable
        columns={columns}
        data={data}
        reloadData={reloadData}
        info={info}
      />
    );
  } else {
    return (
      <div className="flex place-content-center">
        "You are not authorized to access this page."
      </div>
    );
  }
}
