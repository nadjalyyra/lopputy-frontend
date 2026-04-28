import { Container, AppBar, Toolbar, Typography, CssBaseline } from "@mui/material";
import ClientList from "./components/ClientList";

function App() {
    return (
        <Container maxWidth="lg">
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6">
                        Personal Trainer App
                    </Typography>
                </Toolbar>
            </AppBar>

            <ClientList />

            <CssBaseline />
        </Container>
    );
}

export default App;