import s from "./Riders.module.scss";
import Rider from "@/bases/Rider";
import { useRiders } from "@/contexts/Riders.context";
import {useOrders} from "@/contexts/Orders.context";
import {useState} from "react";

export default function Riders() {
  const { getOrderById } = useOrders()
  const { riders, handlePickup } = useRiders();
  const [exitingRiders, setExitingRiders] = useState<string[]>([]);
  
  const onPickup = (orderId: string) => {
      setExitingRiders((prev) => [...prev, orderId]);
      
      setTimeout(() => {
          handlePickup(orderId);
          setExitingRiders((prev) => prev.filter((id) => id !== orderId));
          }, 800); // Match SCSS duration
    };
  return (
    <section className={s["pk-riders__container"]}>
      <div className={s["pk-riders"]}>
        <h3>Riders:</h3>
        {riders.map((rider) => (
          <Rider
              key={`rider-oder-${rider.orderWanted}`}
              order={getOrderById(rider.orderWanted)}
              pickup={onPickup}
              isExiting={exitingRiders.includes(rider.orderWanted)}
          />
        ))}
      </div>
    </section>
  );
}
