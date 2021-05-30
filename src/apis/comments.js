import { apiHelper } from '../utils/helpers'

export default {
  creatComments({ restaurantId, text }) {
    return apiHelper.post(`/comments`, { restaurantId, text },)
  },
  deleteComments(id) {
    return apiHelper.delete(`/comments/${id}`,)
  }
}