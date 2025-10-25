import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router";
import { useAuth } from "~/context/AuthContext";
import DashboardLayout from "./DashboardLayout";
import { createLogger } from "~/utils/logger";
import { Box, CircularProgress, Typography } from "@mui/material";

const logger = createLogger('ProtectedRoute');

const ProtectedLayout = () => {
  const { isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      logger.warn('Unauthorized access attempt, redirecting to login');
      navigate("/login", { replace: true });
    }
  }, [isAuthenticated, isLoading, navigate]);

  if (isLoading) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box sx={{ textAlign: "center" }}>
          <CircularProgress size={48} sx={{ color: "grey.900" }} />
          <Typography variant="body1" color="text.secondary" sx={{ mt: 2 }}>
            Loading...
          </Typography>
        </Box>
      </Box>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "grey.50" }}>
        <Outlet />
    </Box>
  );
};

export default ProtectedLayout;
