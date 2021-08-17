import React from "react";
import HomePage from "../../pages/homepage/homepage.component";
import { Switch, Route, Redirect } from "react-router-dom";
import ShopPage from "../../pages/shop/shop.component";
import Header from "../header/header.component";
import SignInAndSignUpPage from "../../pages/signin-and-signup/signin-and-signup.component";
import CheckoutPage from "../../pages/checkout/checkout.component";

const MainPage = ({ currentUser }) => (
  <div>
    <Header />
    <Switch>
      <Route exact path="/" component={HomePage} />
      <Route exact path="/checkout" component={CheckoutPage} />
      <Route path="/shop" component={ShopPage} />

      <Route
        exact
        path="/signin"
        render={() =>
          currentUser ? <Redirect to="/" /> : <SignInAndSignUpPage />
        }
      />
    </Switch>
  </div>
);

export default MainPage;
