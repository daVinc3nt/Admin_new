export type Order = {
  orderId: string;
  mass: number;
  length: number;
  width: number;
  height: number;
  pickupLocation: string;
  deliveryLocation: string;
  fee: number;
  cod: number;
  consCodes: number;
  status: number;
}
export type Task = {
  taskId: number;
  description: string;
  status: boolean;
  deadline: string;
}