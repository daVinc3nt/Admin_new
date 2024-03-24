import { columns } from "./columnBusiness";
import { DataTable } from "./datatable";
import { useState, useEffect } from "react";
import https from "https";
import {
  BusinessOperation,
  FindingBusinessByAdminCondition,
  FindingBusinessByBusinessCondition,
  FindingRepresentorByAdminCondition,
  FindingRepresentorByBusinessCondition,
  StaffsOperation,
  BusinessAuthenticate,
} from "@/TDLib/tdlogistics";
import LoadingSkeleton from "@/components/LoadingSkeleton/loadingSkeleton";

const service = new BusinessOperation();
const conditions: FindingBusinessByAdminCondition[] = [];
const conditions2: FindingBusinessByBusinessCondition[] = [];

async function getRole(): Promise<any> {
  const staff = new StaffsOperation();
  const res = await staff.getAuthenticatedStaffInfo();
  return res.data.role;
}
async function getData(): Promise<any> {
  const staff = new StaffsOperation();
  const res = await staff.getAuthenticatedStaffInfo();
  const isadmin = res.data.role;
  console.log(isadmin);

  if (
    isadmin === "ADMIN" ||
    isadmin === "MANAGER" ||
    isadmin === "HUMAN_RESOURCE_MANAGER" ||
    isadmin === "TELLER" ||
    isadmin === "COMPLAINTS_SOLVER" ||
    isadmin === "AGENCY_MANAGER" ||
    isadmin === "AGENCY_HUMAN_RESOURCE_MANAGER" ||
    isadmin === "AGENCY_TELLER" ||
    isadmin === "AGENCY_COMPLAINTS_SOLVER"
  ) {
    const response = await service.findByAdmin(conditions[0]);
    console.log("RoleAdmin");
    console.log(response.data);
    return response.data;
  } else {
    const response = await service.findByBusiness(conditions2[0]);
    console.log("RoleBusiness");
    return response.data;
  }
}

export default async function DemoPage(reloadData) {
  const data = await getData();
  console.log("Data Admin", data);
  const role = await getRole();
  return (
    <>
      {data && (
        <DataTable
          columns={columns}
          data={data}
          reloadData={reloadData}
          role={role}
        />
      )}
      {!data && <LoadingSkeleton />}
    </>
  );
}
