const base = "https://api.plutio.com/v1.8/";
const server_url = process.env.REACT_APP_SERVER_URL || "";

/**
 * Fetch a list of Items
 *
 */
export const generateAccessToken = async () => {
  let urlencoded = new URLSearchParams();

  urlencoded.append("client_id", process.env.REACT_APP_PLUTIO_CLIENT_ID || "");
  urlencoded.append(
    "client_secret",
    process.env.REACT_APP_PLUTIO_CLIENT_SECRET || ""
  );
  urlencoded.append("grant_type", "client_credentials");

  try {
    const response = await fetch(`${base}oauth/token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: urlencoded,
    });
    return response.json();
  } catch (err) {
    return console.log(err);
  }
};

/**
 * Fetch an Item by ID
 *
 * @param {id: String}
 */
export const signin = async (email: string, password: string) => {
  try {
    const response = await fetch(`${server_url}/api/auth/signin`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    return response.json();
  } catch (err) {
    return console.log(err);
  }
};
