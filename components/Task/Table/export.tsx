import { createColumns } from "./column";
import { DataTable } from "./datatable";
import { ShippersOperation, DriversOperation, GettingRoutesConditions, RoutesOperation } from "@/TDLib/tdlogistics";

async function getData(info: any, vehicle_id?, source?, destination?, from_departure_time?, to_departure_time?): Promise<any> {
  if (
    info?.role === "ADMIN" ||
    info?.role === "MANAGER" ||
    info?.role === "HUMAN_RESOURCE_MANAGER"
  ) {
    let queryParams: GettingRoutesConditions = {};

    // Kiểm tra và thêm các trường có giá trị vào object
    if (vehicle_id) queryParams.vehicle_id = vehicle_id;
    if (source) queryParams.source = source;
    if (destination) queryParams.destination = destination;
    if (from_departure_time) queryParams.from_departure_time = from_departure_time;
    if (to_departure_time) queryParams.to_departure_time = to_departure_time;
    if (vehicle_id || source || destination || from_departure_time || to_departure_time) {
      const OJ = new RoutesOperation();
      try {
        const response = await OJ.get(queryParams);
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
    } else {
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

export default async function DemoPage(reloadData, info, DataInitial, vehicle_id?, source?, destination?, from_departure_time?, to_departure_time?) {
  const data = await getData(info, vehicle_id, source, destination, from_departure_time, to_departure_time);
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
  } else if (!data) {
    return (
      <div className="flex place-content-center h-full justify-center place-items-center">
        "Không có tuyến phù hợp."
      </div>
    );
  }
  else {
    return (
      <div className="flex place-content-center h-full justify-center place-items-center">
        "You are not authorized to access this page. Please contact admin."
      </div>
    );
  }
}
