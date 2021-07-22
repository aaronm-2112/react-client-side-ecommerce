import { UserActionTypes } from "./user.types";

// when we first call this reducer Redux doesn;t have state so give ti a default
const INITIAL_STATE = {
  currentUser: null,
};

// the default value for state is to not be set. We use the INITIAL_STATE for when this is the case.
const userReducer = (currentState = INITIAL_STATE, action) => {
  switch (action.type) {
    case UserActionTypes.SET_CURRENT_USER:
      return {
        ...currentState,
        currentUser: action.payload,
      };
    default:
      return currentState;
  }
};

export default userReducer;
