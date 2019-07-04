import state from '../state/login'
import { SET_TOKEN, DELETE_TOKEN } from '../actionTypes';

const initState = state

const login = (prevState = initState, { type, data }) => {
    switch (type) {
        case SET_TOKEN:
            // eslint-disable-next-line no-case-declarations
            const { ticket } = data
            localStorage.setItem('token', ticket)
            return {...prevState, ...{token: ticket}}
        case DELETE_TOKEN:
            localStorage.removeItem('token')
            return {token: null}
        default:
          return prevState
    }
}

export default login
