import Method from "./method";

export default interface FetcherConfig {
    method?: Method;
    token?: string;
    data?: any;
}
