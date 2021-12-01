import axios, { AxiosRequestConfig } from "axios";

interface Request {
  method?: AxiosRequestConfig['method'];
  url: string;
  params?: Record<string, string | number>;
  data?: string | Record<string, string | number>;
}

export const createRequest = ({ method = 'POST', url, params, data }: Request) => axios({
  url,
  method,
  params,
  data,
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
    "X-Requested-With": "XMLHttpRequest",
    "Host": "registrar.nu.edu.kz",
    "Origin": "https://registrar.nu.edu.kz",
    "Referer": "https://registrar.nu.edu.kz/course-catalog",
    'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64; rv:63.0) Gecko/20100101 Firefox/63.0',
    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
    "Accept-Language": "en-US,en;q=0.5",
    "Accept-Encoding": "gzip, deflate",
    "DNT": "1", "Connection": "close", "Upgrade-Insecure-Requests": "1"
  }
});
