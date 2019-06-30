import * as API from '@/utils/api'
import { SET_TOKEN } from '../actionTypes'

export function login(params) {
  return async (dispatch) => {
      let res = await API.login(params)
      if (res) {
          let { code, data } = res
          if (code) {
              dispatch({
                  type: SET_TOKEN, data: data
              })
          }
      }
      return res
  }
}