import { Alert, Checkbox, Icon } from 'antd';
import React, { Component } from 'react';
import Link from 'umi/link';
import { connect } from 'dva';
import LoginComponents from './components/Login';
import styles from './style.less';

const { Tab, UserName, Password, Mobile, Captcha, Submit } = LoginComponents;

@connect(({ login, loading }) => ({
  userLogin: login,
  submitting: loading.effects['login/login'],
}))
class Login extends Component {
  loginForm = undefined;

  state = {
    type: 'account',
    autoLogin: true,
  };

  changeAutoLogin = e => {
    this.setState({
      autoLogin: e.target.checked,
    });
  };

  handleSubmit = (err, values) => {
    const { type } = this.state;

    if (!err) {
      const { dispatch } = this.props;
      dispatch({
        type: 'login/login',
        payload: { ...values, type },
      });
    }
  };

  onTabChange = type => {
    this.setState({
      type,
    });
  };

  onGetCaptcha = () =>
    new Promise((resolve, reject) => {
      if (!this.loginForm) {
        return;
      }

      this.loginForm.validateFields(['mobile'], {}, async (err, values) => {
        if (err) {
          reject(err);
        } else {
          const { dispatch } = this.props;

          try {
            const success = await dispatch({
              type: 'login/getCaptcha',
              payload: values.mobile,
            });
            resolve(!!success);
          } catch (error) {
            reject(error);
          }
        }
      });
    });

  renderMessage = content => (
    <Alert
      style={{
        marginBottom: 24,
      }}
      message={content}
      type="error"
      showIcon
    />
  );

  render() {
    const { userLogin, submitting } = this.props;
    const { status, type: loginType } = userLogin;
    const { type, autoLogin } = this.state;
    return (
      <div className={styles.main}>
        <LoginComponents
          defaultActiveKey={type}
          onTabChange={this.onTabChange}
          onSubmit={this.handleSubmit}
          onCreate={form => {
            this.loginForm = form;
          }}
        >
          <Tab key="account" tab="Credentials">
            {status === 'error' &&
              loginType === 'account' &&
              !submitting &&
              this.renderMessage('Invalid username or password（admin/ant.design）')}
            <UserName
              name="userName"
              placeholder={`${'userName'}: admin or user`}
              rules={[
                {
                  required: true,
                  message: 'Please enter your userName!',
                },
              ]}
            />
            <Password
              name="password"
              placeholder={`${'password'}: ant.design`}
              rules={[
                {
                  required: true,
                  message: 'Please enter your password!',
                },
              ]}
              onPressEnter={e => {
                e.preventDefault();

                if (this.loginForm) {
                  this.loginForm.validateFields(this.handleSubmit);
                }
              }}
            />
          </Tab>
          <Tab key="mobile" tab="Mobile number">
            {status === 'error' &&
              loginType === 'mobile' &&
              !submitting &&
              this.renderMessage('Invalid verification code')}
            <Mobile
              name="mobile"
              placeholder="Phone number"
              rules={[
                {
                  required: true,
                  message: 'Please enter your phone number!',
                },
                {
                  pattern: /^1\d{10}$/,
                  message: 'Malformed phone number!',
                },
              ]}
            />
            <Captcha
              name="captcha"
              placeholder="Verification code"
              countDown={120}
              onGetCaptcha={this.onGetCaptcha}
              getCaptchaButtonText="Get Captcha"
              getCaptchaSecondText="sec"
              rules={[
                {
                  required: true,
                  message: 'Please enter the verification code!',
                },
              ]}
            />
          </Tab>
          <div>
            <Checkbox checked={autoLogin} onChange={this.changeAutoLogin}>
              Remember me
            </Checkbox>
            <a
              style={{
                float: 'right',
              }}
              href=""
            >
              Forgot your password?
            </a>
          </div>
          <Submit loading={submitting}>Login</Submit>
          <div className={styles.other}>
            Sign in with
            <Icon type="alipay-circle" className={styles.icon} theme="outlined" />
            <Icon type="taobao-circle" className={styles.icon} theme="outlined" />
            <Icon type="weibo-circle" className={styles.icon} theme="outlined" />
            <Link className={styles.register} to="/user/register">
              Sign up
            </Link>
          </div>
        </LoginComponents>
      </div>
    );
  }
}

export default Login;
