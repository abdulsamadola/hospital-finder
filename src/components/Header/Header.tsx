import React from "react";
import { Layout, Menu } from "antd";
import { Link } from "react-router-dom";

const { Header } = Layout;
interface IProps {
  current: string;
}
function CustomHeader({ current }: IProps) {
  return (
    <Header data-test="HeaderComponent">
      <div className="logo" />
      <Menu
        data-test="menu"
        theme="dark"
        mode="horizontal"
        defaultSelectedKeys={[current]}
      >
        <Menu.Item key="1" data-test="menu-item">
          <Link to="/">Home</Link>
        </Menu.Item>
        <Menu.Item key="2">
          <Link to="/SignIn">Sign In</Link>
        </Menu.Item>
        <Menu.Item key="3">
          <Link to="/SignUp">Sign Up</Link>
        </Menu.Item>
      </Menu>
    </Header>
  );
}

export default CustomHeader;
