import { apiHelper } from '../utils/helpers'
const getToken = () => localStorage.getItem('token')

export default {
  getUserTop() {
    return apiHelper.get(`users/top`, {
      headers: { Authorization: `Bearer ${getToken()}` }
    })
  }
}