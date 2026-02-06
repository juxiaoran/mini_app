import Taro from "@tarojs/taro";

const TOKEN_KEY = "AUTH_TOKEN";

export const setToken = (token: string) => {
  Taro.setStorageSync(TOKEN_KEY, token);
};

export const getToken = (): string | null => {
  return Taro.getStorageSync(TOKEN_KEY) || null;
};

export const removeToken = () => {
  Taro.removeStorageSync(TOKEN_KEY);
};
