import { Card, Button, Checkbox, Form, Input, message } from "antd";
import { VerifiedOutlined, PhoneOutlined } from "@ant-design/icons";
import "./index.scss";
import logo from "@/assets/logo.jpg";
import RootStore from '@/store'
import { useNavigate } from 'react-router-dom'



function Login() {
  const { loginStore } = new RootStore();
  const navigate = useNavigate();
  // const [messageApi, contextHolder] = message.useMessage();
  const onFinish = (values) => {
    console.log("Success:", values);

    loginStore.getToken({
      mobile: values.username,
      code: values.password
    })
      .then(res => {
        navigate('/', { replace: true })
        message.success('登录成功')
        console.log(res);
      })
      .catch(err => {
        message.error(err.message)
      })

  };
  const onFinishFailed = (err) => {
    console.log(err);
  }

  return (
    <div className="login">
      {/* {contextHolder} */}
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
              prefix={<PhoneOutlined className="site-form-item-icon" />}
              placeholder="Phone"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "请输入验证码",
              },
              {
                len: 6,
                message: "请输入6位验证码",
                validateTrigger: "onBlur",
              },
            ]}
          >
            <Input
              size="large"
              prefix={<VerifiedOutlined className="site-form-item-icon" />}

              placeholder="验证码"
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
