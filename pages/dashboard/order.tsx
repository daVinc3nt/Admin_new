import OrderList from "@/components/Order/OrderList";
import type { NextPage } from "next";
const Order: NextPage = () => {
  return (
    <div className="w-full no-scrollbar">
      <OrderList />
    </div>
  );
};

export default Order;
