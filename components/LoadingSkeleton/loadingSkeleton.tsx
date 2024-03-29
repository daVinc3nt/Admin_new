import { Consignment, columns } from "./column";
import { DataTable } from "./datatable";

const LoadingSkeleton = () => {
  const data = [
    {
      consignmentCode: "2A8V0N",
      barcode: "I8FIP1",
      deliveryManName: "Jane Doe",
      licensePlate: "58-TQ-73224",
      container: "6b13df25-b46a-4ed2-84a9-5b5f60ba8e0b",
      consState: 3,
      consCode: "97670c61-b7d7-4569-83f6-0a43e5fb43d0",
      carrierName: "Carrier C",
      mass: 586156.79,
      id: 1,
    },
    {
      consignmentCode: "FNQYAI",
      barcode: "U7QLTE",
      deliveryManName: "Alice Johnson",
      licensePlate: "95-SS-53193",
      container: "9767bb6b-8cb4-43fe-bdb1-4d4b601260f7",
      consState: 1,
      consCode: "0c26a9d8-4063-4fc8-9d45-d149bbc145eb",
      carrierName: "Carrier E",
      mass: 420489.59,
      id: 2,
    },
    {
      consignmentCode: "W5866S",
      barcode: "FV7BWC",
      deliveryManName: "Alice Doe",
      licensePlate: "36-MR-27532",
      container: "f52c8df3-4c65-4db6-947e-d9bc79e87f43",
      consState: 4,
      consCode: "10b1d727-0e2d-46b6-ae7f-8e688efee711",
      carrierName: "Carrier B",
      mass: 126492.59,
      id: 3,
    },
    {
      consignmentCode: "UGYGW8",
      barcode: "AYP3CD",
      deliveryManName: "Bob Doe",
      licensePlate: "42-YS-41880",
      container: "47dbcd70-6470-4519-a8d3-3ab198ffb81d",
      consState: 4,
      consCode: "d4a9daac-821c-4566-a86e-586e96edef15",
      carrierName: "Carrier B",
      mass: 899155.42,
      id: 4,
    },
    {
      consignmentCode: "MKTTT2",
      barcode: "UMVZW6",
      deliveryManName: "Jane Smith",
      licensePlate: "97-LP-56577",
      container: "c0c2f60f-8083-4c4d-89ed-a9a1276fd33c",
      consState: 4,
      consCode: "273e08af-d958-4db9-975a-8459f6e6c7f0",
      carrierName: "Carrier B",
      mass: 272901.92,
      id: 5,
    },
    {
      consignmentCode: "QZHO5F",
      barcode: "02B9B9",
      deliveryManName: "Jane Doe",
      licensePlate: "87-QX-52769",
      container: "35acba6f-faca-4d31-b175-d45bbe489133",
      consState: 3,
      consCode: "301284ce-340f-4a8b-b46f-204a44ca9e42",
      carrierName: "Carrier B",
      mass: 608942.71,
      id: 6,
    },
    {
      consignmentCode: "I97S74",
      barcode: "N4OG8I",
      deliveryManName: "Alice Smith",
      licensePlate: "22-QU-59452",
      container: "7b496b74-688e-409c-8c51-46c665da4a81",
      consState: 1,
      consCode: "a3a1fd6f-f2ac-48ad-9b7d-442ae45db265",
      carrierName: "Carrier D",
      mass: 866729.12,
      id: 7,
    },
    {
      consignmentCode: "9ORN5D",
      barcode: "DCUVRA",
      deliveryManName: "Jane Johnson",
      licensePlate: "89-WN-38203",
      container: "c9340223-c44b-499b-8899-139da44f816f",
      consState: 4,
      consCode: "18d77887-5440-4cc8-b04b-bb3898e3040b",
      carrierName: "Carrier B",
      mass: 202740.3,
      id: 8,
    },
    {
      consignmentCode: "8LUMGC",
      barcode: "R3B1DZ",
      deliveryManName: "Alice Johnson",
      licensePlate: "92-FF-96927",
      container: "0b79c370-cfe2-4293-bc84-ecb6ed32aba4",
      consState: 3,
      consCode: "ce5c610e-14f1-4aea-8cc8-a5f781f9f7a3",
      carrierName: "Carrier C",
      mass: 14556.8,
      id: 9,
    },
    {
      consignmentCode: "3RJUSJ",
      barcode: "8NGLNA",
      deliveryManName: "John Johnson",
      licensePlate: "32-EU-64307",
      container: "4d03a355-3a65-4610-b404-8db3dae4250b",
      consState: 3,
      consCode: "cd582af5-083b-4d4a-81a1-bc6483da807a",
      carrierName: "Carrier C",
      mass: 584149.16,
      id: 10,
    },
  ];
  return <DataTable columns={columns} data={data} />;
};

export default LoadingSkeleton;
