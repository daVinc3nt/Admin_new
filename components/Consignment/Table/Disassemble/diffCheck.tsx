import React from "react";
import { FormattedMessage } from "react-intl";

function DiffCheck({ consignment1, consignment2 }) {
    const getDifferentOrders = () => {
        const differentOrders = [];
        consignment1.order_ids.forEach((order_id) => {
            if (!consignment2.order_ids.includes(order_id)) {
                differentOrders.push(order_id);
            }
        });
        consignment2.order_ids.forEach((order_id) => {
            if (!consignment1.order_ids.includes(order_id)) {
                differentOrders.push(order_id);
            }
        });

        return differentOrders;
    };

    const differentOrders = getDifferentOrders();

    return (
        <div className="flex flex-col md:flex-row justify-between w-full gap-2 h-full">
            <div className="w-full md:w-1/2 h-full flex flex-col gap-2">
                <h2 className="w-full text-center flex flex-col"><FormattedMessage id="Consignment.Decompose.Title3" />: <span>{consignment1.shipment_id}</span></h2>
                <div className="border border-[#545e7b] p-2 mb-4 w-full rounded-xl grow overflow-y-scroll no-scrollbar flex gap-2 flex-col">
                    {consignment1.order_ids.map((order_id, index) => (
                        <div
                            key={index}
                            className={`border border-[#545e7b] rounded-lg p-2 dark:bg-[#1a1b23] h-10 flex flex-col items-center justify-center ${differentOrders.includes(order_id)
                                ? "text-red-500"
                                : ""
                                }`}
                        >
                            {order_id}
                        </div>
                    ))}
                </div>
            </div>
            <div className="w-full md:w-1/2 h-full flex flex-col gap-2">
                <h2 className="w-full text-center flex flex-col"><FormattedMessage id="Consignment.Decompose.Title2" />: <span className="text-transparent hidden md:block">-</span></h2>
                <div className="border border-[#545e7b] p-2 mb-4 w-full rounded-xl grow overflow-y-scroll no-scrollbar flex gap-2 flex-col">
                    {consignment2.order_ids.map((order_id, index) => (
                        <div
                            key={index}
                            className={`border border-[#545e7b] rounded-lg p-2 dark:bg-[#1a1b23] h-10 flex flex-col items-center justify-center ${differentOrders.includes(order_id)
                                ? "text-red-500"
                                : ""
                                }`}
                        >
                            {order_id}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default DiffCheck;
