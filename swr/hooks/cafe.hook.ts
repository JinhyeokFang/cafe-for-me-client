import useSWR from "swr"
import fetcher from "../fetcher"

export default function useCafe(name: string) {
    const { data, error } = useSWR(`https://server.jinhy.uk/cafe/${name}`, fetcher());

    return {
      data,
      isLoading: !error && !data,
      error,
    };
}