import { axiosClient } from '../../setup'

const itemUrl = '/Item'

export const productService = {
  async createNewProduct(product) {
    return await axiosClient.post(`${itemUrl}/create`, product, { headers: { 'Content-Type': 'multipart/form-data' } })
  },
  async updateProduct(product) {
    return await axiosClient.put(`${itemUrl}`, product, { headers: { 'Content-Type': 'multipart/form-data' } })
  },
  async deleteProduct(product) {
    return await axiosClient.delete(`${itemUrl}`, {data: product})
  }
}
