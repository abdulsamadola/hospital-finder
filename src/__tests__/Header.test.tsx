import React from "react";
import Enzyme, { shallow } from "enzyme";
import Header from "../components/Header/Header";
import Adapter from "enzyme-adapter-react-16";
import { findByTestAttr } from "../testUtils";
Enzyme.configure({ adapter: new Adapter() });
interface IProps {
  current: string;
}
const setUp = (props: IProps) => {
  const component = shallow(<Header {...props} />);
  return component;
};

describe("Header Component", () => {
  let component: any;
  beforeEach(() => {
    component = setUp({ current: "1" });
  });
  it("Should render without error", () => {
    const wrapper = findByTestAttr(component, "HeaderComponent");
    expect(wrapper.length).toBe(1);
  });
  it("Should render Menu", () => {
    const wrapper = findByTestAttr(component, "menu");
    expect(wrapper.length).toBe(1);
  });
  it("Should render Atleast a Menu Item", () => {
    const wrapper = findByTestAttr(component, "menu-item");
    expect(wrapper.length).toBe(1);
  });
});
