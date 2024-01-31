"use client";

import { useQuery } from "@tanstack/react-query";

interface Props<T> {
  queryKey: string[];
  queryFn: () => Promise<T>;
}

export default function useCustomQuery<T extends any>({ queryFn, queryKey }: Props<T>) {
  const { data, isLoading, error } = useQuery({
    queryKey,
    queryFn
  });

  return {
    data,
    isLoading,
    error
  };
}
