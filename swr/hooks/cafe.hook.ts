import useSWR from "swr"
import createFetcher, { Fetcher } from "../fetcher";

export enum CafeAPIQueryType {
  CafeName,
  CafeId,
  UserId,
  Address,
  Location
}

type Cafe = { 
  cafes: CafeData[],
  cafe: CafeData,
};

type CafeData = {
  location: { 
    coordinates: [number, number] 
  }, 
  _id: string, 
  name: string, 
  address: string, 
  images: string[],
  openHour: string,
  openMinute: string,
  closeHour: string,
  closeMinute: string,
  closeDay: string,
  tags: string[], 
}

export default function useCafe(queryType: CafeAPIQueryType, query: string | { latitude: number, longitude: number, maxDistance: number }, fetcher?: Fetcher) {
  let url = `/api/cafe/${query}`; 
  switch (queryType) {
    case CafeAPIQueryType.CafeId:
      url = `/api/cafe/id/${query}`; 
      break;
    case CafeAPIQueryType.UserId:
      url = `/api/cafe/`; 
      break;
    case CafeAPIQueryType.Address:
      url = `/api/cafe/address/${query}`; 
      break;
    case CafeAPIQueryType.Location:
      if (typeof query == 'string')
        break;
      url = `/api/cafe/location/${query.longitude}/${query.latitude}?maxDistance=${query.maxDistance}`; 
      break;
    case CafeAPIQueryType.CafeName:
      url = `/api/cafe/${query}`; 
      break;
  }
  const { data, error } = useSWR<Cafe>(url, fetcher || createFetcher());

  return {
    data,
    isLoading: !error && !data,
    error,
  };
}