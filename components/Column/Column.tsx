import s from "./Column.module.scss";
import { Order } from "@/dtos/Order.dto";
import {OrderState} from "@/enums/OrderState";
import {orderLabels} from "@/constants/OrderLabels";
import {orderColors} from "@/constants/OrdersColors";
export type ColumnProps = {
  orders: Array<Order>;
  state: OrderState
  onClick?: (order: string) => void;
};

export default function Column(props: ColumnProps) {
  return (
    <div className={s["pk-column"]}>
      <div className={s["pk-column__title"]}>
        <h3>{orderLabels[props.state]}</h3>
          <div
              className={s["pk-column__title__dot"]}
              style={{ backgroundColor: orderColors[props.state] }}
          ></div>
      </div>
      {props.orders.map((order) => (
        <div
            key={order.id}
            onClick={() => props.onClick && props.onClick(order.id)}
            className={s["pk-card"]}
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
      ))}
    </div>
  );
}
