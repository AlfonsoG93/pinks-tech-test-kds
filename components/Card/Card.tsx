import s from "@/components/Card/Card.module.scss";
import {Order} from "@/dtos/Order.dto";
import {useState} from "react";
import {OrderState} from "@/enums/OrderState";

type CardProps = {
	order: Order;
	onClick?: (order: string) => void;
};

export default function Card({ order, onClick }: CardProps ) {
	const [isDragging, setIsDragging] = useState(false);
	
	return (
		<div
			draggable={order.state !== OrderState.DELIVERED}
			onDragStart={(e) => {
				if (order.state !== OrderState.DELIVERED) {
					e.dataTransfer.setData("text/plain", order.id);
					setIsDragging(true);
				} else return;
			}}
			onDragEnd={() => setIsDragging(false)}
			onClick={() => onClick && onClick(order.id)}
			className={`${s["pk-card"]} ${order.state !== OrderState.DELIVERED ? s["pk-card__grababble"] : ""} ${isDragging ? s["pk-card__dragging"]: ""}`}
		>
			<div>
            <span>
              orden: <b>{order.id}</b>
            </span>
			</div>
			<div>
				{order.items.map((_) => (
					<div></div>
				))}
			</div>
		</div>
	)
}
