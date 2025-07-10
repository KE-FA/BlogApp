
import {
  Box,
  Container,
  Typography,
  Button,
  Stack,
} from "@mui/material";
import { GrLanguage } from "react-icons/gr";


const Home = () => {

  return (
    <>
      <Stack
        sx={{
          backgroundImage: "url('./blog.jpg')",
          backgroundSize: "cover",
          minHeight: "80vh",
          width:"100%"
          
          
        }}
      >
        <Stack
          component="div"
          direction="row"
          sx={{ justifyContent: "space-between" }}
        >
          {/* <Box>
            <Typography
              sx={{
                fontWeight: "700",
                fontStyle: "italic",
                fontSize: "2rem",
              }}
            >
              BlogApp
            </Typography>
          </Box> */}

          {/* <Stack
            component="div"
            direction="row"
            sx={{ gap: "2.5rem", mt: ".4rem" }}
          >
            <Typography sx={{ mt: ".5rem" }}>
              <GrLanguage /> EN
            </Typography>
            <Button variant="contained" >
              Log in
            </Button>
            <Button variant="contained" href="/register" >
              Sign Up
            </Button>
          </Stack> */}
        </Stack>

        <Container sx={{ textAlign: "center", mt: "10%" }}>
          <Typography
            sx={{ fontWeight: "900", fontSize: "2rem", fontStyle: "italic" }}
          >
            The Everyday Edit. See Our Thoughts, Stories and Ideas
          </Typography>
        </Container>

      </Stack>
    </>
  );
};

export default Home;
