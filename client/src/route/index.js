import * as React from 'react'
import { withRouter, Route } from 'react-router-dom'
import Loadable from 'react-loadable'
import { connect } from 'react-redux'

const LoadableLogin = Loadable({
  loader: () => import('@/views/login'),
  loading: () => null
})

const LoadableExamList = Loadable({
  loader: () => import('@/views/examList'),
  loading: () => null
})

class APP extends React.PureComponent {
  render() {
    return (
      <React.Fragment>
        <Route path="/login" component={LoadableLogin} />
        <Route path="/exam" component={LoadableExamList} />
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => {
  const { token } = state.login
  return {
      token
  }
}

export default withRouter(connect(mapStateToProps)(APP));
