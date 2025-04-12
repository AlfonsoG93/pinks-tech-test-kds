import s from "./Column.module.scss";
import { Order } from "@/dtos/Order.dto";
import {OrderState} from "@/enums/OrderState";
import {orderLabels} from "@/constants/OrderLabels";
import {orderColors} from "@/constants/OrdersColors";
import Card from "@/components/Card";
export type ColumnProps = {
  orders: Array<Order>;
  state: OrderState
  onClick?: (order: string) => void;
  onDrop?: (order: string, state: OrderState) => void;
};

export default function Column(props: ColumnProps) {
  return (
    <div className={`${s["pk-column"]} ${props.state === OrderState.DELIVERED ? s["pk-column--disabled-drop"] : ""}`}
         onDragOver={(e) => {
             if (props.state !== OrderState.DELIVERED) {
                 e.preventDefault();
             }
         }}
         onDrop={(e) => {
             if (props.state === OrderState.DELIVERED) return;
             const orderId = e.dataTransfer.getData("text/plain");
             props.onDrop?.(orderId, props.state);
         }}
    >
      <div className={s["pk-column__title"]}>
        <h3>{orderLabels[props.state]}</h3>
          <div
              className={s["pk-column__title__dot"]}
              style={{ backgroundColor: orderColors[props.state] }}
          ></div>
      </div>
      {props.orders.map((order) => (
        <Card
            key={`oder-card-${order.id}`}
            order={order}
            onClick={() => props.onClick?.(order.id)}
        />
      ))}
    </div>
  );
}
