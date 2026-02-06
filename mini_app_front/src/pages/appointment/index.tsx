import { View, Input, Picker } from "@tarojs/components";
import { useLoad } from "@tarojs/taro";
import { useState } from "react";
import FormItem from "@/components/basic-form/form-item";
import BasicPage from "@/components/basic-page";
import "./index.module.scss";
import { post } from "@/service/requst";
import Taro from "@tarojs/taro";
import common from "@/util/common";

interface Appointment {
  serviceName: string;
  appointmentDate: string;
  timeSlot: string;
}

export default function Index() {
  useLoad(() => {
    console.log("Page loaded.");
  });

  const timeSlots = [
    "09:00",
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
    "18:00",
    "19:00",
    "20:00",
  ];

  const [serviceName, setServiceName] = useState("");
  const [date, setDate] = useState("");
  const [timeSlot, setTimeSlot] = useState(-1);

  const handleSubmit = () => {
    const appointment: Appointment = {
      serviceName,
      appointmentDate: date,
      timeSlot: timeSlots[timeSlot],
    };

    post({
      url: "/api/v1/appointment/create",
      data: appointment,
      handleSuc: (res) => {
        common.toastAndNavigateBack({
          title: res.message || "Successfully created",
          icon: "none",
        });
      },
      handleFail: (res) => {
        Taro.showToast({
          title: res.message || "Sorry, failed to create appointment",
          icon: "none",
        });
      },
    });
  };

  return (
    <BasicPage
      footer={
        <View className="footer-container">
          <View
            className="submit-btn flex-center flex-1"
            onClick={handleSubmit}
          >
            Submit
          </View>
        </View>
      }
      footerProps={{ height: 64, backgroundColor: "#fff" }}
    >
      <View className="index">
        <FormItem label="Service Name">
          <Input
            placeholder="please input service name"
            value={serviceName}
            onInput={(e) => setServiceName(e.detail.value)}
          />
        </FormItem>

        <FormItem label="Date">
          <Picker
            mode="date"
            value={date}
            onChange={(e) => setDate(e.detail.value)}
          >
            <view className={date ? "inputValue" : "placeholder"}>
              {date || "please select date"}
            </view>
          </Picker>
        </FormItem>
        <FormItem label="Time Slot">
          <Picker
            mode="selector"
            value={timeSlot === -1 ? undefined : timeSlot}
            range={timeSlots}
            onChange={(e) => setTimeSlot(Number(e.detail.value))}
          >
            <View className={timeSlot === -1 ? "placeholder" : "inputValue"}>
              {timeSlot === -1 ? "please select slot" : timeSlots[timeSlot]}
            </View>
          </Picker>
        </FormItem>
      </View>
    </BasicPage>
  );
}
