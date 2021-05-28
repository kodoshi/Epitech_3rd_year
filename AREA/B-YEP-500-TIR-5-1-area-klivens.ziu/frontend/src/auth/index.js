/**
 * Signout method: Check if we have the window object we will have access to the localStorage .
 * if the token exists in the localStorage remove it.
 * Make request to the server and take the json response of it.
 *
 * @param {object} next, the callback functions that allows the method to go to the next middleware
 * @returns {json} response.json
 */
export const signout = (next) => {
  if (typeof window !== "undefined") localStorage.removeItem("tokenkey");
  next();
  return fetch(`${process.env.REACT_APP_API_URL}/signout`, {
    method: "GET",
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log(err);
    });
};

/**
 * IsAuthenticated method: check if the user is authenticated.
 * If token does not exists in the localStorage the user is not authenticated so return false.
 * If exists get he token and parse it on JSON format.
 */
export const isAuthenticated = () => {
  if (typeof window == "undefined") {
    return false;
  }
  if (localStorage.getItem("tokenkey")) {
    return JSON.parse(localStorage.getItem("tokenkey"));
  } else {
    return false;
  }
};

export const authenticate = (jwt, next) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('tokenkey', JSON.stringify(jwt));
    next();
  }
};

/**
 * Allows user to enter the email reset process
 */
export const forgotPassword = email => {
  console.log("email: ", email);
  return fetch(`${process.env.REACT_APP_API_URL}/forgot-password/`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ email })
  })
    .then(response => {
      console.log("forgot password response: ", response);
      return response.json();
    })
    .catch(err => console.log(err));
};

/**
 * FInalizes the email reset process
 */
export const resetPassword = resetInfo => {
  return fetch(`${process.env.REACT_APP_API_URL}/reset-password/`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(resetInfo)
  })
    .then(response => {
      console.log("forgot password response: ", response);
      return response.json();
    })
    .catch(err => console.log(err));
};

/**
 * Allows user to login via a social method
 */
export const socialLogin = user => {
  return fetch(`${process.env.REACT_APP_API_URL}/social-login/`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    // credentials: "include", // works only in the same origin
    body: JSON.stringify(user)
  })
    .then(response => {
      console.log('signin response: ', response);
      return response.json();
    })
    .catch(err => console.log(err));
};

