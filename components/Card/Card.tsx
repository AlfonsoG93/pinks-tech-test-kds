import s from "@/components/Card/Card.module.scss";
import {Order} from "@/dtos/Order.dto";
import {useState} from "react";

type CardProps = {
	order: Order;
	onClick?: (order: string) => void;
};

export default function Card({ order, onClick }: CardProps ) {
	const [isDragging, setIsDragging] = useState(false);
	
	return (
		<div
			draggable
			onDragStart={(e) => {
				e.dataTransfer.setData("text/plain", order.id);
				setIsDragging(true)
			}}
			onDragEnd={() => setIsDragging(false)}
			onClick={() => onClick && onClick(order.id)}
			className={`${s["pk-card"]} ${isDragging ? s["pk-card__dragging"] : ""}`}
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
