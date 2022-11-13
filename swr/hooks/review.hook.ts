import useSWR from "swr"
import createFetcher, { Fetcher } from "../fetcher"

export enum ReviewAPIQueryType {
  CafeId,
  ReviewId,
  UserId
}

export default function useReview(queryType: ReviewAPIQueryType, query?: string, fetcher?: Fetcher<any>) {
  let url: string;
  switch (queryType) {
    case ReviewAPIQueryType.CafeId:
      url = `/api/review/${query}`;
      break;
    case ReviewAPIQueryType.UserId:
      url = `/api/review/`;
      break;
    case ReviewAPIQueryType.ReviewId:
    default:
      url = `/api/review/${query}`;
      break;
  }
  const { data, error } = useSWR(url, fetcher || createFetcher());

  return {
    data,
    isLoading: !error && !data,
    error,
  };
}