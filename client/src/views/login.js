import * as React from 'react'
import { createForm, formShape } from 'rc-form'
import { List, InputItem, Button, WhiteSpace, WingBlank } from 'antd-mobile'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { login } from '@/store/actions/login'

class Login extends React.Component {
  static propTypes = {
    // eslint-disable-next-line react/require-default-props
    form: formShape,
    dispatchLogin: PropTypes.func.isRequired
  }

  state = {
    // username: '',
    // password: ''
  }

  submit = () => {
    const { dispatchLogin } = this.props

    this.props.form.validateFields((error, value) => {
      console.log(error, value);
      dispatchLogin(value)
    });
  }

  render() {
    const { getFieldProps } = this.props.form
    return (
      <div>
        <WingBlank>
          <WhiteSpace size="xl" />
          <List renderHeader={() => (<h2>用户登录</h2>)}>
            <InputItem
              {...getFieldProps('phone')}
              type="phone"
              placeholder="请输入手机号"
            >
              用户名
            </InputItem>
            <InputItem
              type="password"
              {...getFieldProps('password')}
              placeholder="请输入密码"
            >
              密码
            </InputItem>
          </List>
          <WhiteSpace />
          <Button type="primary" onClick={this.submit}>登录</Button>
        </WingBlank>
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
  dispatchLogin: params => dispatch(login(params))
})



export default connect(mapStateToProps, mapDispatchToProps)(createForm()(Login))
