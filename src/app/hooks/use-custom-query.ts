import { useQuery } from "@tanstack/react-query";

interface Props<T> {
    queryKey: Array<string>;
    queryFn: () => Promise<T>;
    enabled?: boolean;
}

export default function useCustomQuery<T>({ queryFn, queryKey, enabled }: Props<T>) {
    return useQuery({
        queryKey,
        queryFn,
        enabled,
        retry: 1,
    });
}
