import React from "react";
import HomePage from "./pages/homepage/homepage.component";

import { Switch, Route, Redirect } from "react-router-dom";
import "./App.css";
import ShopPage from "./pages/shop/shop.component";
import Header from "./components/header/header.component";
import SignInAndSignUpPage from "./pages/signin-and-signup/signin-and-signup.component";
import { auth, createUserProfileDocument } from "./firebase/firebase.utils";
import { connect } from "react-redux";
import { setCurrentUser } from "./redux/user/user.actions";
import { selectCurrentUser } from "./redux/user/user.selector";
import { createStructuredSelector } from "reselect";
import CheckoutPage from "./pages/checkout/checkout.component";

class App extends React.Component {
  // set up a subscription to Google Firebase for Auth status changes -- this persists while the client is on our site
  componentDidMount() {
    const { setCurrentUser } = this.props;
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
      // ignore if the user signed out -- we are alerted both when a user signs in and out. On sign out there is a null userAuth object returned
      if (userAuth) {
        // the user profile document is the documentReference to the collection table for the current user
        const userRef = await createUserProfileDocument(userAuth);

        // whenever we change the user's data using the userSnapshot update the state of our app to match the user's firestore data
        userRef.onSnapshot((snapShot) => {
          setCurrentUser({
            id: snapShot.id,
            ...snapShot.data(),
          });
        });
      } else {
        // if user is signed out set currentUser to null
        setCurrentUser(userAuth);
      }
    });
  }

  // stores the subscription for Auth status changes
  unsubscribeFromAuth = null;

  // when the app closes unsubscribe fron the Auth subscription to avoid memory leaks
  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {
    const { currentUser } = this.props;
    return (
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
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

const mapDispatchToProps = (dispatch) => {
  return { setCurrentUser: (user) => dispatch(setCurrentUser(user)) };
};

// connect returns a function. Then we execute this function with App as a parameter
export default connect(mapStateToProps, mapDispatchToProps)(App);
