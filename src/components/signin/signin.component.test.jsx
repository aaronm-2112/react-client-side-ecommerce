import React from "react";
import { shallow } from "enzyme";
import SignIn from "./signin.component";
import * as fireUtils from "../../firebase/firebase.utils";

// track if prevent default is called on submission of the sign in form
let prevented = false;
// store the original implmenetation of signInWithEMailAndPasssrod
const originalSignIn = fireUtils.auth.signInWithEmailAndPassword;
// mock signInWithEmailAndPassword from the auth firebase object
fireUtils.auth.signInWithEmailAndPassword = jest.fn();

// reset prevented if needed in more than one test
beforeEach(() => {
  jest.clearAllMocks();
  fireUtils.auth.signInWithEmailAndPassword.mockImplementation(originalSignIn);
  prevented = false;
});

it("Renders the signin component", () => {
  const wrapper = shallow(<SignIn />);
  expect(wrapper).toMatchSnapshot();
});

it("Prevents default behaviour when the form is submitted", () => {
  // stub the signin implementation to avoid initiating the sign in action
  fireUtils.auth.signInWithEmailAndPassword.mockImplementation(() => 0);
  const wrapper = shallow(<SignIn />);

  wrapper.find("form").simulate("submit", {
    preventDefault: () => {
      prevented = true;
    },
  });

  expect(prevented).toBe(true);
});

it("Catches and console errors an error on form submission when the signin method throws", () => {
  // mock console error
  const consoleSpy = jest.spyOn(console, "error").mockReturnValueOnce("");

  // stub the sign in with email to throw an error
  fireUtils.auth.signInWithEmailAndPassword.mockImplementation(() => {
    throw new Error("Sign in failure");
  });

  // running the test
  const wrapper = shallow(<SignIn />);
  wrapper.find("form").simulate("submit", {
    preventDefault: () => {
      prevented = true;
    },
  });

  // assertions
  expect(consoleSpy).toHaveBeenCalled();
});

it("Resets the email and password inputs after submission", () => {
  // stub the sign in to return a void promise
  fireUtils.auth.signInWithEmailAndPassword.mockImplementation(() => 1);

  const wrapper = shallow(<SignIn />);

  // get the form element
  const form = wrapper.find("form");

  // simulate the submit evemt on the form
  form.simulate("submit", {
    preventDefault: () => {
      prevented = true;
    },
  });

  expect(wrapper.state()).toEqual({ email: "", password: "" });
});
