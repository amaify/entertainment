import { useContext } from "react";
import { ShowContext } from "src/app/show-provider";

export default function useShowsProviderContext() {
  const showsContext = useContext(ShowContext);

  if (!showsContext) throw new Error("useShowsProviderContext must be used within an AppLayout");

  return showsContext;
}
