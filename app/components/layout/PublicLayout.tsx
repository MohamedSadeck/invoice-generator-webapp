import { Outlet, Link } from "react-router";
import {
  Box,
  AppBar,
  Toolbar,
  Container,
  Typography,
  Button,
  Link as MuiLink,
} from "@mui/material";

const PublicLayout = () => {
  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "background.paper" }}>
      {/* Navigation Header */}
      <AppBar
        position="static"
        elevation={0}
        sx={{
          bgcolor: "background.paper",
          borderBottom: 1,
          borderColor: "divider",
        }}
      >
        <Container maxWidth="lg">
          <Toolbar disableGutters sx={{ height: 64, justifyContent: "space-between" }}>
            <MuiLink
              component={Link}
              to="/"
              underline="none"
              sx={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  fontWeight: "bold",
                  color: "grey.900",
                }}
              >
                Invoice Generator
              </Typography>
            </MuiLink>

            <Box component="nav" sx={{ display: "flex", gap: 2 }}>
              <Button
                component={Link}
                to="/login"
                sx={{
                  px: 2,
                  py: 1,
                  fontSize: "0.875rem",
                  fontWeight: "medium",
                  color: "grey.700",
                  textTransform: "none",
                  "&:hover": {
                    color: "grey.900",
                    bgcolor: "grey.100",
                  },
                }}
              >
                Login
              </Button>
              <Button
                component={Link}
                to="/signup"
                variant="contained"
                sx={{
                  px: 2,
                  py: 1,
                  fontSize: "0.875rem",
                  fontWeight: "medium",
                  bgcolor: "grey.900",
                  textTransform: "none",
                  "&:hover": {
                    bgcolor: "grey.800",
                  },
                }}
              >
                Sign Up
              </Button>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Main Content */}
      <Box component="main">
        <Outlet />
      </Box>
    </Box>
  );
};

export default PublicLayout;
