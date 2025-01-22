import React, { useEffect } from 'react';
import {
  SettingOutlined,
  UserOutlined,
  CloudUploadOutlined,
  ProductOutlined,
  UnorderedListOutlined,
  FormOutlined,
} from '@ant-design/icons';
import { Layout, Menu, Spin, theme } from 'antd';
import { Link, Outlet } from 'react-router';
import '../../styles/DashboardLayout.css';
import { useActions, useAuth } from '../../store/hooks.ts';
import { useCheckLoggedStatus } from '../../api/queries/auth.ts';

const { Content, Footer, Sider } = Layout;

const items = [
  {
    key: '1',
    icon: <SettingOutlined />,
    label: <Link to="/admin/account">Manage Your Account</Link>,
  },
  {
    key: '2',
    icon: <ProductOutlined />,
    label: <Link to="/admin/dishes">Overview Dishes</Link>,
  },
  {
    key: '3',
    icon: <CloudUploadOutlined />,
    label: <Link to="/admin/add-dish">Add Dish</Link>,
  },
  {
    key: '4',
    icon: <UnorderedListOutlined />,
    label: <Link to="/admin/orders">Overview Orders</Link>,
  },
  {
    key: '5',
    icon: <UserOutlined />,
    label: <Link to="/admin/users">Overview Users</Link>,
  },
  {
    key: '6',
    icon: <FormOutlined />,
    label: <Link to="/admin/opinions">Manage opinions</Link>,
  },
];

const DashboardLayout: React.FC = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const { loginUser } = useActions();
  const userStatusMutation = useCheckLoggedStatus(loginUser);

  const auth = useAuth();

  useEffect(() => {
    userStatusMutation.mutate();
    // eslint-disable-next-line
  }, []);

  if (userStatusMutation.isPending) {
    return <Spin />;
  }

  if (auth.role !== 'admin') {
    return <div>Access Denied</div>;
  }

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider
        breakpoint="lg"
        collapsedWidth="50"
        style={{ position: 'fixed', height: '100%' }}
      >
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['2']}
          items={items}
        />
      </Sider>
      <Layout>
        {/*<Header style={{ padding: 0, background: colorBgContainer }} />*/}
        <Content className="content" style={{ minHeight: '100%' }}>
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
        <Footer className="content" style={{ textAlign: 'center' }}>
          eats&seats ©{new Date().getFullYear()}
        </Footer>
      </Layout>
    </Layout>
  );
};

export default DashboardLayout;
