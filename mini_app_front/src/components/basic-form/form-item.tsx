import { ReactNode } from "react";
import { View } from "@tarojs/components";
import "./index.scss";

interface Props {
  label: string;
  children: ReactNode;
  required?: boolean;
  warnMsg?: string;
  warning?: boolean;
}

export default function FormItem({
  label,
  children,
  required,
  warning,
  warnMsg,
}: Props) {
  return (
    <View className="form-item">
      <View className="form-label">
        {required && <text className="required">*</text>}
        {label}
      </View>

      <View className="form-control">{children}</View>
      {warning && <View className="warning">{warnMsg}</View>}
    </View>
  );
}
