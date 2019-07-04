import * as React from 'react'
import { createForm, formShape } from 'rc-form'
import { List, InputItem, Button, WhiteSpace, WingBlank, Toast } from 'antd-mobile'
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

  onSubmit = () => {
    const { dispatchLogin } = this.props

    this.props.form.validateFields((error, value) => {
      if (!error) {
        let { username, password } = value
        username = username.replace(/\s/g, '')
        password = password.trim()
        dispatchLogin({ username, password })
      }
    });
  }

  validatePhone = (rule, value, callback) => {
    if (value && value.replace(/\s/g, '').length === 11) {
      callback();
    } else {
      callback(new Error('请输入有效的手机号码'));
    }
  }

  render() {
    const { getFieldProps, getFieldError } = this.props.form
    return (
      <div>
        <WhiteSpace size="xl" />
        <List
          renderHeader={() => (<h2>用户登录</h2>)}
          renderFooter={() => getFieldError('phone')}
        >
          <InputItem
            {...getFieldProps('username', {
              rules: [
                { required: true, message: '请输入手机号' },
                { validator: this.validatePhone },
              ]
            })}
            type="phone"
            placeholder="请输入手机号"
            error={!!getFieldError('username')}
            onErrorClick={() => {
              Toast.fail(getFieldError('username').join(','))
            }}
          >
            用户名
          </InputItem>
          <InputItem
            type="password"
            {...getFieldProps('password', {
              rules: [
                { required: true, message: '请输入密码' },
              ]
            })}
            placeholder="请输入密码"
            error={!!getFieldError('password')}
            onErrorClick={() => {
              Toast.fail(getFieldError('password').join(','))
            }}
          >
            密码
          </InputItem>
        </List>
        <WhiteSpace />
        <WingBlank>
          <Button type="primary" onClick={this.onSubmit}>登录</Button>
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
