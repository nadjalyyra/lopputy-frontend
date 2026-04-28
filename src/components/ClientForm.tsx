import DialogContent from "@mui/material/DialogContent";
import TextField from "@mui/material/TextField";
import type { Client } from "../types";

type Props = {
  client: Client;
  setClient: React.Dispatch<React.SetStateAction<Client>>;
};

export default function ClientForm({ client, setClient }: Props) {
  return (
    <DialogContent>
      <TextField
        label="Etunimi"
        value={client.firstname}
        onChange={e => setClient({ ...client, firstname: e.target.value })}
        fullWidth
      />

      <TextField
        label="Sukunimi"
        value={client.lastname}
        onChange={e => setClient({ ...client, lastname: e.target.value })}
        fullWidth
      />

      <TextField
        label="Email"
        value={client.email}
        onChange={e => setClient({ ...client, email: e.target.value })}
        fullWidth
      />

      <TextField
        label="Puhelin"
        value={client.phone}
        onChange={e => setClient({ ...client, phone: e.target.value })}
        fullWidth
      />

      <TextField
        label="Osoite"
        value={client.streetaddress}
        onChange={e => setClient({ ...client, streetaddress: e.target.value })}
        fullWidth
      />

      <TextField
        label="Postinumero"
        value={client.postcode}
        onChange={e => setClient({ ...client, postcode: e.target.value })}
        fullWidth
      />

      <TextField
        label="Kaupunki"
        value={client.city}
        onChange={e => setClient({ ...client, city: e.target.value })}
        fullWidth
      />
    </DialogContent>
  );
}