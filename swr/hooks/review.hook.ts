import useSWR from "swr"
import createFetcher, { Fetcher } from "../fetcher"

export enum ReviewAPIQueryType {
  CafeId,
  ReviewId,
  UserId
}

export default function useCafe(query: string, queryType?: ReviewAPIQueryType, fetcher?: Fetcher) {
  let url = `/api/review/${query}`;
  switch (queryType) {
    case ReviewAPIQueryType.ReviewId:

      break;
    case ReviewAPIQueryType.CafeId:

      break;
    case ReviewAPIQueryType.UserId:

      break;
  }
  const { data, error } = useSWR(url, fetcher || createFetcher());

  return {
    data,
    isLoading: !error && !data,
    error,
  };
}