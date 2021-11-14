import { axiosClient } from '../../setup'

const shopUrl = '/Shop'

export const shopService = {
  async getInfoById(shopId) {
    const response = await axiosClient.get(`${shopUrl}/${shopId}`)
    return {
      ...response,
      avatar: response.image
    }
  },
  async getAllShop() {
    return await axiosClient.get(`${shopUrl}/all`)
  }
}
