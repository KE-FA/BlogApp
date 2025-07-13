import { Container, Typography, Stack } from "@mui/material";

const Home = () => {
  return (
    <>
      <Stack
        sx={{
          backgroundImage: "url('./blog.jpg')",
          backgroundSize: "cover",
          minHeight: "80vh",
          width: "100%",
        }}
      >
        <Stack
          component="div"
          direction="row"
          sx={{ justifyContent: "space-between" }}
        ></Stack>

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
