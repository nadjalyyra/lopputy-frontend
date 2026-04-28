import type { Client } from "../types";

export const fetchClients = () => {
  return fetch(import.meta.env.VITE_API_URL + "/customers")
    .then(response => {
      if (!response.ok) {
        throw new Error("Error fetching clients");
      }
      return response.json();
    });
};

export const saveClient = (client: Client) => {
  return fetch(import.meta.env.VITE_API_URL + "/customers", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(client)
  }).then(response => {
    if (!response.ok) {
      throw new Error("Error adding client");
    }
    return response.json();
  });
};