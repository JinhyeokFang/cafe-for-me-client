import axios, { AxiosResponse } from "axios";
import { FetcherResponse } from "swr/dist/types";
import { useAuth } from "../../auth.context";
import FetcherConfig from "./fetcher-config";
import Method from "./method";

export type Fetcher<T> = (url: string) => FetcherResponse<T>;

export default function createFetcher<T>(fetcherConfig?: FetcherConfig): Fetcher<T> {
    const { method, token, data } = fetcherConfig || {};
    const config = { 
        headers: { 
            Authorization: token 
        } 
    };

    switch (method) {
        case Method.Post:
            return (url: string) => axios.post(url, data, config).then(response => response.data);
        case Method.Put:
            return (url: string) => axios.put(url, data, config).then(response => response.data);
        case Method.Patch:
            return (url: string) => axios.patch(url, data, config).then(response => response.data);
        case Method.Delete:
            return (url: string) => axios.delete(url, config).then(response => response.data);
        default:
            return (url: string) => axios.get(url, config).then(response => response.data);
    }
}
