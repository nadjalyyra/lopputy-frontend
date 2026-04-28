import type { Client } from "../types";

const BASE_URL = import.meta.env.VITE_API_URL;

if (!BASE_URL) {
  throw new Error("VITE_API_URL puuttuu");
}

export const fetchClients = () => {
  return fetch(`${BASE_URL}/customers`)
    .then(response => {
      if (!response.ok) {
        throw new Error("Error fetching clients");
      }
      return response.json();
    });
};

export const saveClient = (client: Client) => {
  return fetch(`${BASE_URL}/customers`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(client)
  })
    .then(response => {
      if (!response.ok) {
        throw new Error("Error adding client");
      }
      return response.json();
    });
};