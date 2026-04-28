import { useEffect, useState } from "react";
import type { Client, ClientData } from "../types";
import type { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { DataGrid } from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";

import AddClient from "./AddClient";
import EditClient from "./EditClient";

import { fetchClients, saveClient } from "../api/clientapi";

function ClientList() {
  const [clients, setClients] = useState<ClientData[]>([]);
  const [open, setOpen] = useState(false);

  const getClients = () => {
    fetchClients()
      .then(data => {
        setClients(data._embedded?.customers ?? []);
      })
      .catch(err => console.error(err));
  };

  const handleAdd = (client: Client) => {
    saveClient(client)
      .then(() => {
        getClients();
        setOpen(true);
      })
      .catch(err => console.error(err));
  };

  const handleDelete = (url: string) => {
    if (window.confirm("Haluatko varmasti poistaa asiakkaan?")) {
      fetch(url, { method: "DELETE" })
        .then(response => {
          if (!response.ok) {
            throw new Error("Error deleting client");
          }
          getClients();
          setOpen(true);
        })
        .catch(err => console.error(err));
    }
  };

  const handleUpdate = (url: string, updatedClient: Client) => {
    fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(updatedClient)
    })
      .then(response => {
        if (!response.ok) {
          throw new Error("Error updating client");
        }
        getClients();
        setOpen(true);
      })
      .catch(err => console.error(err));
  };

  const columns: GridColDef[] = [
    { field: "firstname", headerName: "Etunimi", width: 160 },
    { field: "lastname", headerName: "Sukunimi", width: 160 },
    { field: "email", headerName: "Email", width: 220 },
    { field: "phone", headerName: "Puhelin", width: 160 },

    {
      field: "_links.self.href",
      headerName: "",
      sortable: false,
      renderCell: (params: GridRenderCellParams) => (
        <Button
          color="error"
          size="small"
          onClick={() => handleDelete(params.id as string)}
        >
          POISTA
        </Button>
      )
    },

    {
      field: "edit",
      headerName: "",
      sortable: false,
      renderCell: (params: GridRenderCellParams) => (
        <EditClient client={params.row} handleUpdate={handleUpdate} />
      )
    }
  ];

  useEffect(() => {
    getClients();
  }, []);

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
          disableRowSelectionOnClick
        />
      </div>

      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={() => setOpen(false)}
        message="Toiminto onnistui"
      />
    </>
  );
}

export default ClientList;