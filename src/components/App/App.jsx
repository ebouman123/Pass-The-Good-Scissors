import React, { useEffect } from "react";
import {
  HashRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { TourProvider } from "@reactour/tour";
import steps from "../../steps";

import Nav from "../Nav/Nav";

import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";

import AboutPage from "../AboutPage/AboutPage";
import Dashboard from "../Dashboard/Dashboard";
import LandingPage from "../LandingPage/LandingPage";
import LoginPage from "../LoginPage/LoginPage";
import RegisterPage from "../RegisterPage/RegisterPage";
import DisplayFabrics from "../DisplayFabrics/DisplayFabrics";
import PlanningTool from "../PlanningTool/PlanningTool";
import EditFabric from "../EditFabric/EditFabric";
import EditQuilt from "../EditQuilt/EditQuilt";
import DisplayQuilts from "../DisplayQuilts/DisplayQuilts";

import DisplayFabricsTutorial from "../Tutorials/DisplayFabricsTutorial/DisplayFabricsTutorial";
import DisplayQuiltsTutorial from "../Tutorials/DisplayQuiltsTutorial/DisplayQuiltsTutorial";
import PlanningToolTutorial from "../Tutorials/PlanningToolTutorial/PlanningToolTutorial";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import "./App.css";


function App() {
  const dispatch = useDispatch();

  const user = useSelector((store) => store.user);

  useEffect(() => {
    dispatch({ type: "FETCH_USER" });
  }, [dispatch]);

  const theme = createTheme({
    palette: {
      primary: {
        main: "#5e57b4",
        light: "#ced0ec",
        contrastText: "#fff",
      },
      secondary: {
        main: "#b0494d",
        light: "#c67d84",
        contrastText: "#fff",
      },
    },
    typography: {
      fontFamily: "Lato, Shrikhand, Roboto, sans-serif"
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <TourProvider steps={steps}>
        <Router>
          <div>
            <Nav />
            <Switch>
              {/* Visiting localhost:5173 will redirect to localhost:5173/home */}
              <Redirect exact from="/" to="/landing" />
              {/* Visiting localhost:5173/about will show the about page. */}
              <Route
                // shows AboutPage at all times (logged in or not)
                exact
                path="/about"
              >
                <AboutPage />
              </Route>

              <ProtectedRoute exact path="/dashboard">
                <Dashboard />
              </ProtectedRoute>

              <ProtectedRoute exact path="/quilts">
                <DisplayQuilts />
              </ProtectedRoute>
              <ProtectedRoute exact path="/quiltsTutorial">
                <DisplayQuiltsTutorial />
              </ProtectedRoute>
              <ProtectedRoute exact path="/fabrics">
                <DisplayFabrics />
              </ProtectedRoute>
              <ProtectedRoute exact path="/fabricsTutorial">
                <DisplayFabricsTutorial />
              </ProtectedRoute>
              <ProtectedRoute exact path="/planning">
                <PlanningTool />
              </ProtectedRoute>
              <ProtectedRoute exact path="/planningTutorial">
                <PlanningToolTutorial />
              </ProtectedRoute>
              <ProtectedRoute exact path="/edit">
                <EditFabric />
              </ProtectedRoute>
              <ProtectedRoute exact path="/editQuilt">
                <EditQuilt />
              </ProtectedRoute>

              <Route exact path="/login">
                {user.id ? (
                  // If the user is already logged in,
                  // redirect to the /user page
                  <Redirect to="/dashboard" />
                ) : (
                  // Otherwise, show the login page
                  <LoginPage />
                )}
              </Route>

              <Route exact path="/registration">
                {user.id ? (
                  // If the user is already logged in,
                  // redirect them to the /user page
                  <Redirect to="/dashboard" />
                ) : (
                  // Otherwise, show the registration page
                  <RegisterPage />
                )}
              </Route>

              <Route exact path="/landing">
                {user.id ? (
                  // If the user is already logged in,
                  // redirect them to the /user page
                  <Redirect to="/dashboard" />
                ) : (
                  // Otherwise, show the Landing page
                  <LandingPage />
                )}
              </Route>

              {/* If none of the other routes matched, we will show a 404. */}
              <Route>
                <h1>404</h1>
              </Route>
            </Switch>
            {/* <Footer /> */}
          </div>
        </Router>
      </TourProvider>
    </ThemeProvider>
  );
}

export default App;
