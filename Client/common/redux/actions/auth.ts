export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";

export const REGISTER_REQUEST = "REGISTER_REQUEST";
export const REGISTER_SUCCESS = "REGISTER_SUCCESS";
export const REGISTER_FAILURE = "REGISTER_FAILURE";

export const loginRequest = (credentials: any) => ({
  type: LOGIN_REQUEST,
  payload: credentials,
});

export const loginSuccess = (user: any) => ({
  type: LOGIN_SUCCESS,
  payload: user,
});

export const loginFailure = (error: any) => ({
  type: LOGIN_FAILURE,
  payload: error.message,
});

export const registerRequest = (userData: any) => ({
  type: REGISTER_REQUEST,
  payload: userData,
});

export const registerSuccess = (user: any) => ({
  type: REGISTER_SUCCESS,
  payload: user,
});

export const registerFailure = (error: any) => ({
  type: REGISTER_FAILURE,
  payload: error,
});
