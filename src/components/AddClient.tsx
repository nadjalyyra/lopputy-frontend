import { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import type { Client } from "../types";
import ClientForm from "./ClientForm";

type AddClientProps = {
  handleAdd: (client: Client) => void;
};

const emptyClient: Client = {
  firstname: "",
  lastname: "",
  email: "",
  phone: "",
  streetaddress: "",
  postcode: "",
  city: ""
};

export default function AddClient({ handleAdd }: AddClientProps) {
  const [open, setOpen] = useState(false);
  const [client, setClient] = useState<Client>(emptyClient);

  const handleClickOpen = () => {
    setClient(emptyClient);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
    handleAdd(client);
    setClient(emptyClient);
    handleClose();
  };

  return (
    <>
      <Button variant="outlined" onClick={handleClickOpen}>
        Lisää asiakas
      </Button>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Uusi asiakas</DialogTitle>

        <ClientForm client={client} setClient={setClient} />

        <DialogActions>
          <Button onClick={handleClose}>Peruuta</Button>
          <Button onClick={handleSubmit} variant="contained">
            Tallenna
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}