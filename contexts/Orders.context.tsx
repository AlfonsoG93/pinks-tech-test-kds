import {Order} from "@/dtos/Order.dto";
import {OrderOrchestrator} from "@/lib";
import {createContext, ReactNode, useContext, useEffect, useState,} from "react";
import {OrderState} from "@/enums/OrderState";

export type OrdersContextProps = {
  orders: Array<Order>;
  pickup: (orderId: string) => void;
  updateOrderState: (orderId: string, newState: OrderState) => void;
  getOrderById: (orderId: string) => Order | undefined
};

export const OrdersContext = createContext<OrdersContextProps>(
  {} as OrdersContextProps
);

export type OrdersProviderProps = {
  children: ReactNode;
};

export function OrdersProvider(props: OrdersProviderProps) {
  const [orders, setOrders] = useState<Array<Order>>([]);

  useEffect(() => {
    const orderOrchestrator = new OrderOrchestrator();
    const listener = orderOrchestrator.run();
    listener.on("order", handleNewOrder);
    //Cleanup listener
    return () => {
      listener.off("order", handleNewOrder)
    }
  }, []);
  
  // move functionality of listener callback here for readability
  const handleNewOrder = (order: Order) => {
    setOrders((prev) => [...prev, order]);
  };
  
  const pickup = (orderId: string): void => {
     updateOrderState(orderId, OrderState.DELIVERED);
  };
  
  const updateOrderState = (orderId: string, newState: OrderState) => {
    setOrders(prev => prev.map(order => {
      return order.id === orderId ? {...order, state: newState} : order;
    }));
  };

  const getOrderById = (orderId:  string) => {
    return orders.find((o) => o.id === orderId);
  }
  const context = {
    orders,
    pickup,
    updateOrderState,
    getOrderById,
  };

  return (
    <OrdersContext.Provider value={context}>
      {props.children}
    </OrdersContext.Provider>
  );
}

export const useOrders = () => useContext(OrdersContext);
