import React from "react";
import { Layout } from "antd";
const { Footer } = Layout;
function CustomFooter() {
  return (
    <Footer data-test="footer-text" style={{ textAlign: "center" }}>
      Enye Cohort 4 ©2020 Created with Love
    </Footer>
  );
}

export default CustomFooter;
