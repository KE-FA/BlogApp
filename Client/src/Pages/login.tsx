import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Stack,
  Link,
  Alert,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import axiosInstance from "../api/axiosInstance";
import axios from "axios";

interface LoginDetails {
  identifier: string;
  password: string;
}

function Login() {
  // const {setUser}= useUser();
  // const navigate = useNavigate();
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [formError, setFormError] = useState("");

  const { isPending, mutate } = useMutation({
    mutationKey: ["login-user"],
    mutationFn: async (loginDetails: LoginDetails) => {
      const response = await axiosInstance.post("auth/login", loginDetails);
      // console.log(response.data);
      return response.data;
    },
    onError: (err) => {
      if (axios.isAxiosError(err)) {
        setFormError(err.response?.data.message);
      } else {
        setFormError("Something went wrong");
      }
    },
    onSuccess: (data) => {
      console.log("Here is the data");
      console.log(data)
    },
  });

  function handleLogin() {
    setFormError("");
    mutate({ identifier, password });

    // setUser({

    //   firstName:"Ramon",
    //   lastName:"Emard",
    //   email:"test@gmail.com",
    //   username:"Vallie_Glover97",

    // });
    // navigate("/blogs")
  }

  return (
    <Container
      maxWidth="sm"
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        minHeight: "82vh",
      }}
    >
      <Box
        sx={{
          padding: 4,

          borderRadius: 2,
        }}
      >
        <Typography
          variant="h4"
          gutterBottom
          sx={{ fontWeight: "bold", textAlign: "center" }}
        >
          Log In To Your Account
        </Typography>

        <Stack spacing={3} mt={2}>
          {formError && <Alert severity="error">{formError}</Alert>}
          <TextField
            label="Email Address"
            variant="outlined"
            fullWidth
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
          />

          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <Button
            variant="contained"
            size="large"
            onClick={handleLogin}
            loading={isPending}
          >
            Log In
          </Button>
        </Stack>
        <Typography sx={{ mt: "1rem" }}>
          Don't Have an account?<Link href="/register">Register</Link>
        </Typography>
      </Box>
    </Container>
  );
}

export default Login;
