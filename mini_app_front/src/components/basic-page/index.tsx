import { View } from "@tarojs/components";
import { ReactNode } from "react";
import "./index.module.scss";

interface BasicPageProps {
  children: ReactNode;
  footer: ReactNode;
  footerProps?: {
    height?: number;
    backgroundColor?: string;
  };
}

export default function BasicPage({
  children,
  footer,
  footerProps,
}: BasicPageProps) {
  return (
    <View className={"basic-page"}>
      <View className={"content"}>{children}</View>
      <View
        className={"footer"}
        style={{
          height: footerProps?.height,
          backgroundColor: footerProps?.backgroundColor ?? "#f5f5f5",
        }}
      >
        {footer}
      </View>
    </View>
  );
}
