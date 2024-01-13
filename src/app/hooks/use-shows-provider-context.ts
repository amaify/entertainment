import { useContext } from "react";
import { MovieContext } from "../providers/show-provider";

export default function useShowsProviderContext() {
  const showsContext = useContext(MovieContext);

  if (!showsContext) {
    throw new Error("useShowsProviderContext must be used within an AppLayout");
  }

  return showsContext;
}
