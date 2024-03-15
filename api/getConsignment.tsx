import { ShipmentsOperation } from "@/TDLib/tdlogistics";
import { columns } from "../components/Consignment/Table/TableInfo/column";
import { DataTable } from "../components/Consignment/Table/TableInfo/datatable";
async function getData() {
    const shipments = new ShipmentsOperation();
    const data = await shipments.get({});
    return data;
}

export default async function DemoPage(reloadData) {
    const data = await getData();
    return <DataTable columns={columns} data={data.data} reloadData={reloadData} />;
}
