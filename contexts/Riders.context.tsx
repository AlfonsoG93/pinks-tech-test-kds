import React,
{ createContext,
  ReactNode,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import {useOrders} from "./Orders.context";
import {getRandomInterval} from "@/lib/utils";
import {Rider} from "@/dtos/Rider.dto";
import {OrderState} from "@/enums/OrderState";

export type RidersContextProps = {
  riders: Array<Rider>;
};

export const RidersContext = createContext<RidersContextProps>(
    {} as RidersContextProps
);

export type RidersProviderProps = {
  children: ReactNode;
};

export function RidersProvider(props: RidersProviderProps) {
  const [riders, setRiders] = useState<Array<Rider>>([]);
  const { orders, pickup } = useOrders();
  
  // Use a Set for quick lookup of processed orders
  const processedOrders = useRef<Set<string>>(new Set())
  // Use ordersRef to avoid  outdated state inside the delayed logic
  const ordersRef = useRef(orders);
  
  useEffect(() => {
    ordersRef.current = orders;
  }, [orders]);
  
  useEffect(() => {
    const timeout = setTimeout(simulateRiderArrival, getRandomInterval(4000, 10000));
    return () => clearTimeout(timeout);
  }, [riders]);
  
  // move main logic of effect to a function here for readability
  const simulateRiderArrival = () => {
    const availableOrder = getAvailableOrder()
    
    if (!availableOrder) return;
    
    const orderId = availableOrder.id;
    processedOrders.current.add(orderId);
    
    setRiders((prev) => [
      ...prev,
      {
        orderWanted: orderId,
        pickup: () => handlePickup(orderId),
      },
    ]);
  };
  // helper function 1 for simulateRiderArrival
  const getAvailableOrder = () => {
    return ordersRef.current.find(
        (order) =>
            order.state === OrderState.PENDING &&
            !processedOrders.current.has(order.id) &&
            !isOrderAssigned(order.id)
    );
  }
  // helper function 2 for simulateRiderArrival
  const isOrderAssigned = (orderId: string) => {
    return riders.some((r) => r.orderWanted === orderId);
  }
  
  const handlePickup = (orderId: string) => {
    const order = ordersRef.current.find((o) => o.id === orderId);
    
    if (order?.state === OrderState.READY) {
      pickup(orderId);
      removeRider(orderId);
    } else {
      console.warn("Cannot pick up order. Current state:", order?.state);
    }
  };
  
  const removeRider = (orderId: string) => {
    setRiders((prev) => prev.filter((r) => r.orderWanted !== orderId));
    processedOrders.current.delete(orderId);
  };
  
  const context = { riders };
  
  return (
      <RidersContext.Provider value={context}>
        {props.children}
      </RidersContext.Provider>
  );
}

export const useRiders = () => useContext(RidersContext);