import { createContext } from "react";

export const SpendContext = createContext({
  spends: [],
  countUpdate: { count: 1 },
  getSpendings: () => {},
});
