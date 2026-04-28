import { useEffect, useState } from "react";
import type { Client, ClientData } from "../types";
import { DataGrid, type GridColDef } from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import Stack from "@mui/material/Stack";

import AddClient from "./AddClient";
import { fetchClients, saveClient } from "../clientapi";

function ClientList() {
    const [clients, setClients] = useState<ClientData[]>([]);
    const [open, setOpen] = useState(false);

    const getClients = () => {
        fetchClients()
            .then(data => setClients(data._embedded.clients))
            .catch(err => console.error(err));
    };

    const handleAdd = (client: Client) => {
        saveClient(client)
            .then(() => getClients())
            .catch(err => console.error(err));
    };

    const handleDelete = (url: string) => {
        if (window.confirm("Delete client?")) {
            fetch(url, { method: "DELETE" })
                .then(() => {
                    getClients();
                    setOpen(true);
                });
        }
    };

    const columns: GridColDef[] = [
        { field: "name", headerName: "Name", width: 200 },
        { field: "email", headerName: "Email", width: 200 },
        { field: "goal", headerName: "Goal", width: 150 },
        { field: "level", headerName: "Level", width: 120 },
        { field: "age", headerName: "Age", width: 100 },

        {
            field: "_links.self.href",
            headerName: "",
            renderCell: (params) =>
                <Button
                    color="error"
                    onClick={() => handleDelete(params.id as string)}
                >
                    DELETE
                </Button>
        }
    ];

    useEffect(() => {
        getClients();
    }, []);

    return (
        <>
            <Stack sx={{ m: 2 }}>
                <AddClient handleAdd={handleAdd} />
            </Stack>

            <div style={{ height: 500, width: "95%", margin: "auto" }}>
                <DataGrid
                    rows={clients}
                    columns={columns}
                    getRowId={(row) => row._links.self.href}
                />
            </div>

            <Snackbar
                open={open}
                autoHideDuration={3000}
                message="Client deleted"
                onClose={() => setOpen(false)}
            />
        </>
    );
}

export default ClientList;