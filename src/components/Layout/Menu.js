import React from "react";
import './Menu.scss'
import {
  AppstoreOutlined,
  DashboardOutlined,
  LogoutOutlined,
  SettingOutlined,
  TeamOutlined,
  FileDoneOutlined,
  IdcardOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import { Menu } from "antd";

const MenuBar = () => {
  const handleLogOut = () => {
    localStorage.removeItem("token");
  };
  return (
    <Menu
      theme="dark"
      mode="inline"
      defaultSelectedKeys={["1"]}
      items={[
        {
          key: "acc",
          icon: <DashboardOutlined />,
          label: "Dashboard",
        },
        {
          key: "mng",
          icon: <AppstoreOutlined />,
          label: "Manager",
          children: [
            {
              key: "mng1",
              icon: <TeamOutlined />,
              label: <Link to="/admin/manager-users">User</Link>,
            },
            {
              key: "mng2",
              icon: <IdcardOutlined />,
              label: <Link to="/admin/manager-authors">Author</Link>,
            },
            {
              key: "mng3",
              icon: <FileDoneOutlined />,
              label: <Link to="/admin/manager-articles">Article</Link>,
            },
          ],
        },
        {
          key: "set",
          icon: <SettingOutlined />,
          label: "Setting",
        },
        {
          key: "out",
          icon: <LogoutOutlined />,
          label: (
            <Link to="/auth/login" onClick={() => handleLogOut()}>
              Logout
            </Link>
          ),
        },
      ]}
    />
  );
};
export default MenuBar;
