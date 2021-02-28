import { apiHelper } from '../utils/helpers'

export default {
  signUp({
    name, email, password, passwordCheck
  }) {
    return apiHelper.post('/signup', {
      name, email, password, passwordCheck
    })
  }
}