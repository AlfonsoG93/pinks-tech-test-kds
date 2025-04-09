import { OrderState } from "@/enums/OrderState";

export const orderLabels: Record<OrderState, string> = {
	[OrderState.PENDING]: "Pendiente",
	[OrderState.IN_PROGRESS]: "En preparación",
	[OrderState.READY]: "Listo",
	[OrderState.DELIVERED]: "Entregado",
};
