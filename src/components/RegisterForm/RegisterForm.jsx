import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from 'react-router-dom';
import { Button } from "@mui/material";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import InputAdornment from "@mui/material/InputAdornment";
import AccountCircle from "@mui/icons-material/AccountCircle";

function RegisterForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const errors = useSelector((store) => store.errors);
  const dispatch = useDispatch();
  const history = useHistory();

  const registerUser = (event) => {
    event.preventDefault();

    dispatch({
      type: "REGISTER",
      payload: {
        username: username,
        password: password,
      },
    });
  }; // end registerUser

  return (
    <Box sx={{ display: "flex", justifyContent: "center", marginTop: 5, height: '100vh'  }}>
      <Card
        sx={{
          display: "flex",
          justifyContent: "space-between",
          flexDirection: "row",
          width: 7 / 10,
          height: "80vh",
          alignItems: "center",
          border: 1,
          backgroundColor: '#fafafa'
        }}
      >
        <CardContent>
          <Box
            sx={{ display: "flex", justifyContent: "center", width: "30vh" }}
          >
            <Box
              component="form"
              sx={{ display: "flex", flexDirection: "column" }}
              onSubmit={registerUser}
            >
              <Typography variant="h4">Sign Up!</Typography>
              {errors.registrationMessage && (
                <h3 className="alert" role="alert">
                  {errors.registrationMessage}
                </h3>
              )}
              <Box sx={{ marginTop: 6 }}>
                <TextField
                  type="text"
                  name="username"
                  label="Username"
                  variant="outlined"
                  required
                  fullWidth
                  value={username}
                  onChange={(event) => setUsername(event.target.value)}
                  sx={{ width: 266 }}
                  slotProps={{
                    input: {
                      startAdornment: (
                        <InputAdornment position="start">
                          <AccountCircle />
                        </InputAdornment>
                      ),
                    },
                  }}
                />
              </Box>
              <Box sx={{ marginTop: 2, marginBottom: 2 }}>
                <TextField
                  type="password"
                  name="password"
                  label="Password"
                  required
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  sx={{ width: 266 }}
                />
              </Box>
              <Box sx={{ marginBottom: 2 }}>
                <Button variant="contained" type="submit">
                  Register
                </Button>
              </Box>
              <Box>
                <Button
                  type="button"
                  variant="text"
                  className="btn btn_asLink"
                  onClick={() => {
                    history.push("/login");
                  }}
                >
                  Back to login
                </Button>
              </Box>
            </Box>
          </Box>
        </CardContent>
        <CardMedia
          sx={{ height: "80vh", width: "75vh" }}
          image="/assets/Fabric-Login.jpg"
          alt="Image of a Quilt"
        />
      </Card>
    </Box>
  );
}

export default RegisterForm;
