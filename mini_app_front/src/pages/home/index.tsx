import { View, Button } from '@tarojs/components'
import { useLoad } from '@tarojs/taro'
import './index.scss'
import Taro from '@tarojs/taro'

export default function Index () {
  useLoad(() => {
    console.log('Page loaded.')
  })

  
  const goToAppointment = () => {
    Taro.navigateTo({
      url: '/pages/appointment/index',
    })
  }

  return (
    <View className='page'>
      <Button type='primary' onClick={goToAppointment}>Go to appointment</Button>
    </View>
  )
}
