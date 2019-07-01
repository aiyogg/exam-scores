import state from '../state/login'
import { SET_TOKEN } from '../actionTypes';

const initState = state

const login = (state = initState, { type, data }) => {
    switch (type) {
        case SET_TOKEN:
            let { ticket } = data
            localStorage.setItem('token', ticket)
            return Object.assign({}, state, {token: ticket})
    }
}
