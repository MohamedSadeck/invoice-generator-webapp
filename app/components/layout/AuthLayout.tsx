import { Outlet } from "react-router";
import { redirect } from "react-router";
import { useAuth } from "~/context/AuthContext";
import { Box, CircularProgress, Typography } from "@mui/material";

// Loader: run before rendering the route. This checks localStorage for a token
// and redirects authenticated users to the dashboard. Loaders run on client
// and server; localStorage is only available in the browser so we guard access.
export async function loader() {
  try {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      const user = localStorage.getItem("user");
      if (token || user) {
        return redirect("/dashboard");
      }
    }
  } catch (e) {
    // If anything fails, don't block the auth UI; fall through to render.
  }

  return null;
}

const AuthLayout = () => {
  const { isLoading } = useAuth();

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

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "grey.50",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        p: 2,
      }}
    >
      <Outlet />
    </Box>
  );
};

export default AuthLayout;
