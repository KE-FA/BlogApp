import { Box, Button, Container, TextField, Typography, Stack, Link } from "@mui/material";

const Login = () => {
  return (
    <Container
      maxWidth="sm"
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        minHeight:"82vh"
        
      }}
    >
      <Box
        sx={{
          padding: 4,
  
          borderRadius: 2,
          
        }}
      >
        <Typography variant="h4" gutterBottom sx={{ fontWeight: "bold", textAlign: "center" }}>
          Log In
        </Typography>

        <Stack spacing={3} mt={2}>
          <TextField
            label="Username or Email Address"
            variant="outlined"
            fullWidth
          />

          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
          />

          <Button variant="contained" size="large">
            Log In
          </Button>
        </Stack>
        <Typography sx={{mt:"1rem"}}>Don't Have an account?<Link href="/register">Register</Link></Typography>
      </Box>
    </Container>
  );
};

export default Login;
