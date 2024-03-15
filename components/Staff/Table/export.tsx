import { LeakAddTwoTone } from "@mui/icons-material";
import { Staff, columns } from "./column";
import { DataTable } from "./datatable";
import { useContext, useEffect } from "react";
import { StaffsOperation, FindingStaffByAdminConditions } from "@/TDLib/tdlogistics";
import https from "https";
import { UserContext } from "@/Context/InfoContext/UserContext";
const conditions: FindingStaffByAdminConditions[] = [];
async function getData(info:any): Promise<any> {
  // Fetch data from your API here.p
  const validValues = ['ADMIN', 'TELLER', 'HUMAN_RESOURCE_MANAGER', 'COMPLAINTS_SOLVER', 'AGENCY_MANAGER', 'AGENCY_HUMAN_RESOURCE_MANAGER'];
  const role = info?.role
  const staff = new StaffsOperation()
  console.log(info)
  let res
  if (validValues.includes(role))
    {
      res = await staff.findByAdmin(conditions[0])  
    }
  const res1 = await fetch(
    "https://65a8eb68219bfa371867ef13.mockapi.io/fakeapi/staff"
  );
  // const data = await res.json();
  // console.log(res1)
  // console.log(data)
  // console.log(res1)
  console.log("ne",res.data)
  
  return res.data;
}
export default async function DemoPage(info:any) {
  // const test = useContext(UserContext)
  const data = await getData(info);

  return(
    <div>
      <DataTable columns={columns} data={data} info={info}/>
    </div>
  )
}
