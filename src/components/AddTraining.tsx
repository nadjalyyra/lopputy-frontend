import { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import DialogContent from "@mui/material/DialogContent";

type CustomerOption = {
  value: string;
  label: string;
};

type Training = {
  date: string;
  activity: string;
  duration: number;
  customer: string;
};

type AddTrainingProps = {
  handleAdd: (training: Training) => void;
  customers: CustomerOption[];
};

export default function AddTraining({
  handleAdd,
  customers
}: AddTrainingProps) {
  const [open, setOpen] = useState(false);

  const [training, setTraining] = useState<Training>({
    date: "",
    activity: "",
    duration: 0,
    customer: ""
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = () => {
    handleAdd(training);

    setTraining({
      date: "",
      activity: "",
      duration: 0,
      customer: ""
    });

    handleClose();
  };

  return (
    <>
      <Button variant="outlined" onClick={handleClickOpen}>
        Add Training
      </Button>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>New Training</DialogTitle>

        <DialogContent>
          <TextField
            label="Activity"
            value={training.activity}
            onChange={(e) =>
              setTraining({ ...training, activity: e.target.value })
            }
            fullWidth
            margin="dense"
            variant="standard"
          />

          <TextField
            label="Duration (min)"
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
            variant="standard"
          />

          <TextField
            label="Date"
            type="datetime-local"
            value={training.date}
            onChange={(e) =>
              setTraining({ ...training, date: e.target.value })
            }
            fullWidth
            margin="dense"
            variant="standard"
          />

          <TextField
            select
            label="Customer"
            value={training.customer}
            onChange={(e) =>
              setTraining({ ...training, customer: e.target.value })
            }
            fullWidth
            margin="dense"
            variant="standard"
          >
            {customers.map((c) => (
              <MenuItem key={c.value} value={c.value}>
                {c.label}
              </MenuItem>
            ))}
          </TextField>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSave} variant="contained">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}