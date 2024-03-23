import { LeakAddTwoTone } from "@mui/icons-material";
import { Staff, columns } from "./column";
import { DataTable } from "./datatable";
import { useContext, useEffect } from "react";
import { StaffsOperation, FindingStaffByAdminConditions, PartnerStaffOperation } from "@/TDLib/tdlogistics";
import https from "https";
import { UserContext } from "@/Context/InfoContext/UserContext";
const conditions: FindingStaffByAdminConditions[] = [];
async function getData(info:any): Promise<any> {
  // Fetch data from your API here.p
  const validValues = ["ADMIN", "MANAGER", "HUMAN_RESOURCE_MANAGER", 
  "AGENCY_MANAGER", "AGENCY_HUMAN_RESOURCE_MANAGER" ];
  const role = info?.role
  const staff = new PartnerStaffOperation()
  let res
  if (validValues.includes(role))
    {
      res = await staff.findByAdmin({})  
    }
  return res.data;
}
export default async function DemoPage(info:any) {
  const data = await getData(info);
  return(
    <div>
      <DataTable columns={columns} data={data} info={info}/>
    </div>
  )
}
