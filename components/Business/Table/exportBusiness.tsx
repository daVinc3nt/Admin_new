import { createColumns } from "./columnBusiness";
import { DataTable } from "./datatable";
import https from "https";
import {
  BusinessOperation,
  FindingBusinessByAdminCondition,
  FindingBusinessByBusinessCondition,
  StaffsOperation,
} from "@/TDLib/tdlogistics";
import LoadingSkeleton from "@/components/LoadingSkeleton/loadingSkeleton";

const service = new BusinessOperation();
const conditions: FindingBusinessByAdminCondition[] = [];
const conditions2: FindingBusinessByBusinessCondition[] = [];

async function getData(info: any): Promise<any> {
  const staff = new StaffsOperation();

  if (
    info?.role === "ADMIN" ||
    info?.role === "MANAGER" ||
    info?.role === "HUMAN_RESOURCE_MANAGER" ||
    info?.role === "TELLER" ||
    info?.role === "COMPLAINTS_SOLVER" ||
    info?.role === "AGENCY_MANAGER" ||
    info?.role === "AGENCY_HUMAN_RESOURCE_MANAGER" ||
    info?.role === "AGENCY_TELLER" ||
    info?.role === "AGENCY_COMPLAINTS_SOLVER"
  ) {
    const response = await service.findByAdmin(conditions[0]);
    // console.log("RoleAdmin");
    // console.log(response.data);
    return response.data;
  } else {
    const response = await service.findByBusiness(conditions2[0]);
    // console.log("RoleBusiness");
    return response.data;
  }
}

export default async function DemoPage(reloadData, info) {
  const data = await getData(info);
  // console.log("Data Admin", data);
  const columns = await createColumns(reloadData, info);
  return (
    <>
      {data && (
        <DataTable
          columns={columns}
          data={data}
          reloadData={reloadData}
          info={info}
        />
      )}
      {!data && <LoadingSkeleton />}
    </>
  );
}
