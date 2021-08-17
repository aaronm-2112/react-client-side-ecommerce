import { createStructuredSelector } from "reselect";
import { setCurrentUser } from "./redux/user/user.actions";
import { selectCurrentUser } from "./redux/user/user.selector";
import App from "./App";
import { connect } from "react-redux";
import { compose } from "redux";

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

const mapDispatchToProps = (dispatch) => {
  return { setCurrentUser: (user) => dispatch(setCurrentUser(user)) };
};

const AppContainer = compose(connect(mapStateToProps, mapDispatchToProps))(App);

export default AppContainer;
