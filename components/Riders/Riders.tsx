import s from "./Riders.module.scss";
import Rider from "@/bases/Rider";
import { useRiders } from "@/contexts/Riders.context";

export default function Riders() {
    // Handle pickup exposed to riders
  const { riders, handlePickup } = useRiders();
  return (
    <section className={s["pk-riders__container"]}>
      <div className={s["pk-riders"]}>
        <h3>Riders:</h3>
        {riders.map((rider) => (
          <Rider
              key={`rider-oder-${rider.orderWanted}`}
              orderWanted={rider.orderWanted}
              pickup={handlePickup}
          />
        ))}
      </div>
    </section>
  );
}
