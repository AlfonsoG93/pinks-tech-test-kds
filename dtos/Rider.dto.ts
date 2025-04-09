
// Refactor Rider DTO rider, only cares for orderID when executing pickup no need to pass Order context to riders
export type Rider = {
  orderWanted: string;
  pickup: (order: string) => void;
};
