import s from "./Kanban.module.scss";
import Column from "../Column";
import {useOrders} from "@/contexts/Orders.context";
import {orderLabels} from "@/constants/OrderLabels";
import {OrderState} from "@/enums/OrderState";

type KanbanStage = {
    state: OrderState;
    title: string;
    next?: OrderState; // optional for the last column (like "DELIVERED")
};

export default function Kanban() {
  const { orders, updateOrderState } = useOrders();
  
  const getOrdersByState = (state: OrderState) => {
      return orders.filter((i) => i.state === state)
  }
  const advanceOrder = (targetState?: OrderState) => (orderId: string) => {
      if (targetState) updateOrderState(orderId, targetState);
      else {
          console.log("No next stage to advance. ");
          return
      }
  };
    
    const kanbanStages: KanbanStage[] = [
        { state: OrderState.PENDING, title: orderLabels[OrderState.PENDING], next: OrderState.IN_PROGRESS },
        { state: OrderState.IN_PROGRESS, title: orderLabels[OrderState.IN_PROGRESS], next: OrderState.READY },
        { state: OrderState.READY, title: orderLabels[OrderState.READY] }, // no `next`, this is handled by riders
        { state: OrderState.DELIVERED, title: orderLabels[OrderState.DELIVERED] }, // no `next`, this is last stage
    ];
    
    const renderColumn = (
        state: OrderState,
        title: string,
        nextState?: OrderState
    ) => {
        
        return (
            <Column
                key={state}
                title={title}
                orders={getOrdersByState(state)}
                onClick={advanceOrder(nextState)}
            />
        );
    };
    
  return (
    <section className={s["pk-kanban"]}>
        {kanbanStages.map(({ state, title, next }) =>
            renderColumn(state, title, next)
        )}
    </section>
  );
}
