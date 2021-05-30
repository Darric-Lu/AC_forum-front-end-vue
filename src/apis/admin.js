import { apiHelper } from '../utils/helpers'

export default {
  categories: {
    get() {
      return apiHelper.get(`admin/categories`)
    },
    create(name) {
      return apiHelper.post(`admin/categories`, { name })
    },
    update({ id, name }) {
      return apiHelper.put(`admin/categories/${id}`, { name })
    },
    delete(id) {
      return apiHelper.delete(`/admin/categories/${id}`)
    },
  },
  restaurant: {
    getDetail({ restaurantId }) {
      return apiHelper.get(`/admin/restaurants/${restaurantId}`)
    },
    create({ formData }) {
      return apiHelper.post(`/admin/restaurants`, formData)
    },
    get() {
      return apiHelper.get(`/admin/restaurants`)
    },
    delete(restaurantId) {
      return apiHelper.delete(`/admin/restaurants/${restaurantId}`)
    },
    update({ restaurantId, formData }) {
      return apiHelper.put(`/admin/restaurants/${restaurantId}`, formData)
    }
  },
  user: {
    get() {
      return apiHelper.get(`/admin/users`)
    },
    update({ userId, authority }) {
      return apiHelper.put(`/admin/users/${userId}`, authority, {
        headers: {
          'Content-Type': 'application/json;charset=UTF-8'
        }
      })
    }
  }
}