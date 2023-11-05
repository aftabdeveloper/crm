import React, { useState } from 'react';
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
  NotificationOutlined
  
} from '@ant-design/icons';
import { Layout, Menu, Button, theme ,Badge } from 'antd';
import Link from 'next/link';
const { Header, Sider, Content } = Layout;
const Admin = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
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
      <div className='flex '>
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
          <h1> Dashboard</h1>
      </div>

      <div className='mr-10'>
      <Badge size="small" count={5} >
      <MessageOutlined />
      </Badge>
      <i className='bx bx-cog ml-4 mr-4 text-xl' ></i>
      <Badge size="small" count={1} >
      <NotificationOutlined />
      </Badge>
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
