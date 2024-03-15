import React, { useState } from 'react';
import { Button } from '@nextui-org/react';
import { IoMdSearch, IoIosBarcode } from "react-icons/io";
import { FormattedMessage, useIntl } from 'react-intl';
import { OrdersOperation } from "@/TDLib/tdlogistics";

const AddOrders = ({ setConsignment2 }) => {
    const intl = useIntl();
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedOrders, setSelectedOrders] = useState([]);
    const ordersOperation = new OrdersOperation();

    const handleSearch = async () => {
        try {
            const result = await ordersOperation.checkExist({ order_id: searchTerm });
            if (!result.error && result.existed) {
                const isOrderAlreadySelected = selectedOrders.some(order => order === searchTerm);
                if (!isOrderAlreadySelected) {
                    setSelectedOrders(prevOrders => [...prevOrders, searchTerm]);
                    setConsignment2(prevConsignment2 => ({ order_ids: [...prevConsignment2.order_ids, searchTerm] }));
                } else {
                    alert("Đơn hàng đã được thêm vào danh sách!");
                }
            } else {
                alert("Không tìm thấy đơn hàng hoặc đơn hàng đã tồn tại!");
            }
        } catch (error) {
            alert("Error searching for order:" + error);
        }
        setSearchTerm("");
    };

    const handleChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    const handleRemoveOrder = (orderId) => {
        setSelectedOrders(prevOrders => prevOrders.filter(order => order !== orderId));
    };

    return (
        <div className="h-screen_3/5 overflow-y-scroll border-[#545e7b] mt-4 no-scrollbar flex flex-col items-center bg-white dark:bg-[#14141a] p-2 rounded-md dark:text-white gap-2">
            <div className="flex justify-center w-full font-bold"><FormattedMessage id="Consignment.Decompose.Input2" /></div>
            <div className="flex justify-center w-full gap-2 relative">
                <div className="relative flex-1">
                    <input
                        className={`h-10 rounded-lg mt-2 mb-1 p-3 w-full border-green-700 text-black
                        bg-transparent drop-shadow-md hover:drop-shadow-xl border 
                        hover:shadow-md mr-2`}
                        placeholder={intl.formatMessage({ id: "Consignment.Add.Add1" })}
                        value={searchTerm}
                        onChange={handleChange}
                        onKeyDown={handleKeyPress}
                    />
                    <IoMdSearch
                        className="absolute top-1/2 mt-0.5 -translate-y-1/2 right-3 text-gray-400 cursor-pointer"
                        onClick={handleSearch}
                    />
                </div>
                <Button
                    className={`h-10 rounded-lg mt-2 mb-1 p-3 w-36 border-green-700 hover:bg-green-700 text-green-500
                    bg-transparent drop-shadow-md hover:drop-shadow-xl hover:text-white border 
                    hover:shadow-md`}
                >
                    <IoIosBarcode className="hidden sm:block mr-2 h-5 w-5" />
                    <span className="block"><FormattedMessage id="Consignment.Add.Add2" /></span>
                </Button>
            </div>

            <div className="flex flex-col selection:justify-center w-full h-full border rounded-xl border-[#545e7b] gap-2 p-2">
                {selectedOrders.map((orderId) => (
                    <div key={orderId} className={`border border-[#545e7b] rounded-lg h-10 dark:bg-[#1a1b23] flex flex-row justify-between items-center relative`}>
                        <span className='px-2 py-1 flex-grow'>{orderId}</span>
                        <Button onClick={() => handleRemoveOrder(orderId)} className="ml-2 px-2 bg-red-500 text-white rounded-r-[7px] h-full">
                            Remove
                        </Button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default AddOrders;
