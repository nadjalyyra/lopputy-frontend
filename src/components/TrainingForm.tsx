import DialogContent from "@mui/material/DialogContent";
import TextField from "@mui/material/TextField";
import type { Training } from "../types";
import React from "react";

type TrainingFormProps = {
  training: Training;
  setTraining: React.Dispatch<React.SetStateAction<Training>>;
};

export default function TrainingForm({
  training,
  setTraining
}: TrainingFormProps) {
  return (
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
        slotProps={{
          inputLabel: {
            shrink: true
          }
        }}
      />

      <TextField
        label="Customer URL"
        value={training.customer}
        onChange={(e) =>
          setTraining({ ...training, customer: e.target.value })
        }
        fullWidth
        margin="dense"
        variant="standard"
        helperText="Esim. https://.../api/customers/123"
      />
    </DialogContent>
  );
}