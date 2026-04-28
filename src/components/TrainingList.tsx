import { useEffect, useState } from "react";
import type { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { DataGrid } from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";

import AddTraining from "./AddTraining";
import { fetchTrainings, saveTraining } from "../api/trainingapi";
import { fetchClients } from "../api/clientapi";

type TrainingRow = {
  date: string;
  duration: number;
  activity: string;
  customer?: {
    firstname: string;
    lastname: string;
  };
  _links: {
    self: {
      href: string;
    };
    customer?: {
      href: string;
    };
  };
  customerName?: string;
};

type CustomerOption = {
  value: string;
  label: string;
};

function TrainingList() {
  const [trainings, setTrainings] = useState<TrainingRow[]>([]);
  const [customers, setCustomers] = useState<CustomerOption[]>([]);
  const [open, setOpen] = useState(false);

  const getTrainings = () => {
    fetchTrainings()
      .then((data) => {
        const trainingList = data._embedded?.trainings ?? [];
        
        // Fetch customer name for each training via the customer link
        const trainingPromises = trainingList.map((training: TrainingRow) => {
          const customerLink = training._links?.customer?.href;
          if (!customerLink) {
            return Promise.resolve(training);
          }
          
          return fetch(customerLink)
            .then(res => res.json())
            .then(customerData => ({
              ...training,
              customerName: `${customerData.firstname} ${customerData.lastname}`
            }))
            .catch(() => training);
        });
        
        Promise.all(trainingPromises)
          .then(setTrainings);
      })
      .catch(err => console.error(err));
  };

  const getCustomers = () => {
    fetchClients()
      .then((data) => {
        const options: CustomerOption[] =
          data._embedded?.customers.map((c: any) => ({
            value: c._links.self.href,
            label: `${c.firstname} ${c.lastname}`
          })) ?? [];

        setCustomers(options);
      })
      .catch(err => console.error(err));
  };

  const handleAdd = (training: any) => {
    saveTraining(training)
      .then(() => {
        getTrainings();
        setOpen(true);
      })
      .catch((err) => console.error(err));
  };

  const handleDelete = (url: string) => {
    if (window.confirm("Haluatko varmasti poistaa harjoituksen?")) {
      fetch(url, { method: "DELETE" })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Error deleting training");
          }
          getTrainings();
          setOpen(true);
        })
        .catch((err) => console.error(err));
    }
  };

  const columns: GridColDef[] = [
    { field: "date", headerName: "Päivämäärä", width: 220 },
    { field: "duration", headerName: "Kesto", width: 150 },
    { field: "activity", headerName: "Aktiviteetti", width: 200 },
    {
      field: "customer",
      headerName: "Asiakas",
      width: 220,
      valueGetter: (_value, row: TrainingRow) => {
        // Use cached customer name from fetch
        return row.customerName || "";
      }
    },
    {
      field: "_links.self.href",
      headerName: "",
      sortable: false,
      renderCell: (params: GridRenderCellParams<TrainingRow>) => (
        <Button
          color="error"
          size="small"
          onClick={() => handleDelete(params.row._links.self.href)}
        >
          POISTA
        </Button>
      )
    }
  ];

  useEffect(() => {
    getTrainings();
    getCustomers();
  }, []);

  return (
    <>
      <Stack sx={{ mt: 2, mb: 2 }} direction="row">
        <AddTraining
          handleAdd={handleAdd}
          customers={customers}
        />
      </Stack>

      <div style={{ width: "95%", height: 500, margin: "auto" }}>
        <DataGrid
          rows={trainings}
          columns={columns}
          getRowId={(row) => row._links.self.href}
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

export default TrainingList;