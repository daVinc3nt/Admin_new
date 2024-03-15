import { EmailData, columns } from "./column";
import { DataTable } from "./datatable";
async function getData(): Promise<EmailData[]> {
  // Fetch data from your API here.

  const res = await fetch(
    "https://65b75fb446324d531d5468b0.mockapi.io/none/EmailManagement"
  );
  const data = await res.json();
  return data;
}

export default async function DemoPage() {
  const data = await getData();

  return <DataTable columns={columns} data={data} />;
}
