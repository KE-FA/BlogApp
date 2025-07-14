import { useState } from "react";
import axios from "axios";
import {
  TextField,
  Button,
  Box,
  Typography,
  Paper,
  Link,
  Alert,
} from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
interface User {
  firstName: string;
  lastName: string;
  emailAddress: string;
  userName: string;
  password: string;
}

function Register() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userName, setUserName] = useState("");
  const [emailAddress, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confpassword, setConfPassword] = useState("");
  const [formError, setFormError] = useState("");

  const navigate = useNavigate();

  const { isPending, mutate } = useMutation({
    mutationKey: ["register-user"],
    mutationFn: async (newUser: User) => {
      const response = await axios.post(
        "https://blogapp-nazq.onrender.com/api/auth/register",
        newUser
      );
      console.log(response);
      return response.data;
    },
    onError: (err) => {
      if (axios.isAxiosError(err)) {
        setFormError(err.response?.data.message);
      } else {
        setFormError("Something went wrong");
      }
      //  console.log(err)
    },
    onSuccess: () => {
      navigate("/login");
    },
  });

  function handleSignUp() {
    setFormError("");
    if (password !== confpassword) {
      setFormError("Password and Confirm password must match");
      return;
    }
    const newUser = { firstName, lastName, userName, emailAddress, password };
    // console.log(newUser);
    mutate(newUser);
  }

  return (
    <Box sx={{ maxWidth: 400, mx: "auto", mt: 5 }}>
      <Typography variant="h4" sx={{ pl: "2.5rem" }} gutterBottom>
        Create an account
      </Typography>
      <Paper component="form" sx={{ p: 1.8 }}>
        {formError && (
          <Alert severity="error" sx={{ mb: "1rem" }}>
            {formError}
          </Alert>
        )}
        <TextField
          name="firstName"
          label="First Name"
          fullWidth
          sx={{ mb: "10px" }}
          required
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <TextField
          name="lastName"
          label="Last Name"
          fullWidth
          sx={{ mb: "10px" }}
          required
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        <TextField
          name="username"
          label="Username"
          fullWidth
          sx={{ mb: "10px" }}
          required
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
        <TextField
          name="emailAddress"
          label="Email"
          type="emailAddress"
          fullWidth
          sx={{ mb: "10px" }}
          required
          value={emailAddress}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          name="password"
          label="Password"
          type="password"
          fullWidth
          sx={{ mb: "10px" }}
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <TextField
          name="confpassword"
          label="Confirm Password"
          type="password"
          fullWidth
          required
          value={confpassword}
          onChange={(e) => setConfPassword(e.target.value)}
        />

        <Button
          variant="contained"
          onClick={handleSignUp}
          fullWidth
          sx={{ mt: 2 }}
          loading={isPending}
        >
          Register
        </Button>
        <Typography sx={{ mt: "9px" }}>
          Already Have an account?
          <Link underline="hover" href="./login">
            Login
          </Link>
        </Typography>
      </Paper>
    </Box>
  );
}

export default Register;
