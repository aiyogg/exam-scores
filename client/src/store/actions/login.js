import { Toast } from 'antd-mobile'
import * as API from '@/utils/api'
import { SET_TOKEN } from '../actionTypes'

export function login(params) {
  return async (dispatch) => {
      const res = await API.login(params)
      console.log(res)
      if (res) {
          const { code, data } = res
          if (code === 0) {
              dispatch({
                  type: SET_TOKEN, data
              })
          } else {
            Toast.fail(res.msg || '响应失败，请稍后重试', 1)
          }
      }
      return res
  }
}
