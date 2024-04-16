import RouteList from "@/components/Route/Routelist";
import type { NextPage } from "next";
const RouteManager: NextPage = () => {

    return (
        <div className="w-full no-scrollbar">
            <RouteList />
        </div>
    );
};

export default RouteManager;
