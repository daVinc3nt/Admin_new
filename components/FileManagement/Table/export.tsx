import { FileData, columns } from "./column";
import { DataTable } from "./datatable";
import https from "https";

async function getData(): Promise<FileData[]> {
  // Fetch data from your API here.

  const res = await fetch(
    "https://65b75fb446324d531d5468b0.mockapi.io/none/FileManagement"
  );
  const data = await res.json();
  return data;
}

export default async function DemoPage() {
  const data = await getData();

  return <DataTable columns={columns} data={data} />;
}
