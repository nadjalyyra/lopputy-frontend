import { useState } from "react";
import { Container, AppBar, Toolbar, Typography, Button } from "@mui/material";
import ClientList from "./components/ClientList";
import TrainingList from "./components/TrainingList";
import CalendarPage from "./components/CalendarPage";

function App() {
  const [view, setView] = useState<"clients" | "trainings" | "calendar">("clients");

  return (
    <Container maxWidth="lg">
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Personal Trainer App
          </Typography>

          <Button color="inherit" onClick={() => setView("clients")}>
            Asiakkaat
          </Button>

          <Button color="inherit" onClick={() => setView("trainings")}>
            Treenit
          </Button>

          <Button color="inherit" onClick={() => setView("calendar")}>
            Kalenteri
          </Button>
        </Toolbar>
      </AppBar>

      {view === "clients" && <ClientList />}
      {view === "trainings" && <TrainingList />}
      {view === "calendar" && <CalendarPage />}
    </Container>
  );
}

export default App;