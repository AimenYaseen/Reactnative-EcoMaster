import createDataContext from "./createDataContext";

const AuthReducer = (state, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

const signup = (dispatch) => {};
const signin = (dispatch) => {};
const signout = (dispatch) => {};

export const { Context, Provider } = createDataContext(
  AuthReducer,
  { signin, signup, signout },
  {}
);
