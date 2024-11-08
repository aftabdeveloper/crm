import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, message } from 'antd';
import { useRouter } from 'next/router';
import Link from 'next/link';
import axios from "axios";
import { useState } from 'react';
const http = axios.create({
  withCredentials: true
})

const Login = () => {
  const[loading,setLoading] = useState(false)
  const router = useRouter();

const onFinish = async (values) => {
try
{
  setLoading(!loading)
  await axios.post("/api/auth/login",values)
  router.push('/admin');
}
catch(err)
{
  message.error(err.message)
}
finally
{
  setLoading(!loading)
}
};
  return (
    <div className='w-96 mx-auto my-16 border shadow-md rounded-md p-9'>
    <Form
      name="normal_login"
      className="login-form"
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
    >
      <Form.Item
        name="email"
        rules={[
          {
            required: true,
            message: 'Please input your Username!',
          },
        ]}
      >
        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[
          {
            required: true,
            message: 'Please input your Password!',
          },
        ]}
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Password"
        />
      </Form.Item>
      <Form.Item>
        <Form.Item name="remember" valuePropName="checked" noStyle>
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <a className="login-form-forgot" href="">
          Forgot password
        </a>
      </Form.Item>

      <Form.Item>
        <Button loading={loading} htmlType="submit" className="login-form-button hover:bg-white bg-orange-400">
          Log in
        </Button>
        Or <Link href="/signup">register now!</Link>
      </Form.Item>
    </Form>
    </div>
  );
};
export default Login;
