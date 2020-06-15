import React, { useCallback, useState } from "react";
import { Layout, Form, Input, Button, notification, Spin } from "antd";
import { KeyOutlined, LoadingOutlined } from "@ant-design/icons";
import { Link, withRouter } from "react-router-dom";
import app from "../../Services/firebase";

import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import colors from "../../styles";
const { Content } = Layout;
const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

const SignUp = ({ history }: any) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSignUp = useCallback(
    async (event) => {
      setIsLoading(true);
      const { email, password } = event;
      try {
        await app.auth().createUserWithEmailAndPassword(email, password);
        const msg = `Congratulations! you account has been successfully created, you can now start to search health stations around the world!`;
        openNotificationWithIcon("success", msg);
        setIsLoading(false);
        setTimeout(() => {
          history.push("/Dashboard");
        }, 3000);
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
        message: "Sign Up Failed",
        description: msg,
      });
    } else {
      notification.success({
        message: "Sign Up Successful!",
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

  const onFinish = (values: any) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  const inputStyle = { borderRadius: 20 };

  return (
    <Layout className="layout">
      <Header current="3" />

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
              <KeyOutlined style={{ fontSize: 100, color: "#cbc3c3" }} />
              <h3
                className="content-title-left"
                style={{ color: colors.white }}
              >
                Create an account now!
              </h3>
              <p>It's easier than you think.</p>
            </div>
          </div>
          <div className="main-right">
            <div className="content-row">
              <h3 className="content-title">Sign Up</h3>
              <div className="form-container">
                <Form
                  {...laayout}
                  layout="vertical"
                  name="basic"
                  initialValues={{ remember: true }}
                  onFinish={handleSignUp}
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
                          Sign Up
                        </Button>
                      ) : (
                        <Spin indicator={antIcon} />
                      )}
                    </Form.Item>
                    <p style={{ color: colors.primary }}>
                      Already have an account ?
                      <span style={{ color: colors.blue }}>
                        {" "}
                        <Link to="/SignIn"> Sign In Now!</Link>
                      </span>
                    </p>
                  </div>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </Content>
      <Footer />
    </Layout>
  );
};

export default withRouter(SignUp);
