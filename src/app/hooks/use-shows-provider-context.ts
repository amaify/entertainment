import { useContext } from "react";
import { ShowCategoryContext } from "../(show-category)/layout";

export default function useShowsProviderContext() {
  const showsContext = useContext(ShowCategoryContext);

  if (!showsContext) {
    throw new Error("useShowsProviderContext must be used within an AppLayout");
  }

  return showsContext;
}
