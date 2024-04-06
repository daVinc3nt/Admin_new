import { createColumns } from "./column";
import { DataTable } from "./datatable";
import { ShippersOperation, DriversOperation } from "@/TDLib/tdlogistics";

async function getData(info: any): Promise<any> {
  // Fetch data from your API here.
  if (
    info?.role === "ADMIN" ||
    info?.role === "MANAGER" ||
    info?.role === "HUMAN_RESOURCE_MANAGER"
  ) {
    const OJ = new DriversOperation();
    try {
      const response = await OJ.getObjectsCanHandleTask();
      console.log("Response", response);
      if (response.error) {
        alert(response.message);
        return null;
      }
      return response.data;
    } catch (e) {
      alert("Error: " + e);
      return null;
    }
  } else if (
    info?.role === "AGENCY_MANAGER" ||
    info?.role === "AGENCY_HUMAN_RESOURCE_MANAGER"
  ) {
    const OJ = new ShippersOperation();
    try {
      const response = await OJ.getObjectsCanHandleTask();
      console.log("Response", response);
      if (response.error) {
        alert(response.message);
        return null;
      }
      return response.data;
    } catch (e) {
      alert("Error: " + e);
      return null;
    }
  }
  return null;
}

export default async function DemoPage(reloadData, info, DataInitial) {
  const data = await getData(info);
  console.log("Data", data);
  const columns = await createColumns(reloadData, info, DataInitial);
  if (
    (info?.role === "ADMIN" ||
      info?.role === "MANAGER" ||
      info?.role === "HUMAN_RESOURCE_MANAGER" ||
      info?.role === "AGENCY_MANAGER" ||
      info?.role === "AGENCY_HUMAN_RESOURCE_MANAGER") &&
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
