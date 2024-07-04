"use client";

import { useQuery } from "@tanstack/react-query";

interface Props<T> {
  queryKey: Array<string>;
  queryFn: () => Promise<T>;
  enabled?: boolean;
}

export default function useCustomQuery<T extends any>({ queryFn, queryKey, enabled }: Props<T>) {
  const { data, isLoading, error } = useQuery({
    queryKey,
    queryFn,
    enabled,
    retry: 1
  });

  return {
    data,
    isLoading,
    error
  };
}
