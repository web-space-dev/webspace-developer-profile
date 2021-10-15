import { config } from "../config/config";
import { IItem } from "../types";

const base = "https://api.plutio.com/v1.8/";
const prefix = base + "projects?contributors=";
// https://api.plutio.com/v1.8/tasks?taskGroupId=ZkTfpcsywJ6Fem2kZ

/**
 * Fetch a list of Items
 *
 */
export const list = async (token: string, id: string) => {
  try {
    const response = await fetch(prefix + id, {
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
 * Fetch an Item by ID
 *
 * @param {id: String}
 */
export const show = async (id: string) => {
  try {
    const response = await fetch(`${prefix}/${id}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    return response.json();
  } catch (err) {
    return console.log(err);
  }
};
