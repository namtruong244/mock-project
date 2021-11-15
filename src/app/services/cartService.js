import { axiosClient } from '../../setup'

const cartUrl = '/Cart'

export const cartService = {
  async createCart(cartInfo) {
    return await axiosClient.post(`${cartUrl}/create`, cartInfo)
  },
  async addItem(cartItem) {
    return await axiosClient.post(`${cartUrl}/add/item`, cartItem)
  },
  async removeItem(cartItem) {
    return await axiosClient.post(`${cartUrl}/remove/item`, cartItem)
  },
  async submitCart(cartInfo) {
    return await axiosClient.post(`${cartUrl}/submit`, cartInfo)
  },
  async unSubmitCart(cartInfo) {
    return await axiosClient.post(`${cartUrl}/unsubmit`, cartInfo)
  },
  async getExistCart(cartInfo) {
    return await axiosClient.post(`${cartUrl}/exist/shop/customer`, cartInfo)
  },
}
