import { apiHelper } from '../utils/helpers'
const getToken = () => localStorage.getItem('token')

export default {
  signUp() {
    return apiHelper.post(`/signup`, formData, {
      headers: { Authorization: `Bearer ${getToken()}` }
    })
  }
}