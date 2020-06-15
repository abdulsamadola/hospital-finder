import React, { useCallback, useContext, useState } from "react";
import { Layout, Form, Input, Button, notification, Spin } from "antd";
import { LoginOutlined, LoadingOutlined } from "@ant-design/icons";
import { Link, withRouter, Redirect } from "react-router-dom";
import app from "../../Services/firebase";
import { AuthContext } from "../../routes/Auth";

import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import colors from "../../styles";
const { Content } = Layout;
const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

const SignIn = ({ history }: any) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleLogin = useCallback(
    async (event) => {
      setIsLoading(true);

      const { email, password } = event;
      try {
        await app.auth().signInWithEmailAndPassword(email, password);
        const msg = `Welcome Back, Login successful!`;
        openNotificationWithIcon("success", msg);
        setTimeout(() => {
          return history.push("/Dashboard");
        }, 3000);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        const msg = error.message;
        openNotificationWithIcon("error", msg);
      }
    },
    [history]
  );

  const openNotificationWithIcon = (type: string, msg: any) => {
    if (type == "error") {
      notification.error({
        message: "Sign In Failed",
        description: msg,
      });
    } else {
      notification.success({
        message: "Sign In Successful!",
        description: msg,
      });
    }
  };

  const laayout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };
  const tailLayout = {
    wrapperCol: { offset: 6, span: 4 },
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  const { currentUser } = useContext(AuthContext);

  if (currentUser) {
    return <Redirect to="/Dashboard" />;
  }
  const inputStyle = { borderRadius: 20 };

  return (
    <Layout className="layout">
      <Header current="2" />

      <Content
        style={{
          padding: "0 50px",
          display: "flex",
          height: "100%",
          justifyContent: "center",
        }}
      >
        <div className="site-layout-content">
          <div className="main-left">
            <div style={{ paddingTop: 80 }}>
              <LoginOutlined style={{ fontSize: 100, color: "#cbc3c3" }} />
              <h3
                className="content-title-left"
                style={{ color: colors.white }}
              >
                SignIn into your account
              </h3>
              <p>Start Exploring the nearby health stations.</p>
            </div>
          </div>
          <div className="main-right">
            <div className="content-row">
              <h3 className="content-title">Sign In</h3>
              <div className="form-container">
                <Form
                  {...laayout}
                  layout="vertical"
                  name="basic"
                  initialValues={{ remember: true }}
                  onFinish={handleLogin}
                  onFinishFailed={onFinishFailed}
                >
                  <Form.Item
                    label="Email"
                    name="email"
                    rules={[
                      {
                        required: true,
                        message: "Please input your email!",
                      },
                    ]}
                  >
                    <Input style={inputStyle} autoComplete="off" type="email" />
                  </Form.Item>

                  <Form.Item
                    label="Password"
                    name="password"
                    rules={[
                      {
                        required: true,
                        message: "Please input your password!",
                      },
                    ]}
                  >
                    <Input.Password style={inputStyle} autoComplete="off" />
                  </Form.Item>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    <Form.Item {...tailLayout}>
                      {!isLoading ? (
                        <Button
                          type="primary"
                          style={{
                            backgroundColor: colors.blue,
                            borderRadius: 20,
                            boxShadow: "none",
                            alignSelf: "flex-start",
                            outline: 0,
                          }}
                          size="middle"
                          htmlType="submit"
                        >
                          Submit
                        </Button>
                      ) : (
                        <Spin indicator={antIcon} />
                      )}
                    </Form.Item>

                    <p style={{ color: colors.primary }}>
                      Not a registered user ?{" "}
                      <span style={{ color: colors.blue }}>
                        {" "}
                        <Link to="/SignUp">Sign Up</Link>
                      </span>
                    </p>
                  </div>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </Content>
      <div className="clearfix"></div>
      <Footer />
    </Layout>
  );
};

export default withRouter(SignIn);
