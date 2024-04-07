import { ShipmentsOperation } from "@/TDLib/tdlogistics";
import { createColumns } from "../components/Consignment/Table/TableInfo/column";
import { DataTable } from "../components/Consignment/Table/TableInfo/datatable";

async function getData() {
  try {
    const shipments = new ShipmentsOperation();
    const data = await shipments.get({});
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}

export default async function DemoPage(
  reloadData,
  setOpenError,
  setMessage,
  info
) {
  try {
    const data = await getData();
    const columns = await createColumns(reloadData, info);
    if (!data.error)
      return (
        <DataTable columns={columns} data={data.data} reloadData={reloadData} />
      );
    else {
      setMessage(data.message);
      setOpenError(true);
      return (
        <div className="flex place-content-center h-screen justify-center place-items-center">
          "Error! Please contact admin."
        </div>
      );
    }
  } catch (error) {
    return (
      <div className="flex place-content-center h-screen justify-center place-items-center">
        "Error! Please contact admin."
      </div>
    );
  }
}
