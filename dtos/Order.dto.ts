import { Item } from "./Item.dto";
import {OrderState} from "@/enums/OrderState";

export type Order = {
  id: string;
  state: OrderState;
  items: Array<Item>;
};
