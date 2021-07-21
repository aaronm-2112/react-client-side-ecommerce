import React from "react";
import SignIn from "../../components/signin/signin.component";
import SignUp from "../../components/sign-up/sign-up.component";
import "./signin-and-signup.styles.scss";

const SignInAndSignUpPage = () => {
  return (
    <div className="signin-and-signup">
      <SignIn />
      <SignUp />
    </div>
  );
};

export default SignInAndSignUpPage;
