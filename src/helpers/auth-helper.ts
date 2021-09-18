/**
 * Authentication helper for the application
 */
const auth = {
  /**
   * Sets user details in session storage
   * after successfully logging in
   *
   * @param {user} user
   * @param {*} cb
   */
  setUserDetails(
    user: { token: string; user: { email: string; id: string } },
    cb: (bool: boolean) => void
  ) {
    const jwt = {
      token: user.token,
      user: {
        email: user.user.email,
        id: user.user.id,
      },
    };

    sessionStorage.setItem("jwt", JSON.stringify(jwt));
    cb(true);
  },
  /**
   * Removes user details from session storage
   *
   * @param {*} cb
   */
  unsetUserDetails(cb: (bool: boolean) => void) {
    sessionStorage.removeItem("jwt");
    cb(true);
  },
  /**
   * Check if the user is authenticated
   *
   * @returns a user object if the user is logged in, or false is not
   */
  isAuthenticated() {
    if (typeof window == "undefined") return false;

    if (sessionStorage.getItem("jwt") !== null) {
      //@ts-ignore
      const obj = JSON.parse(sessionStorage.getItem("jwt"));
      return obj && obj.user ? obj : false;
    }

    return false;
  },

  /**
   * Sets access token details in session storage
   *
   * @param {user} user
   * @param {*} cb
   */
  setAccessToken(
    obj: { accessToken: string; accessTokenExpiresAt: string },
    cb: (bool: boolean) => void
  ) {
    sessionStorage.setItem("access_token", JSON.stringify(obj));
    cb(true);
  },

  /**
   * Check if the user is authenticated
   *
   * @returns a user object if the user is logged in, or false is not
   */
  accessTokenExists() {
    if (typeof window == "undefined") return false;

    if (sessionStorage.getItem("access_token") !== null) {
      // @ts-ignore
      const obj = JSON.parse(sessionStorage.getItem("access_token"));
      if (obj && new Date(obj.accessTokenExpiresAt) < new Date()) {
        sessionStorage.removeItem("access_token");
        return false;
      }
      return obj;
    }

    return false;
  },
};

export default auth;
