import s from "./Kanban.module.scss";
import Column from "../Column";
import {useOrders} from "@/contexts/Orders.context";
import {OrderState} from "@/enums/OrderState";

type KanbanStage = {
    state: OrderState;
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
        { state: OrderState.PENDING, next: OrderState.IN_PROGRESS },
        { state: OrderState.IN_PROGRESS, next: OrderState.READY },
        { state: OrderState.READY}, // no `next`, this is handled by riders
        { state: OrderState.DELIVERED }, // no `next`, this is last stage
    ];
    
    const renderColumn = (
        state: OrderState,
        nextState?: OrderState
    ) => {
        
        return (
            <Column
                key={`kanban-column-${state}`}
                state={state}
                orders={getOrdersByState(state)}
                onClick={advanceOrder(nextState)}
            />
        );
    };
    
  return (
    <section className={s["pk-kanban"]}>
        {kanbanStages.map(({ state, next }) =>
            renderColumn(state, next)
        )}
    </section>
  );
}
