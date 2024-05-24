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
  console.log("hello",info)
  let res
  console.log(info)
  if (validValues.includes(role))
    {
      console.log("hello")
      res = await staff.findByAdmin(conditions[0])  
    }
  // const data = await res.json();
  // console.log(res1)
  // console.log(data)
  // console.log(res1)
  console.log(res)
  return res?.data;
}
export default async function DemoPage(info:any, reloadData) {
  // const test = useContext(UserContext)
  const data = await getData(info);
  const columnsWdata = await columns(reloadData);
  if (data)
    return(
      <div>
        <DataTable columns={columnsWdata} data={data} info={info}/>
      </div>
    )
}
