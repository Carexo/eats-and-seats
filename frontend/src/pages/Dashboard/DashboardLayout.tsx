import React from 'react';
import { SettingOutlined, UserOutlined, CloudUploadOutlined, ProductOutlined, UnorderedListOutlined } from '@ant-design/icons';
import { Layout, Menu, theme } from 'antd';
import {Link, Outlet} from "react-router";

const { Content, Footer, Sider } = Layout;

const items = [
    { key: '1', icon: <SettingOutlined />, label: <Link to="/admin/account">Manage Your Account</Link> },
    { key: '2', icon: <ProductOutlined />, label: <Link to="/admin/dishes">Overview Dishes</Link> },
    { key: '3', icon: <CloudUploadOutlined />, label: <Link to="/admin/add-dish">Add Dish</Link> },
    { key: '4', icon: <UnorderedListOutlined />, label: <Link to="/admin/orders">Overview Orders</Link> },
    { key: '5', icon: <UserOutlined />, label: <Link to="/admin/users">Overview Users</Link> },
];

const DashboardLayout: React.FC = () => {
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    return (
        <Layout style={{minHeight: '100vh'}}>
            <Sider
                breakpoint="lg"
                collapsedWidth="0"
                onBreakpoint={(broken) => {
                    console.log(broken);
                }}
                onCollapse={(collapsed, type) => {
                    console.log(collapsed, type);
                }}
            >
                <div className="demo-logo-vertical" />
                <Menu theme="dark" mode="inline" defaultSelectedKeys={['2']} items={items} />
            </Sider>
            <Layout>
                {/*<Header style={{ padding: 0, background: colorBgContainer }} />*/}
                <Content style={{ margin: '24px 16px 0', minHeight: '100%' }}>
                    <div
                        style={{
                            padding: 24,
                            background: colorBgContainer,
                            borderRadius: borderRadiusLG,
                        }}
                    >
                        <Outlet />
                    </div>
                </Content>
                <Footer style={{ textAlign: 'center' }}>
                    eats&seats ©{new Date().getFullYear()}
                </Footer>
            </Layout>
        </Layout>
    );
};

export default DashboardLayout;