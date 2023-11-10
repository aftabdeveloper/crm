import React from 'react';
import { Button, Form, Input, InputNumber,Slider, message,Spin } from 'antd';
import { useState , useEffect ,useCallback, useRef } from 'react';
import axios from "axios";
import Link from 'next/link';
import {useRouter} from "next/router"
const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};

/* eslint-disable no-template-curly-in-string */
/* eslint-enable no-template-curly-in-string */


const Signup = ()=>{
  
const [form] = Form.useForm();
const[loading,setLoading] = useState(false)
const router = useRouter()
const http = axios.create({
  withCredentials: true
})
const onFinish = async (values) => {
  try
  {
   setLoading(!loading)
   await axios.post("/api/auth/signup",values)
   message.success("Registration success!")
   router.push("/admin")
  }
  catch(err)
  {
    message.error("Registration Failed try again!")
  }
  finally{
    form.resetFields();
    setLoading(!loading)
  }

};


  return(
   <div className='mx-auto my-8 w-[500px] border p-9 flex flex-col items-center rounded-md shadow'>
     <h1 className='text-3xl font-bold mb-8 text-green-600 '> Signup</h1>
     <>
   <Form
    
    {...layout}
    name="nest-messages"
    onFinish={onFinish}
    style={{
      maxWidth: 600,
    }}
    form={form}
  >
    <Form.Item
      name="companyName"
      label="Company name"
      rules={[
        {
          required: true,
        },
      ]}
    >
      <Input />
    </Form.Item>
    <Form.Item
      name="founder"
      label="Founder"
      rules={[
        {
          required: true,
        },
      ]}
    >
      <Input />
    </Form.Item>

    <Form.Item
      name="mobile"
      label="Mobile no"
      rules={[
        {
          required: true
        },
      ]}
    >
      <InputNumber  className='w-full' />
    </Form.Item>


    <Form.Item
      name="email"
      label="Email"
      rules={[
        {
          type: 'email',
          required : true
        },
      ]}
    >
      <Input />
    </Form.Item>

    <Form.Item
      name="password"
      label="Password"
      rules={[
        {
          type : 'password',
          required: true,
        },
      ]}
    >
      <div className='flex gap-x-2 '>
      <Input.Password/>
      </div>
      </Form.Item>
    <Form.Item
      name="gst"
      label="Gst no"
      rules={[
        {
          type : 'text'
        },
      ]}
    >
      <Input />
    </Form.Item>

    <Form.Item
      wrapperCol={{
        ...layout.wrapperCol,
        offset: 8,
      }}
    >
      <Button loading={loading} className='bg-red-600 text-white hover:text-black ml-14 hover:bg-slate-50' htmlType="submit">
        Signup
      </Button>
    </Form.Item>
  </Form>
  </>
  <div className='flex items-center gap-4'> <h1>Already have an account try to </h1> <Link href="/login"> <button className='text-xs text-sky-500'> Login </button></Link> </div>
</div>
)};
export default Signup;
