import {
  Box,
  Typography,
  Stack,
  TextField,
  Button,
  Paper,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import axiosInstance from "../api/axiosInstance";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import useUser from "../store/userStore";

interface UserDetails {
  firstName: string;
  lastName: string;
  userName: string;
  emailAddress: string;
}

interface PasswordDetails {
  currentPassword: string;
  newPassword: string;
}

export default function Profile() {
  const { user, logoutUser } = useUser();
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userName, setUserName] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  useEffect(() => {
    if (user) {
      setFirstName(user.firstName || "");
      setLastName(user.lastName || "");
      setUserName(user.userName || "");
      setEmailAddress(user.emailAddress || "");
    }
  }, [user]);

  const updateUserMutation = useMutation({
    mutationKey: ["update-user"],
    mutationFn: async (details: UserDetails) => {
      await axiosInstance.patch("/api/user/", details);
    },
    onSuccess: () => {
      toast.success("Profile updated successfully");
      navigate("/");
    },
    onError: () => {
      toast.error("Error updating profile");
    },
  });

  const updatePasswordMutation = useMutation({
    mutationKey: ["update-password"],
    mutationFn: async (details: PasswordDetails) => {
      const res = await axiosInstance.put("/api/user/password", details);
      return res.data;
    },
    onSuccess: (data) => {
      if (data.success) {
        toast.success("Password updated");
        setCurrentPassword("");
        setNewPassword("");
        setPasswordError("");
      } else {
        setPasswordError("Current password is incorrect");
      }
    },
    onError: () => {
      setPasswordError("Something went wrong updating the password");
    },
  });

  function handleUpdateProfile() {
    const details = { firstName, lastName, userName, emailAddress };
    updateUserMutation.mutate(details);
  }

  function handleUpdatePassword() {
    if (currentPassword.trim() === "" || newPassword.trim() === "") {
      setPasswordError("Please fill in both password fields");
      return;
    }
    updatePasswordMutation.mutate({ currentPassword, newPassword });
  }

  if (!user) {
    navigate("/login");
    return null;
  }

  return (
    <Box component="section" px={3} py={6} maxWidth="sm" mx="auto">
      <Typography
        variant="h4"
        fontWeight="bold"
        gutterBottom
        textAlign="center"
      >
        My Profile
      </Typography>

      <Stack spacing={4}>
        <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
          <Typography variant="h6" gutterBottom>
            Update Profile Info
          </Typography>
          <Stack spacing={2}>
            <TextField
              label="First Name"
              variant="outlined"
              fullWidth
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <TextField
              label="Last Name"
              variant="outlined"
              fullWidth
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
            <TextField
              label="Username"
              variant="outlined"
              fullWidth
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
            <TextField
              label="Email Address"
              variant="outlined"
              type="email"
              fullWidth
              value={emailAddress}
              onChange={(e) => setEmailAddress(e.target.value)}
            />
            <Button
              variant="contained"
              size="large"
              onClick={handleUpdateProfile}
            >
              Save Changes
            </Button>
          </Stack>
        </Paper>

        <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
          <Typography variant="h6" gutterBottom>
            Change Password
          </Typography>
          <Stack spacing={2}>
            <TextField
              label="Current Password"
              variant="outlined"
              type="password"
              fullWidth
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
            />
            <TextField
              label="New Password"
              variant="outlined"
              type="password"
              fullWidth
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            {passwordError && (
              <Typography color="error">{passwordError}</Typography>
            )}
            <Button
              variant="contained"
              size="large"
              onClick={handleUpdatePassword}
            >
              Update Password
            </Button>
          </Stack>
        </Paper>

        <Stack alignItems="center" mt={2}>
          <Button
            onClick={logoutUser}
            variant="outlined"
            color="error"
            size="large"
          >
            Log Out
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
}
