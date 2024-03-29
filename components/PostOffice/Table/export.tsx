import { columns } from "./column";
import { DataTable } from "./datatable";
import https from "https";
import {
  AgencyOperation,
  FindingAgencyByAdminInfo,
  FindingAgencyByAgencyInfo,
  StaffsOperation,
} from "@/TDLib/tdlogistics";

const service = new AgencyOperation();
const conditions: FindingAgencyByAdminInfo[] = [];
const conditions2: FindingAgencyByAgencyInfo[] = [];

async function getRole(): Promise<any> {
  const staff = new StaffsOperation();
  const res = await staff.getAuthenticatedStaffInfo();
  const role = res.data.role;
  console.log(role);
  return role;
}
async function getData(): Promise<any> {
  // Fetch data from your API here.
  const role = await getRole();

  if (
    role === "ADMIN" ||
    role === "MANAGER" ||
    role === "HUMAN_RESOURCE_MANAGER"
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

export default async function DemoPage(reloadData) {
  const data = await getData();
  console.log("Data", data);
  const role = await getRole();
  if (
    (role === "ADMIN" ||
    role === "MANAGER" ||
    role === "HUMAN_RESOURCE_MANAGER") &&
    data
  ) {
    return <DataTable columns={columns} data={data} reloadData={reloadData} />;
  } else {
    return (
      <div className="flex place-content-center h-screen justify-center place-items-center">
        "You are not authorized to access this page. Please contact admin."
      </div>
    );
  }
}
