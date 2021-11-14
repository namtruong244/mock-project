import { axiosClient } from '../../setup'
import { shopService } from './shopService'
import { CmnConst } from '../../_kyn/const'

const authService = {
  async login(userData) {
    const url = `/${userData.role}/login`
    try {
      const response = await axiosClient.post(url, userData.user)
      if (response.phoneNumber === null) {
        return new Promise((_, reject) => reject({ response: { data: 'PhoneNumber is invalid' } }))
      }
      let userInfo = {
        role: userData.role,
        phoneNumber: response.phoneNumber,
      }
      if (userData.role === CmnConst.SHOP_ROLE) {
        const shopInfo = await shopService.getInfoById(response.shopId)
        userInfo['userId'] = response.shopId
        userInfo['name'] = shopInfo.name
        userInfo['avatar'] = shopInfo.image
      } else {
        userInfo['userId'] = response.customerId
        userInfo['name'] = response.name
        userInfo['avatar'] = response.avatar
      }
      return new Promise(((resolve, _) => resolve(userInfo)))
    } catch (e) {
      return new Promise((_, reject) => reject(e))
    }

  },
  async register(userData) {
    const url = `/${userData.role}/register`
    return await axiosClient.post(url, userData.user, { headers: { 'Content-Type': 'multipart/form-data' } })
  },
  async updateUserInfo(userData) {
    const url = `/${userData.role}`
    return await axiosClient.put(url, userData.user, { headers: { 'Content-Type': 'multipart/form-data' } })
  },
}

export default authService
