import { ShipmentsOperation } from "@/TDLib/tdlogistics";

export default async function getData() {
    try {
        const shipments = new ShipmentsOperation();
        const data = await shipments.getAllAgencies();
        console.log("hello")
        console.log(data)
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}
