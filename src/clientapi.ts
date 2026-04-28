import type { Client } from "./types";

export const fetchClients = () => {
    return fetch(import.meta.env.VITE_API_URL + "/clients")
        .then(res => {
            if (!res.ok) throw new Error("Error fetching clients");
            return res.json();
        });
};

export const saveClient = (client: Client) => {
    return fetch(import.meta.env.VITE_API_URL + "/clients", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(client)
    })
    .then(res => {
        if (!res.ok) throw new Error("Error saving client");
        return res.json();
    });
};