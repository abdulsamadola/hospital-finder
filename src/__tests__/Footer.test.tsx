import React from "react";
import Enzyme, { shallow } from "enzyme";
import Footer from "../components/Footer/Footer";
import Adapter from "enzyme-adapter-react-16";
import { findByTestAttr } from "../testUtils";
Enzyme.configure({ adapter: new Adapter() });

const setUp = (props = {}) => {
  const component = shallow(<Footer {...props} />);
  return component;
};

describe("Footer Component", () => {
  let component: any;
  beforeEach(() => {
    component = setUp();
  });

  it("Should render without errors", () => {
    const wrapper = findByTestAttr(component, "footer-text");
    expect(wrapper.length).toBe(1);
  });
});
