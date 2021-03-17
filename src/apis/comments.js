import { apiHelper } from '../utils/helpers'
const getToken = () => localStorage.getItem('token')

export default {
  creatComments({ restaurantId, text }) {
    return apiHelper.post(`/comments`, { restaurantId, text }, {
      headers: { Authorization: `Bearer ${getToken()}` }
    })
  },
  deleteComments(id) {
    return apiHelper.delete(`/comments/${id}`, {
      headers: { Authorization: `Bearer ${getToken()}` }
    })
  }
}