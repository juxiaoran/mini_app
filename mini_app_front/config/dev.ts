import type { UserConfigExport } from "@tarojs/cli";

export default {
  logger: {
    quiet: false,
    stats: true,
  },
  mini: {},
  h5: {},
  BASE_URL: "http://192.168.1.5:19090",
} satisfies UserConfigExport<"webpack5">;
