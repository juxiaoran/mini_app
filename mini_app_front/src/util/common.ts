import Taro from "@tarojs/taro";

function toastAndNavigateBack(option: Taro.showToast.Option, duration: number = 1000) {
  option.duration = duration;
  option.mask= true
  Taro.showToast(option);
  setTimeout(() => {
    Taro.navigateBack();
  }, duration);
}

export default { toastAndNavigateBack };