import * as React from 'react'
import { List, InputItem, WhiteSpace } from 'antd-mobile';
import { connect } from 'react-redux'
import { login } from '@/store/actions/login'

class Login extends React.Component {
  state = {
    username: '',
    password: ''
  }

  render() {
    return (
      <div>
        <WhiteSpace />

        <List renderHeader={() => 'Custom title（text / image / empty)'}>
          <InputItem
            value={this.state.username}
            placeholder="no label"
          />
          <InputItem
            value={this.state.password}
            placeholder="title can be icon，image or text"
          >
            <div style={{ backgroundImage: 'url(https://zos.alipayobjects.com/rmsportal/DfkJHaJGgMghpXdqNaKF.png)', backgroundSize: 'cover', height: '22px', width: '22px' }} />
          </InputItem>
        </List>

        <WhiteSpace />
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    token: state.login.token
  }
}

const mapDispatchToProps = (dispatch) =>  ({
  dispatchGetArticleList: params => dispatch(login(params))
})

export default connect(mapStateToProps, mapDispatchToProps)(Login)
