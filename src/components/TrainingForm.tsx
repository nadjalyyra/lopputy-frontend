import DialogContent from "@mui/material/DialogContent";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";

type CustomerOption = {
  value: string;
  label: string;
};

type TrainingFormProps = {
  training: {
    date: string;
    activity: string;
    duration: number;
    customer: string;
  };
  setTraining: React.Dispatch<React.SetStateAction<any>>;
  customers: CustomerOption[];
};

export default function TrainingForm({
  training,
  setTraining,
  customers
}: TrainingFormProps) {
  return (
    <DialogContent>

      <TextField
        label="Aktiviteetti"
        value={training.activity}
        onChange={(e) =>
          setTraining({ ...training, activity: e.target.value })
        }
        fullWidth
        margin="dense"
      />

      <TextField
        label="Kesto (min)"
        type="number"
        value={training.duration}
        onChange={(e) =>
          setTraining({
            ...training,
            duration: Number(e.target.value)
          })
        }
        fullWidth
        margin="dense"
      />

      <TextField
        label="Päivämäärä"
        type="datetime-local"
        value={training.date}
        onChange={(e) =>
          setTraining({ ...training, date: e.target.value })
        }
        fullWidth
        margin="dense"
        slotProps={{
          inputLabel: {
            shrink: true
          }
        }}
      />

      <TextField
        select
        label="Asiakas"
        value={training.customer}
        onChange={(e) =>
          setTraining({ ...training, customer: e.target.value })
        }
        fullWidth
        margin="dense"
      >
        {customers.map((c) => (
          <MenuItem key={c.value} value={c.value}>
            {c.label}
          </MenuItem>
        ))}
      </TextField>

    </DialogContent>
  );
}