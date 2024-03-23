import type { NextPage } from "next";
import BusinessMenu from "@/components/Business/Business";
const Business: NextPage = () => {
  return (
    <div className="w-full no-scrollbar">
      <BusinessMenu />
    </div>
  );
};

export default Business;
