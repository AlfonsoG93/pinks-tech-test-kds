import {OrderState} from "@/enums/OrderState";

export const orderColors: Record<OrderState, string> = {
	PENDING: "#c2410c",       // amber
	IN_PROGRESS: "#1d4ed8",   // blue
	READY: "#047857",         // green
	DELIVERED: "#374151",     // gray
};