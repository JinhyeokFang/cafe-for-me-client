import useSWR from "swr"
import createFetcher from "../fetcher";
import { Fetcher } from "../fetcher"

type Location = { 
  location: { 
    name: string, 
    address: string,
    _id: string,
    latitude: string,
    longitude: string,
  }[] 
};

export default function useLocation(keyword: string, fetcher?: Fetcher<Location>) {
  const { data, error } = useSWR<Location>(`/api/location/${keyword}`, fetcher || createFetcher<Location>());

  return {
    data,
    isLoading: !error && !data,
    error,
  };
}