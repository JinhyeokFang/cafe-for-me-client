import useSWR from "swr"
import createFetcher from "../fetcher";
import fetcher, { Fetcher } from "../fetcher"

export default function useLocation(keyword: string, fetcher?: Fetcher) {
    const { data, error } = useSWR(`/api/location/${keyword}`, fetcher || createFetcher());

    return {
      data,
      isLoading: !error && !data,
      error,
    };
}