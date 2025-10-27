import { Outlet } from "react-router";
import { Box, Container } from "@mui/material";
import Header from "../app/Header";

const DashboardLayout = () => {
  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "grey.50" }}>
      <Header />

      {/* Main Content */}
      <Container
        component="main"
        maxWidth="lg"
        sx={{
          py: 4,
          px: { xs: 2, sm: 3, md: 4 },
        }}
      >
        <Box sx={{ marginTop: 3 }}>
          <Outlet />
        </Box>
      </Container>
    </Box>
  );
};

export default DashboardLayout;
