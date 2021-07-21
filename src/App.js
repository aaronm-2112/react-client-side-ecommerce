import React from "react";
import HomePage from "./pages/homepage/homepage.component";

import { Switch, Route } from "react-router-dom";
import "./App.css";
import ShopPage from "./pages/shop/shop.component";
import Header from "./components/header/header.component";
import SignInAndSignUpPage from "./pages/signin-and-signup/signin-and-signup.component";
import { auth, createUserProfileDocument } from "./firebase/firebase.utils";

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      currentUser: null,
    };
  }

  // set up a subscription to Google Firebase for Auth status changes -- this persists while the client is on our site
  componentDidMount() {
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
      // ignore if the user signed out -- we are alerted both when a user signs in and out. On sign out there is a null userAuth object returned
      if (userAuth) {
        // the user profile document is the documentReference to the collection table for the current user
        const userRef = await createUserProfileDocument(userAuth);

        // whenever we change the user's data using the userSnapshot update the state of our app to match the user's firestore data
        userRef.onSnapshot((snapShot) => {
          this.setState({
            currentUser: {
              id: snapShot.id,
              ...snapShot.data(),
            },
          });
        });
      } else {
        // if user is signed out set currentUser to null
        this.setState({ currentUser: userAuth });
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
    return (
      <div>
        <Header currentUser={this.state.currentUser} />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/shop" component={ShopPage} />
          <Route path="/signin" component={SignInAndSignUpPage} />
        </Switch>
      </div>
    );
  }
}

export default App;
