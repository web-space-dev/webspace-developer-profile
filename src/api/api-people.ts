const base = "https://api.plutio.com/v1.8/";
const prefix = base + "people?role=team";

/**
 * Fetch a list of people
 *
 */
export const list = async (token: string) => {
  try {
    const response = await fetch(prefix, {
      method: "GET",
      //@ts-ignore
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        Business: process.env.REACT_APP_PLUTIO_BUSINESS_DOMAIN,
      },
    });
    return response.json();
  } catch (err) {
    return console.log(err);
  }
};

/**
 * Fetch a person by ID
 *
 * @param {token: String}
 * @param {id: String}
 */
export const show = async (token: string, id: string) => {
  try {
    const response = await fetch(`${prefix}&_id=${id}`, {
      method: "GET",
      //@ts-ignore
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        Business: process.env.REACT_APP_PLUTIO_BUSINESS_DOMAIN,
      },
    });
    return response.json();
  } catch (err) {
    return console.log(err);
  }
};
