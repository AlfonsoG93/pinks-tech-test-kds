import s from "./Kanban.module.scss";
import Column from "../Column";
import {useOrders} from "@/contexts/Orders.context";
import {orderLabels} from "@/constants/OrderLabels";
import {OrderState} from "@/enums/OrderState";

export default function Kanban() {
  const { orders, updateOrderState } = useOrders();
  
  const getOrdersByState = (state: OrderState) => {
      return orders.filter((i) => i.state === state)
  }
  const advanceOrder = (targetState: OrderState) => (orderId: string) => {
      updateOrderState(orderId, targetState);
  };

  return (
    <section className={s["pk-kanban"]}>
      <Column
          title={orderLabels[OrderState.PENDING]}
          orders={getOrdersByState(OrderState.PENDING)}
          onClick={advanceOrder(OrderState.IN_PROGRESS)}
      />
      <Column
          title={orderLabels[OrderState.IN_PROGRESS]}
          orders={getOrdersByState(OrderState.IN_PROGRESS)}
          onClick={advanceOrder(OrderState.READY)}
      />
      <Column
          title={orderLabels[OrderState.READY]}
          orders={getOrdersByState(OrderState.READY)}
      />
    </section>
  );
}
