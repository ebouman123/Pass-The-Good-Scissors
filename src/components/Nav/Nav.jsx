import React from "react";
import { Link as RouterLink } from "react-router-dom";
import LogOutButton from "../LogOutButton/LogOutButton";
import { useSelector } from "react-redux";
import { Box, Typography } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";

function Nav() {
  const user = useSelector((store) => store.user);
  const location = useLocation();

  const hideNavOnPages = ["/landing", "/login", "/registration", "/about"];
  const showNav = !hideNavOnPages.includes(location.pathname);

  return (
    <Box>
      {showNav ? (
        <Box sx={{ flexGrow: 1, m: 2}}>
          <AppBar position="relative" sx={{ height: 80, borderRadius: 3 }}>
            <Toolbar sx={{ height: 80 }}>
              <Link
                component={RouterLink}
                color="#fafafa"
                sx={{ textDecoration: "none" }}
                to="/landing"
              >
                <Typography variant="h4" component="div" sx={{ flexGrow: 1 }}>
                  Pass the Good Scissors!
                </Typography>
              </Link>
              <Box flexGrow={1} />
              {/* If no user is logged in, show these links */}
              {!user.id && (
                // If there's no user, show login/registration links
                <>
                  <Stack
                    direction={{ sm: "row" }}
                    sx={{ justifyContent: "center", alignItems: "center" }}
                    gap={3}
                  >
                    <Link
                      component={RouterLink}
                      sx={{ textDecoration: "none" }}
                      color="#fafafa"
                      to="/login"
                    >
                      Login / Register
                    </Link>
                    <Link
                      component={RouterLink}
                      sx={{ textDecoration: "none" }}
                      color="#fafafa"
                      to="/about"
                    >
                      About
                    </Link>
                  </Stack>
                </>
              )}

              {/* If a user is logged in, show these links */}
              {user.id && (
                <>
                  <Stack
                    direction={{ sm: "row" }}
                    sx={{ justifyContent: "center", alignItems: "center" }}
                    gap={3}
                  >
                    <Link
                      component={RouterLink}
                      sx={{ textDecoration: "none" }}
                      color="#fafafa"
                      to="/dashboard"
                    >
                      Dashboard
                    </Link>

                    <Link
                      component={RouterLink}
                      sx={{ textDecoration: "none" }}
                      color="#fafafa"
                      to="/quilts"
                    >
                      Finished Quilts
                    </Link>

                    <Link
                      component={RouterLink}
                      sx={{ textDecoration: "none" }}
                      color="#fafafa"
                      to="/fabrics"
                    >
                      Manage Fabrics
                    </Link>

                    <Link
                      component={RouterLink}
                      sx={{ textDecoration: "none" }}
                      color="#fafafa"
                      to="/planning"
                    >
                      Planning Tool
                    </Link>

                    <Link
                      component={RouterLink}
                      sx={{ textDecoration: "none" }}
                      color="#fafafa"
                      to="/about"
                    >
                      About
                    </Link>

                    <LogOutButton />
                  </Stack>
                </>
              )}
            </Toolbar>
          </AppBar>
        </Box>
      ) : (
        <Box></Box>
      )}
    </Box>
  );
}

export default Nav;
