import * as React from 'react'
import { withRouter, Route, Redirect } from 'react-router-dom'
import Loadable from 'react-loadable'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

const LoadableLogin = Loadable({
  loader: () => import('@/views/login'),
  loading: () => null
})
const LoadableExamList = Loadable({
  loader: () => import('@/views/examList'),
  loading: () => null
})
const LoadableExamDetail = Loadable({
  loader: () => import('@/views/examDetail'),
  loading: () => null
})

class APP extends React.PureComponent {
  static propTypes = {
    token: PropTypes.string
  }

  static defaultProps = {
    token: ''
  }

  render() {
    const isLogin = !!this.props.token

    return (
      <React.Fragment>
        <Route exact path="/" render={() => (isLogin ? <Redirect to="/exam/list" /> : <Redirect to="/login" />)} />
        <Route path="/login" component={LoadableLogin} />
        <Route path="/exam/list" component={LoadableExamList} />
        <Route path="/exam/detail/:examid" component={LoadableExamDetail} />
        <Route exact path="/exam" render={() => <Redirect to="/exam/list" />} />
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
