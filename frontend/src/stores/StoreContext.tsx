import { createContext, useContext } from "react";
import { authStore, AuthStore } from "./AuthStore";

interface StoreContextProps {
  authStore: AuthStore;
}

const StoreContext = createContext<StoreContextProps | null>(null);

export const StoreProvider = ({ children }) => (
  <StoreContext.Provider value={{ authStore }}>
    {children}
  </StoreContext.Provider>
);

export const useStore = (): StoreContextProps => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error("useStore must be used within a StoreProvider.");
  }
  return context;
};
