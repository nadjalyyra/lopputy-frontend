import { useEffect, useState } from "react";
import { DataGrid, type GridColDef } from "@mui/x-data-grid";
import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";

import AddClient from "./AddClient";
import { fetchClients, saveClient } from "../api/clientapi";
import type { Client, ClientData } from "../types";

function ClientList() {
  const [clients, setClients] = useState<ClientData[]>([]);
  const [open, setOpen] = useState(false);

  const getClients = () => {
    fetchClients()
      .then((data: any) => {
        setClients(data._embedded.customers);
      })
      .catch((err: unknown) => {
        console.error(err);
      });
  };

  useEffect(() => {
    getClients();
  }, []);

  const handleAdd = (client: Client) => {
    saveClient(client)
      .then(() => {
        getClients();
        setOpen(true);
      })
      .catch((err: unknown) => {
        console.error(err);
      });
  };

  const columns: GridColDef[] = [
    { field: "firstname", headerName: "First name", width: 150 },
    { field: "lastname", headerName: "Last name", width: 150 },
    { field: "streetaddress", headerName: "Address", width: 200 },
    { field: "postcode", headerName: "Postal code", width: 120 },
    { field: "city", headerName: "City", width: 150 },
    { field: "email", headerName: "Email", width: 200 },
    { field: "phone", headerName: "Phone", width: 150 }
  ];

  return (
    <>
      <Stack sx={{ mt: 2, mb: 2 }} direction="row">
        <AddClient handleAdd={handleAdd} />
      </Stack>

      <div style={{ width: "95%", height: 500, margin: "auto" }}>
        <DataGrid
          rows={clients}
          columns={columns}
          getRowId={row => row._links.self.href}
          autoPageSize
          rowSelection={false}
        />
      </div>

      <Snackbar
        open={open}
        autoHideDuration={3000}
        message="Client added"
        onClose={() => setOpen(false)}
      />
    </>
  );
}

export default ClientList;