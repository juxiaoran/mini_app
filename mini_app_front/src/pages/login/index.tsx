import FormItem from "@/components/basic-form/form-item";
import BasicPage from "@/components/basic-page";
import { Input, View } from "@tarojs/components";
import "./index.module.scss";
import Taro from "@tarojs/taro";
import { useState } from "react";
import { post } from "@/service/requst";
import { setToken } from "@/util/auth";

export default function Index() {
  const [telephone, setTelephone] = useState("");
  const [verificationCode, setVerificationCode] = useState("");

  const login = () => {
    post({
      url: "/api/v1/auth/login",
      data: {
        telephone,
        verificationCode,
      },
    }).then((resp) => {
      setToken(resp.token);
      Taro.navigateBack();
    });
  };

  return (
    <BasicPage
      footer={
        <View className="footer-container">
          <View className="submit-btn flex-center flex-1" onClick={login}>
            Login
          </View>
        </View>
      }
      footerProps={{ height: 64, backgroundColor: "#fff" }}
    >
      <View className="index">
        <FormItem label="Telephone">
          <Input
            placeholder="please input username"
            value={telephone}
            onInput={(e) => setTelephone(e.detail.value)}
          />
        </FormItem>
        <FormItem label="Verification Code">
          <Input
            placeholder="please input verification code"
            value={verificationCode}
            onInput={(e) => setVerificationCode(e.detail.value)}
          />
        </FormItem>
      </View>
    </BasicPage>
  );
}
