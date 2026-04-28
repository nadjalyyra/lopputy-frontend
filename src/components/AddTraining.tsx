import { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import TrainingForm from "./TrainingForm";

type CustomerOption = {
  value: string;
  label: string;
};

type AddTrainingProps = {
  handleAdd: (training: any) => void;
  customers: CustomerOption[];
};

export default function AddTraining({ handleAdd, customers }: AddTrainingProps) {
  const [open, setOpen] = useState(false);

  const [training, setTraining] = useState({
    date: "",
    activity: "",
    duration: 0,
    customer: ""
  });

  const handleSubmit = () => {
    handleAdd(training);
    setOpen(false);
  };

  return (
    <>
      <Button variant="outlined" onClick={() => setOpen(true)}>
        LISÄÄ TREENI
      </Button>

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Uusi treeni</DialogTitle>

        <TrainingForm
          training={training}
          setTraining={setTraining}
          customers={customers}
        />

        <DialogActions>
          <Button onClick={() => setOpen(false)}>Peruuta</Button>
          <Button onClick={handleSubmit}>Tallenna</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}