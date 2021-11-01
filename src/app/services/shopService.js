import { axiosClient } from '../../setup'

const shopUrl = '/Shop/'

const shopService = {
  async getInfoById(shopId) {
    return await axiosClient.get(`${shopUrl}${shopId}`)
  }
}

export default shopService
