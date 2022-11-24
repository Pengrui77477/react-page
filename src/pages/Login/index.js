import { Card, Button, Checkbox, Form, Input } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import "./index.scss";
import logo from "@/assets/logo.jpg";
import {useStore} from '@/store'

function Login() {
  const {loginStore} = useStore();
  const onFinish = (values) => {
    console.log("Success:", values);
    loginStore.getToken({
      mobile:values.username,
      code:values.password
    })
    
  };
  const onFinishFailed = (err) => {
    console.log(err);
  }

  return (
    <div className="login">
      <Card className="login-container">
        <img className="login-logo" src={logo} alt=""></img>
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{
            remember: true,
          }}
          onFinishFailed={onFinishFailed}
          onFinish={onFinish}
          validateTrigger={["onBlur", "onChange"]}
        >
          <Form.Item
            name="username"
            rules={[
              {
                required: true,
                message: "请输入手机号",
              },
              {
                pattern: /^1[3-9]\d{9}$/,
                message: "请输入正确的手机号",
                validateTrigger: "onBlur",
              },
            ]}
          >
            <Input
              size="large"
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Phone"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "请输入密码",
              },
              {
                len: 6,
                message: "请输入6位密码",
                validateTrigger: "onBlur",
              },
            ]}
          >
            <Input
              size="large"
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>记住密码</Checkbox>
            </Form.Item>

            {/* <a className="login-form-forgot" href="#">
              Forgot password
            </a> */}
          </Form.Item>

          <Form.Item>
            <Button
              size="large"
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              Log in
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}

export default Login;
