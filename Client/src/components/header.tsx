import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Stack,
  Avatar,
} from "@mui/material";
import { Link } from "react-router-dom";
import useUserStore from "../store/userStore";

const navLinks = [
  { label: "Blogs", path: "/blogs" },
  { label: "New Blog", path: "/blogs/new" },
  { label: "My Blogs", path: "/blogs/myBlogs" },
  { label: "Profile", path: "/user/profile" },
];

function Header() {
  const { user } = useUserStore();
  if (user) {
    return (
      <Stack
        direction="row"
        component="nav"
        spacing={6}
        alignItems="center"
        justifyContent="space-between"
      >
        <Stack>
          <Typography fontSize="1.6rem" fontWeight='750' fontStyle='italic'>BlogApp</Typography>
        </Stack>
        <Stack
          direction="row"
          component="nav"
          spacing={3}
          alignItems="center"
          justifyContent="space-between"

        >
          {navLinks.map((link) => (
            <Link
              key={link.label}
              to={link.path}
              style={{ textDecoration: "none" }}
            >
              <Typography variant="body1" fontWeight="600" color="grey">
                {link.label}
              </Typography>
            </Link>
          ))}
          <Typography variant="body1" fontWeight="600" color="grey">
            Welcome {user.firstName}
          </Typography>
          <Avatar sx={{ bgcolor: "secondary.main" }}>
            {user.firstName[0].toUpperCase()}
            {user.lastName[0].toUpperCase()}
          </Avatar>
        </Stack>
      </Stack>
    );
  } else {
    return (
      <AppBar position="static" sx={{ bgcolor: "orange", mb: ".3rem" }}>
        <Toolbar>
          <Typography
            variant="h6"
            sx={{ flexGrow: 1, textDecoration: "none", color: "inherit" }}
            component={Link}
            to="/"
          >
            BlogApp
          </Typography>

          <Button color="inherit" component={Link} to="/login">
            Login
          </Button>
          <Button color="inherit" component={Link} to="/register">
            Register
          </Button>
        </Toolbar>
      </AppBar>
    );
  }
}

export default Header;
