/**
 * Authentication helper for the application
 */
const auth = {
  /**
   * Removes user details from session storage
   *
   * @param {*} cb
   */
  unsetAccessToken(cb: (bool: boolean) => void) {
    sessionStorage.removeItem("access_token");
    cb(true);
  },

  /**
   * Sets access token details in session storage
   *
   * @param {user} user
   * @param {*} cb
   */
  setAccessToken(
    obj: {
      accessToken: string;
      accessTokenExpiresAt: string;
      email: string;
      name: string;
      _id: string;
    },
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
