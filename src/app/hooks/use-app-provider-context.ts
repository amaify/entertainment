import { useContext } from "react";
import { AppContext } from "../providers/app-provider";

export function useAppProviderContext() {
  const appProvider = useContext(AppContext);

  if (!appProvider) {
    throw new Error("useAppProviderContext must be used within an AppProvider");
  }

  return appProvider;
}
