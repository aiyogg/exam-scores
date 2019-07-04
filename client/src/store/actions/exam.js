import { Toast } from 'antd-mobile'
import * as API from '@/utils/api'
import { GET_EXAM_LIST } from '../actionTypes'

export function getExamList (params) {
  return async (dispatch) => {
      const res = await API.getExamList(params)
      if (res) {
          const { code, data } = res
          if (code === 0) {
              dispatch({
                  type: GET_EXAM_LIST, data
              })
          } else {
            Toast.fail(res.msg || '响应失败，请稍后重试', 1)
          }
      }
      return res
  }
}
