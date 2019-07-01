import * as API from '@/utils/api'
import { SET_TOKEN } from '../actionTypes'

export function login(params) {
  return async (dispatch) => {
      const res = await API.login(params)
      if (res) {
          const { code, data } = res
          if (code) {
              dispatch({
                  type: SET_TOKEN, data
              })
          }
      }
      return res
  }
}
