import axios, { AxiosResponse } from "axios";
import FetcherConfig from "./fetcher-config";
import Method from "./method";

export type Fetcher = (url: string) => Promise<AxiosResponse>;

export default function createFetcher(fetcherConfig?: FetcherConfig): Fetcher {
    const { method, config, data } = fetcherConfig || {};

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
