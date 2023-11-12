import React, { useState, useEffect} from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  UsergroupAddOutlined,
  VideoCameraOutlined,
  BarChartOutlined,
  DashboardOutlined,
  MessageOutlined,
  NotificationOutlined,
  LogoutOutlined
} from '@ant-design/icons';
import axios from 'axios';
import Cookies from 'universal-cookie';
import { Layout, Menu, Button, theme ,Badge, message } from 'antd';
import { useRouter } from 'next/router';
import Link from 'next/link';
const { Header, Sider, Content } = Layout;
const cookie = new Cookies()

const Admin = ({ children }) => {
  const[session,setSession] = useState(null)
  const router = useRouter()
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  useEffect(()=>{
    const user = cookie.get("session")
    setSession(user)
  },[])
  const logout = async ()=>{
    try
    {
      await axios.post("/api/auth/logout")  
      cookie.remove('session') 
      router.push("/login")   
    }
    catch(err)
    {
      message.error("Unable to logout please try again after some time")
    }
  }
  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed} className='h-screen'>
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['1']}
          items={[
            {
              key: '1',
              icon: <DashboardOutlined />,
              label: 'Dashboard',
            },
            {
              key: '2',
              icon: <UsergroupAddOutlined />,
              label: <Link href='/admin/customer'>Customers </Link>,
            },
        
            {
              key: '3',
              icon: <BarChartOutlined />,
              label: 'Chart',
            },
          ]}
       
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
          className='flex justify-between p-20'
        >
      <div className='flex align-items'>
      <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
            }}
          />
          <h1 className='text-lg font-semibold capitalize'> {session && session.founder}</h1>
      </div>

      <div className='mr-10'>
        <Button icon={<LogoutOutlined />} type="text" onClick={logout}/>
      </div>
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
          }}
        >
        <div>{children} </div> 
        </Content>
      </Layout>
    </Layout>
  );
};
export default Admin;
