import { useState } from "react";
import {
  Box,
  Container,
  Typography,
  Button,
  Stack,
} from "@mui/material";
import { GrLanguage } from "react-icons/gr";
import Login from "./login";
import Register from "./register";

const Home = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  return (
    <>
      <Box
        sx={{
          backgroundImage: "url('./blog.jpg')",
          backgroundSize: "cover",
          minHeight: "100vh",
          
          
        }}
      >
        <Stack
          component="div"
          direction="row"
          sx={{ justifyContent: "space-between" }}
        >
          <Box>
            <Typography
              sx={{
                fontWeight: "700",
                fontStyle: "italic",
                fontSize: "2rem",
              }}
            >
              BlogApp
            </Typography>
          </Box>

          <Stack
            component="div"
            direction="row"
            sx={{ gap: "2.5rem", mt: ".4rem" }}
          >
            <Typography sx={{ mt: ".5rem" }}>
              <GrLanguage /> EN
            </Typography>
            <Button variant="contained" onClick={() => {
              setShowLogin(true);
              setShowRegister(false);
            }}>
              Log in
            </Button>
            <Button variant="contained" onClick={() => {
              setShowRegister(true);
              setShowLogin(false);
            }}>
              Sign Up
            </Button>
          </Stack>
        </Stack>

        <Container sx={{ textAlign: "center", mt: "10%" }}>
          <Typography
            sx={{ fontWeight: "900", fontSize: "2rem", fontStyle: "italic" }}
          >
            The Everyday Edit. See Our Thoughts, Stories and Ideas
          </Typography>
        </Container>

        <Container sx={{ mt: 5 }}>
          {showLogin && <Login />}
          {showRegister && <Register />}
        </Container>
      </Box>
    </>
  );
};

export default Home;
