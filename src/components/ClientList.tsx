import { useEffect, useState } from "react";
import type { Client, ClientData } from "../types";
import type { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { DataGrid } from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import AddClient from "./AddClient";

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
      fetch(url, {
        method: "DELETE"
      })
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

  // 🔹 CSV EXPORT
  const exportCSV = () => {
    const headers = [
      "Etunimi",
      "Sukunimi",
      "Email",
      "Puhelin",
      "Osoite",
      "Postinumero",
      "Kaupunki"
    ];

    const rows = clients.map(c => [
      c.firstname,
      c.lastname,
      c.email,
      c.phone,
      c.streetaddress,
      c.postcode,
      c.city
    ]);

    const csvContent =
      [headers, ...rows]
        .map(row => row.join(","))
        .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = window.URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "customers.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const columns: GridColDef[] = [
    { field: "firstname", headerName: "Etunimi", width: 180 },
    { field: "lastname", headerName: "Sukunimi", width: 180 },
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
    }
  ];

  useEffect(() => {
    getClients();
  }, []);

  return (
    <>
      <Stack sx={{ mt: 2, mb: 2 }} direction="row" spacing={2}>
        <AddClient handleAdd={handleAdd} />

        {/* EXPORT NAPPI (osa kolmosta varten */}
        <Button variant="outlined" onClick={exportCSV}>
          EXPORT CSV
        </Button>
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