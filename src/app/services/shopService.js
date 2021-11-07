import { axiosClient } from '../../setup'

const shopUrl = '/Shop/'

const shopService = {
  async getInfoById(shopId) {
    const response = await axiosClient.get(`${shopUrl}${shopId}`)
    // return {
    //   ...response,
    //   userId: shopId
    // }
    return response
  }
}

export default shopService
