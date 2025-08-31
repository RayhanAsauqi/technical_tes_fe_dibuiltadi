import { useEffect, useState, useCallback } from "react";
import Cookies from "js-cookie";

type FetchState<T> = {
  data: T | null;
  loading: boolean;
  error: string | null;
};

export function useFetch<T>(url: string, options?: RequestInit) {
  const [state, setState] = useState<FetchState<T>>({
    data: null,
    loading: true,
    error: null,
  });

  const fetchData = useCallback(async () => {
    setState({ data: null, loading: true, error: null });
    try {
      const token = Cookies.get("accessToken");
      const res = await fetch(url, {
        ...options,
        headers: {
          ...(options?.headers || {}),
          Authorization: token ? `Bearer ${token}` : "",
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });
      if (!res.ok) {
        throw new Error(`Error ${res.status}: ${res.statusText}`);
      }

      const json = (await res.json()) as T;
      setState({ data: json, loading: false, error: null });
    } catch (err) {
      const message = err instanceof Error ? err.message : "Unexpected error occurred";
      setState({ data: null, loading: false, error: message });
    }
  }, [url, options]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { ...state, refetch: fetchData };
}
