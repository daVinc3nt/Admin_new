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

async function getData(): Promise<any> {
  // Fetch data from your API here.
  try {
    const response = await vehicle.findByAdmin(condition[0]);
    // console.log(response);
    return response.data;
  } catch (e) {
    alert("Error: " + e);
    return "Error";
  }
}

export default async function DemoPage(setSelectedID) {
  const data = await getData();
  console.log(data);
  const columns = await createColumns();
  if (!data.error) {
    return (
      <DataTable
        columns={columns}
        data={data}
        setSelectedID={setSelectedID}
      />
    );
  } else {
    return (
      <div className="flex place-content-center">
        "Error fetching data."
      </div>
    );
  }
}
