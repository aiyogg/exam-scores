import state from '../state/login'
import { SET_TOKEN } from '../actionTypes';

const initState = state

const login = (prevState = initState, { type, data }) => {
    switch (type) {
        case SET_TOKEN:
            // eslint-disable-next-line no-case-declarations
            const { ticket } = data
            localStorage.setItem('token', ticket)
            return {...prevState, ...{token: ticket}}
        default:
          return prevState
    }
}

export default login
