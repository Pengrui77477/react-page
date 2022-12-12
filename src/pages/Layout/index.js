import React, { useState,useEffect } from "react";
import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
} from "@ant-design/icons";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { Layout, Menu, Popconfirm } from "antd";
import "./index.scss";
import RootStore from '@/store'
// import { observer } from 'mobx-react-lite'
const { Header, Content, Footer, Sider } = Layout;
function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}
const items = [
  getItem("数据概览", "/", <PieChartOutlined />),
  getItem("内容管理", "/article", <DesktopOutlined />),
  getItem("发布文章", "/public", <FileOutlined />),
];
function Index() {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { userStore,loginStore } = new RootStore();

  useEffect(()=>{
    userStore.getUserInfo();
  },[userStore])
  const onConfirm = ()=>{
    loginStore.logout();
    navigate('/login')
  }
  return (
    <Layout
      style={{
        minHeight: "100vh",
      }}
    >
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div className="logo" />
        <Menu
          theme="dark"
          defaultSelectedKeys={[pathname]}
          mode="inline"
          items={items}
          onClick={(e) => navigate(e.key, { replace: true })}
        />
      </Sider>
      <Layout className="site-layout">
        <Header
          className="site-layout-background"
          style={{
            padding: 0,
          }}
        >
          <div className="user-info">
            <span className="user-name">{userStore.userInfo}</span>
            <span className="user-logout">
              <Popconfirm
              onConfirm={onConfirm}
                title="是否确认退出？"
                okText="退出"
                cancelText="取消"
              >
                {/* <LogoutOutlined>退出</LogoutOutlined> */}
                <span>退出</span>
              </Popconfirm>
            </span>
          </div>
        </Header>
        <Content
          style={{
            margin: "0 16px",
          }}
        >
          <div
            className="site-layout-background"
            style={{
              padding: 24,
              minHeight: 360,
            }}
          >
            <Outlet />
          </div>
        </Content>
        <Footer
          style={{
            textAlign: "center",
          }}
        >
          Ant Design ©2018 Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
}

export default Index;
