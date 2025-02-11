import { Box, CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useChangeMode } from "./theme";
import TopBar from "./global/topbar/Index";
import { Route, Routes } from "react-router-dom";
import ChatBot from "./Routes/rootRoute/Index";
import Forum from "./Routes/forum";
import Signin from "./Routes/signin/Index";
import Register from "./Routes/register/Index";
import PrivateRoute from "./components/PrivateRoutes";
import { SessionCheck } from "./util/isTokenExpired";


function App() {
  const [theme, changeMode] = useChangeMode();

  return (
    <>
      <ColorModeContext.Provider value={changeMode}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <div>
            <SessionCheck/>
            <main>
              <Routes>
                {/* Private Routes */}
                <Route element={<PrivateRoute />}>
                <Route path="/" element={<ChatBot />} />
                <Route path="/forum" element={<Forum />} />
                </Route>
                {/* Public Routes */}
                <Route path="/signin" element={<Signin />} />
                <Route path="/register" element={<Register />} />
              </Routes>
            </main>
          </div>
        </ThemeProvider>
      </ColorModeContext.Provider>
    </>
  );
}

export default App;
