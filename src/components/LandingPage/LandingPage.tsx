import React from "react";
import { Layout } from "antd";

import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { Link } from "react-router-dom";

const { Content } = Layout;
const image =
  "https://camo.githubusercontent.com/3a2ef68ba6610b115cd8b94e656abb19d3cd9d50/68747470733a2f2f6973342d73736c2e6d7a7374617469632e636f6d2f696d6167652f7468756d622f507572706c653132382f76342f32312f62662f37362f32316266373662632d383837642d373562392d363932392d6261326132616435303362652f736f757263652f3531327835313262622e6a7067";

function LandingPage() {
  return (
    <Layout className="layout">
      <Header current="1" />

      <Content
        style={{
          padding: "0 50px",
          display: "flex",
          height: "100%",
          justifyContent: "center",
        }}
      >
        <div className="site-layout-content">
          <div className="landing-left">
            <div className="center-img">
              <img src={image} width="250" />
            </div>
          </div>
          <div className="landing-right">
            <div className="content-row">
              <p className="landing-side-left">
                Find the nearest hospitals in your area and view what services
                each provides.
              </p>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Link to="/Dashboard" className="btn btn-white btn-animated">
                  Start Exploring Now
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Content>
      <Footer />
    </Layout>
  );
}

export default LandingPage;
