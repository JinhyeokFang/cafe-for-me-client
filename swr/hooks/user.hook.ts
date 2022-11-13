import useSWR from "swr"
import createFetcher, { Fetcher } from "../fetcher"

export default function useUser(query: string, fetcher?: Fetcher<any>) {
  let url = `/api/auth/user/${query}`
  const { data, error } = useSWR(url, fetcher || createFetcher());

  return {
    data,
    isLoading: !error && !data,
    error,
  };
}