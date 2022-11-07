import useSWR from "swr"
import createFetcher, { Fetcher } from "../fetcher";
import fetcher from "../fetcher"

export enum CafeAPIQueryType {
  CafeName,
  CafeId,
  UserId,
  Address
}

export default function useCafe(query: string, queryType?: CafeAPIQueryType, fetcher?: Fetcher) {
  let url = `/api/cafe/${query}`;
  switch (queryType) {
    case CafeAPIQueryType.CafeName:

      break;
    case CafeAPIQueryType.CafeId:

      break;
    case CafeAPIQueryType.UserId:

      break;
    case CafeAPIQueryType.Address:

      break;
  }
  const { data, error } = useSWR(url, fetcher || createFetcher());

  return {
    data,
    isLoading: !error && !data,
    error,
  };
}