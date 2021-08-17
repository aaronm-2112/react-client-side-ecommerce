import React from "react";
import { shallow } from "enzyme";
import configureMockStore from "redux-mock-store";
import AppContainer from "./App.container";
import { UserActionTypes } from "./redux/user/user.types";

const mockStore = configureMockStore();

describe("MapStateToProps and MapDispatchToProps tests for the App component", () => {
  let store;
  let wrapper;

  beforeEach(() => {
    const initialState = {
      // our user reducer's state
      user: { currentUser: 1 },
    };

    store = mockStore(initialState);
    wrapper = shallow(<AppContainer store={store} />);
  });

  test("App snapshot matches", () => {
    expect(wrapper).toMatchSnapshot();
  });

  // test that mapstatetoprops happens correctly
  it("Should pass a value for the user object into the props", () => {
    expect(wrapper.dive().props().currentUser).toBe(1);
  });

  it("Should pass a function for the setCurrentUser action into props", () => {
    let diveWrapper = wrapper.dive();
    expect(diveWrapper.props().setCurrentUser).not.toBe(undefined);
    expect(diveWrapper.props().setCurrentUser()).toEqual({
      payload: undefined,
      type: UserActionTypes.SET_CURRENT_USER,
    });
  });
});
