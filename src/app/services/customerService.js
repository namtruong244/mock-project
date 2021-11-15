import { axiosClient } from '../../setup'

const customerUrl = '/Customer'

const customerService = {
  async getInfoByPhoneNumber(phoneNumber) {
    return await axiosClient.post(`${customerUrl}/login`, {
      phoneNumber: phoneNumber,
    })
  },
}

export default customerService
