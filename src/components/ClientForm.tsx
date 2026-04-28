import DialogContent from "@mui/material/DialogContent";
import TextField from "@mui/material/TextField";

import type { Client } from "../types";

type ClientFormProps = {
  client: Client;
  setClient: React.Dispatch<React.SetStateAction<Client>>;
};

export default function ClientForm({ client, setClient }: ClientFormProps) {
  return (
    <DialogContent>
      <TextField
        margin="dense"
        label="First name"
        value={client.firstname}
        onChange={e => setClient({ ...client, firstname: e.target.value })}
        fullWidth
        variant="standard"
      />

      <TextField
        margin="dense"
        label="Last name"
        value={client.lastname}
        onChange={e => setClient({ ...client, lastname: e.target.value })}
        fullWidth
        variant="standard"
      />

      <TextField
        margin="dense"
        label="Street address"
        value={client.streetaddress}
        onChange={e => setClient({ ...client, streetaddress: e.target.value })}
        fullWidth
        variant="standard"
      />

      <TextField
        margin="dense"
        label="Postal code"
        value={client.postcode}
        onChange={e => setClient({ ...client, postcode: e.target.value })}
        fullWidth
        variant="standard"
      />

      <TextField
        margin="dense"
        label="City"
        value={client.city}
        onChange={e => setClient({ ...client, city: e.target.value })}
        fullWidth
        variant="standard"
      />

      <TextField
        margin="dense"
        label="Email"
        value={client.email}
        onChange={e => setClient({ ...client, email: e.target.value })}
        fullWidth
        variant="standard"
      />

      <TextField
        margin="dense"
        label="Phone"
        value={client.phone}
        onChange={e => setClient({ ...client, phone: e.target.value })}
        fullWidth
        variant="standard"
      />
    </DialogContent>
  );
}