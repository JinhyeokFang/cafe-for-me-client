import useSWR from "swr"
import fetcher from "../fetcher"

export default function useLocation(keyword: string) {
    const { data, error } = useSWR(`/api/location/${keyword}`, fetcher());

    return {
      data,
      isLoading: !error && !data,
      error,
    };
}