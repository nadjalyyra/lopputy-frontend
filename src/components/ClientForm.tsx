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
                label="Name"
                fullWidth
                margin="dense"
                value={client.name}
                onChange={e => setClient({ ...client, name: e.target.value })}
            />

            <TextField
                label="Email"
                fullWidth
                margin="dense"
                value={client.email}
                onChange={e => setClient({ ...client, email: e.target.value })}
            />

            <TextField
                label="Goal"
                fullWidth
                margin="dense"
                value={client.goal}
                onChange={e => setClient({ ...client, goal: e.target.value })}
            />

            <TextField
                label="Level"
                fullWidth
                margin="dense"
                value={client.level}
                onChange={e => setClient({ ...client, level: e.target.value })}
            />

            <TextField
                label="Age"
                type="number"
                fullWidth
                margin="dense"
                value={client.age}
                onChange={e =>
                    setClient({ ...client, age: Number(e.target.value) })
                }
            />

        </DialogContent>
    );
}