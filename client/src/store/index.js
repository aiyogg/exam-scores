import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import login from './reducers/login'
import exam from './reducers/exam'

const reducers = combineReducers({
  login,
  exam
})

const store = createStore(
  reducers,
  applyMiddleware(
    thunkMiddleware,
  ),
)

export default store
