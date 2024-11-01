import { useContext } from "react";
import type { StoreContextProps } from "./StoreContext";
import { StoreContext } from "./StoreContext";

export const useStore = (): StoreContextProps => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error("useStore must be used within a StoreProvider.");
  }
  return context;
};
