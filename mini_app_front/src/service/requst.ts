import Taro from "@tarojs/taro";
import { getToken } from "@/util/auth";

interface AppBaseResp<T> {
  code: number;
  message: string;
  data?: T;
}

interface RequestOptions<T = any> extends Omit<Taro.request.Option, "url"> {
  url: string;
  data?: any;
  method?: "GET" | "POST" | "PUT" | "DELETE";
  token?: string;
  handleSuc?: (res: AppBaseResp<any>) => void;
  handleFail?: (res: AppBaseResp<any>) => void;
}

interface ResponseWrapper<T> {
  code: number;
  message: string;
  data: T;
}

export async function request<T = any>(options: RequestOptions<T>): Promise<T> {
  const { url, data, method = "GET" } = options;
  const token = getToken();
  const baseUrl = process.env.TARO_APP_BASE_URL ;

  try {
    const res = await Taro.request<ResponseWrapper<T>>({
      url: baseUrl + url,
      method,
      data,
      header: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `${token}` } : {}),
      },
    });

    if (res.data.code === 401) {
      Taro.navigateTo({
        url: "/pages/login/index",
      });

      Taro.showToast({
        title: "You need to login first",
        icon: "none",
      });
      return res.data.data;
    }

    if (res.data?.code !== 200) {
      Taro.showToast({
        title: res.data?.message || "Request failed",
        icon: "none",
      });

      options.handleFail?.(res.data);
    } else {
      options.handleSuc?.(res.data);
    }
    return res.data.data;
  } catch (err) {
    console.error("Request error:", err);
    throw err;
  }
}

export async function get<T = any>(options: RequestOptions<T>): Promise<T> {
  return request({ ...options, method: "GET" });
}

export async function deleteRequest<T = any>(
  options: RequestOptions<T>,
): Promise<T> {
  return request({ ...options, method: "DELETE" });
}

export async function put<T = any>(options: RequestOptions<T>): Promise<T> {
  return request({ ...options, method: "PUT" });
}

export async function post<T = any>(options: RequestOptions<T>): Promise<T> {
  return request({ ...options, method: "POST" });
}
