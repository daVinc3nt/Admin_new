import { VehicleData, columns } from "./column";
import { DataTable } from "./datatable";
import https from "https";
import {
  FindingVehicleByAdminConditions,
  FindingVehicleByStaffCondition,
  VehicleOperation,
  StaffsOperation,
} from "@/TDLib/tdlogistics";
import { useContext } from "react";
import { UserContext } from "@/Context/InfoContext/UserContext";

const vehicle = new VehicleOperation();
const condition: FindingVehicleByAdminConditions[] = [];
const condition2: FindingVehicleByStaffCondition[] = [];

async function getRole(): Promise<any> {
  const staff = new StaffsOperation();
  const res = await staff.getAuthenticatedStaffInfo();
  const role = res.data.role;
  return role;
}
async function getData(): Promise<any> {
  // Fetch data from your API here.
  const role = await getRole();
  if (role === "ADMIN") {
    const response = await vehicle.findByAdmin(condition[0]);
    console.log(response);
    return response.data;
  } else {
    const response = await vehicle.findByStaff(condition2[0]);

    console.log(response);
    return response.data;
  }
}

export default async function DemoPage(reloadData) {
  const data = await getData();
  const role = await getRole();
  console.log(data);
  if (role === "ADMIN") {
    return <DataTable columns={columns} data={data} reloadData={reloadData} />;
  } else {
    return (
      <div className="flex place-content-center">
        "You are not authorized to access this page."
      </div>
    );
  }
}
