import state from '../state/exam'
import { GET_EXAM_LIST } from '../actionTypes';

const initState = state

const login = (prevState = initState, { type, data }) => {
    switch (type) {
        case GET_EXAM_LIST:
            // eslint-disable-next-line no-case-declarations
            const { List } = data
            return {...prevState, ...{examList: List}}
        default:
          return prevState
    }
}

export default login
