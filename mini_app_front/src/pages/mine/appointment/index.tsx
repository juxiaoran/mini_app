import { View, Text, ScrollView } from "@tarojs/components";
import { useLoad, usePullDownRefresh, useReachBottom } from "@tarojs/taro";
import "./index.scss";
import { useState } from "react";
import { get } from "@/service/requst";
import Taro from "@tarojs/taro";

export default function Index() {
  useLoad(() => {
    loadData(1, true);
  });

  useReachBottom(() => {
    if (hasMore && !loading) {
      loadData(page + 1);
    }
  });

  usePullDownRefresh(() => {
    setHasMore(true);
    setList([]);
    loadData(1, true);
    Taro.stopPullDownRefresh();
  });

  const [list, setList] = useState<Appointment[]>([]);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(10);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  const loadData = async (pageNo = 1, isRefresh = false) => {
    if (loading) return;
    if (!hasMore && !isRefresh) return;

    setLoading(true);

    try {
      const res = await get({
        url: "/api/v1/appointment/query",
        method: "GET",
        data: {
          page: pageNo,
          pageSize,
        },
      });

      const rows = res.records || [];

      // 是否还有数据
      const more = rows.length === pageSize;

      if (isRefresh) {
        setList(rows);
      } else {
        setList((prev) => [...prev, ...rows]);
      }

      setHasMore(more);
      setPage(pageNo);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="page">
      <ScrollView>
        {list.map((item, index) => (
          <View className="appointment-item" key={index}>
            <Text className="service-name">{item.serviceName}</Text>
            <Text className="appointment-date">{item.appointDate}</Text>
            <Text className="time-slot">{item.timeSlot}</Text>
          </View>
        ))}
        <View className="footer flex-center" style={{
          color: "#999;"
        }}>
          {loading && <Text>loading...</Text>}
          {!hasMore && <Text>no more data</Text>}
        </View>
      </ScrollView>
    </View>
  );
}
