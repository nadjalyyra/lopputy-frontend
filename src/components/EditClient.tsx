import { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import type { Client, ClientData } from "../types";
import ClientForm from "./ClientForm";

type EditClientProps = {
  client: ClientData;
  handleUpdate: (url: string, updatedClient: Client) => void;
};

export default function EditClient({ client, handleUpdate }: EditClientProps) {
  const [open, setOpen] = useState(false);

  const [formClient, setFormClient] = useState<Client>({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    streetaddress: "",
    postcode: "",
    city: ""
  });

  const handleClickOpen = () => {
    setFormClient({
      firstname: client.firstname,
      lastname: client.lastname,
      email: client.email,
      phone: client.phone,
      streetaddress: client.streetaddress,
      postcode: client.postcode,
      city: client.city
    });

    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
    handleUpdate(client._links.self.href, formClient);
    setOpen(false);
  };

  return (
    <>
      <Button size="small" onClick={handleClickOpen}>
        EDIT
      </Button>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Muokkaa asiakasta</DialogTitle>

        <ClientForm client={formClient} setClient={setFormClient} />

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