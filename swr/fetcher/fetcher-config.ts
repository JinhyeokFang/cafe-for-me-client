import { AxiosRequestConfig } from "axios";
import Method from "./method";

export default interface FetcherConfig {
    method?: Method;
    config?: AxiosRequestConfig<any>;
    data?: any;
}
