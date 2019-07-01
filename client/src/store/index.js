import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import login from './reducers/login'

const reducers = combineReducers({
  login,
})

const store = createStore(
  reducers,
  applyMiddleware(
    thunkMiddleware,
  ),
)

export default store
