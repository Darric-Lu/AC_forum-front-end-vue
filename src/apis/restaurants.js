import { apiHelper } from '../utils/helpers'

export default {
  getRestaurants({ page, categoryId }) {
    const searchParams = new URLSearchParams({ page, categoryId })
    return apiHelper.get(`/restaurants?${searchParams.toString()}`)
  },
  getRestaurantsTop() {
    return apiHelper.get(`/restaurants/top`)
  },
  getRestaurant({ restaurantId }) {
    return apiHelper.get(`/restaurants/${restaurantId}`)
  },
  gitRestaurantDashboard(restaurantId) {
    return apiHelper.get(`/restaurants/${restaurantId}/dashboard`)
  }
}