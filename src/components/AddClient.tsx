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

export default function AddClient(props: AddClientProps) {
  const [open, setOpen] = useState(false);

  const [client, setClient] = useState<Client>({
    firstname: "",
    lastname: "",
    streetaddress: "",
    postcode: "",
    city: "",
    email: "",
    phone: ""
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
    props.handleAdd(client);
    handleClose();
  };

  return (
    <>
      <Button variant="outlined" onClick={handleClickOpen}>
        Add client
      </Button>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>New client</DialogTitle>

        <ClientForm client={client} setClient={setClient} />

        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Save</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}