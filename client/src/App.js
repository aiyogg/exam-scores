import * as React from 'react'
import { HashRouter, Route } from 'react-router-dom'
import Loadable from 'react-loadable'
import { connect } from 'react-redux'

const LoadableLogin = Loadable({
  loader: () => import('./views/login'),
  loading: () => null
})

class APP extends React.PureComponent {
  render() {
    return (
      <HashRouter>
        <Route path="/login" component={LoadableLogin} />
      </HashRouter>
    )
  }
}

const mapStateToProps = state => {
  const { token } = state.login
  return {
      token
  }
}

export default connect(mapStateToProps)(APP);
