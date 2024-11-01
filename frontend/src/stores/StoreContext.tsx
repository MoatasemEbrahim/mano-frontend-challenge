import { createContext } from "react";
import { authStore, AuthStore } from "./AuthStore";

export interface StoreContextProps {
  authStore: AuthStore;
}

export const StoreContext = createContext<StoreContextProps | null>(null);

export const StoreProvider = ({ children }) => (
  <StoreContext.Provider value={{ authStore }}>
    {children}
  </StoreContext.Provider>
);


