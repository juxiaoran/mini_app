import { View, Input, Picker } from "@tarojs/components";
import { useLoad } from "@tarojs/taro";
import { useState } from "react";
import FormItem from "@/components/basic-form/form-item";
import BasicPage from "@/components/basic-page";
import "./index.module.scss";
import { post } from "@/service/requst";
import Taro from "@tarojs/taro";
import common from "@/util/common";

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

  const [errors, setErrors] = useState({
    serviceName: "",
    date: "",
    timeSlot: "",
  });

  function validate() {
    const err: any = {};

    if (!serviceName) {
      err.serviceName = "Service name is required";
    }

    if (!date) {
      err.date = "Please select date";
    }

    if (timeSlot < 0) {
      err.timeSlot = "Please select time slot";
    }

    setErrors(err);

    return Object.keys(err).length === 0;
  }

  const handleSubmit = () => {
    if (!validate()) return;

    const appointment: Appointment = {
      serviceName,
      appointDate: date,
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
        <FormItem
          label="Service Name"
          warning={!!errors.serviceName}
          warnMsg={errors.serviceName}
        >
          <Input
            placeholder="please input service name"
            value={serviceName}
            onInput={(e) => {
              setServiceName(e.detail.value);
              if (e.detail.value) {
                errors.serviceName = "";
              }
            }}
          />
        </FormItem>

        <FormItem label="Date" warning={!!errors.date} warnMsg={errors.date}>
          <Picker
            mode="date"
            value={date}
            onChange={(e) => {
              setDate(e.detail.value);
              if (e.detail.value) {
                errors.date = "";
              }
            }}
          >
            <view className={date ? "inputValue" : "placeholder"}>
              {date || "please select date"}
            </view>
          </Picker>
        </FormItem>
        <FormItem
          label="Time Slot"
          warning={!!errors.timeSlot}
          warnMsg={errors.timeSlot}
        >
          <Picker
            mode="selector"
            value={timeSlot === -1 ? undefined : timeSlot}
            range={timeSlots}
            onChange={(e) => {
              var val = Number(e.detail.value);
              setTimeSlot(val);
              if (val >= 0) {
                errors.timeSlot = "";
              }
            }}
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
