import { RoutesOperation } from "@/TDLib/tdlogistics";
import { createColumns } from "@/components/Route/TableInfo/column";
import { DataTable } from "@/components/Route/TableInfo/datatable";

async function getData() {

    try {
        const routes = new RoutesOperation();
        const data = await routes.get({});
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
        console.log(data)
        console.log(info)
        if (
            info?.role === "ADMIN" ||
            info?.role === "MANAGER" ||
            info?.role === "HUMAN_RESOURCE_MANAGER"
        ) {
            const columns = await createColumns(reloadData, info);
            if (!data.error?.error)
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
        }
        else return (
            <div className="flex place-content-center h-screen justify-center place-items-center">
                "You are not authorized to access this page. Please contact admin."
            </div>
        );

    } catch (error) {
        return (
            <div className="flex place-content-center h-screen justify-center place-items-center">
                "Error! Please contact admin."
            </div>
        );
    }
}
