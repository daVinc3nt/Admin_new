import { createColumns } from "./column";
import { DataTable } from "./datatable";
import https from "https";
import {
  TransportPartnersOperation,
  FindingTransportPartnerByAdminConditions,
  FindingTransportPartnerByTransportPartnerCondition,
} from "@/TDLib/tdlogistics";
import LoadingSkeleton from "@/components/LoadingSkeleton/loadingSkeleton";

const service = new TransportPartnersOperation();
const conditions: FindingTransportPartnerByAdminConditions[] = [];
const conditions2: FindingTransportPartnerByTransportPartnerCondition[] = [];

async function getData(info): Promise<any> {
  if (info?.role === "ADMIN") {
    const response = await service.findByAdmin(conditions[0]);
    return response.data;
  } else {
    const response = await service.findByTransportPartner(conditions2[0]);
    console.log(response);
    console.log("RoleTransportPartner");
    return response.data;
  }
}

export default async function DemoPage(reloadData, info) {
  const data = await getData(info);
  const columns = await createColumns(reloadData, info);
  return (
    <>
      {data && (
        <DataTable
          columns={columns}
          data={data}
          reloadData={reloadData}
          info={info}
        />
      )}
      {!data && <LoadingSkeleton />}
    </>
  );
}
