import { View, Input, Picker } from '@tarojs/components'
import { useLoad } from '@tarojs/taro'
import './index.scss'
import { useState } from 'react';

interface Appointment {
  serviceName: string;
  date: string;
  timeSlot: string;
}

export default function Index () {
  useLoad(() => {
    console.log('Page loaded.')
  })

  const [serviceName, setServiceName] = useState('')
  const [date, setDate] = useState('')
  const [timeSlot, setTimeSlot] = useState(0) 


  return (
    <View className='index'>
        <Input placeholder='please input service name' value={serviceName} onInput={(e) => setServiceName(e.detail.value)} />
        <Picker mode="date" value={date} onChange={(e) => setDate(e.detail.value)}>
            <View>{date || '选择日期'}</View>
        </Picker>
        <Picker mode="selector" value={timeSlot} range={['09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00']} onChange={(e) => setTimeSlot(e.detail.value as number)}>
          <View>{timeSlot || '选择时间段'}</View>
        </Picker>
    </View>
  )
}
