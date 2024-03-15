import { useState } from "react";
import { Order, columns } from "./column";
import { DataTable } from "./datatable";
import { OrdersOperation } from "@/TDLib/tdlogistics";
import { AnyNode } from "postcss";

async function getData(): Promise<Order[]> {
  // Fetch data from your API here.
  const action = new OrdersOperation()
  const data = await action.get({})
  const orders =data.data
  console.log("nè",action.get({}))
  // const res = await fetch(
  //   "https://65b8fe3fb71048505a89e8db.mockapi.io/api/consignment"
  // );
  // const data = await res.json();
  // const orders: Order[] = data.flatMap((consignment) => consignment.orders);
  return orders;
}

export default async function DemoPage(socket: AnyNode, reloadData) {
  const data = await getData()
  let done = 0,pending = 0,cancel = 0;
  data.map((data)=>{
    if (data.status_code === 3) 
      done++;
    else if(data.status_code === 4)
      cancel++;
    else pending++;
  })
  return (
      <DataTable socket={socket} cancel={cancel} done={done} pending={pending} columns={columns} data={data} reloadData={reloadData}/>
  );
}
