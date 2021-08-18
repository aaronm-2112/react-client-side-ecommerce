import { shallow } from "enzyme";
import App from "./App";
import * as fireUtils from "./firebase/firebase.utils";

// make a mock of the onAuthStateChanged method
fireUtils.auth.onAuthStateChanged = jest.fn();

describe("Tests for the App component", () => {
  let wrapper;
  beforeEach(() => {
    // create a wrapper
    wrapper = shallow(<App />);
  });

  it("Should have a matching wrapper", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("Should launch componentDidMount", () => {
    const instance = wrapper.instance();

    instance.componentDidMount();

    expect(fireUtils.auth.onAuthStateChanged).toHaveBeenCalled();
  });
});
