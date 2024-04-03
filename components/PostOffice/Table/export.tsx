import { createColumns } from "./column";
import { DataTable } from "./datatable";
import https from "https";
import {
  AgencyOperation,
  FindingAgencyByAdminInfo,
  FindingAgencyByAgencyInfo,
} from "@/TDLib/tdlogistics";

const service = new AgencyOperation();
const conditions: FindingAgencyByAdminInfo[] = [];
const conditions2: FindingAgencyByAgencyInfo[] = [];

async function getData(info: any): Promise<any> {
  // Fetch data from your API here.
  if (
    info?.role === "ADMIN" ||
    info?.role === "MANAGER" ||
    info?.role === "HUMAN_RESOURCE_MANAGER"
  ) {
    try {
      const response = await service.findByAdmin(conditions[0]);
      console.log(response);
      return response.data;
    } catch (e) {
      alert("Error: " + e);

      return "Error";
    }
  } else {
    try {
      const response = await service.findByAgency(conditions2[0]);
      console.log(response);
      return response.data;
    } catch (e) {
      alert("Error: " + e);
      return "Error";
    }
  }
}

export default async function DemoPage(reloadData, info) {
  const data = await getData(info);
  console.log("Data", data);
  const columns = await createColumns(reloadData, info);
  if (
    (info?.role === "ADMIN" ||
      info?.role === "MANAGER" ||
      info?.role === "HUMAN_RESOURCE_MANAGER") &&
    data
  ) {
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
      <div className="flex place-content-center h-screen justify-center place-items-center">
        "You are not authorized to access this page. Please contact admin."
      </div>
    );
  }
}
