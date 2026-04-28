import { useState } from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import ClientList from "./components/ClientList";
import TrainingList from "./components/TrainingList";
import CalendarPage from "./components/CalendarPage";

function App() {
  const [view, setView] = useState<"clients" | "trainings" | "calendar">(
    "clients"
  );

  return (
    <>
      <AppBar
        position="static"
        sx={{
          width: "100%",
          backgroundColor: "#ec4899",
          boxShadow: "0 6px 20px rgba(236,72,153,0.25)",
        }}
      >
        <Toolbar
          sx={{
            width: "100%",
            px: 2,
            display: "flex",
            gap: 1,
          }}
        >
          <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 700 }}>
            Personal Trainer App
          </Typography>

          <Button sx={{ color: "white" }} onClick={() => setView("clients")}>
            Asiakkaat
          </Button>

          <Button sx={{ color: "white" }} onClick={() => setView("trainings")}>
            Treenit
          </Button>

          <Button sx={{ color: "white" }} onClick={() => setView("calendar")}>
            Kalenteri
          </Button>
        </Toolbar>
      </AppBar>

      <main
        style={{
          width: "100%",
          margin: 0,
          padding: 12,
          boxSizing: "border-box",

        }}
      >
        {view === "clients" && <ClientList />}
        {view === "trainings" && <TrainingList />}
        {view === "calendar" && <CalendarPage />}
      </main>
    </>
  );
}

export default App;