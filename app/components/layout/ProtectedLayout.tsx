import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router";
import { useAuth } from "~/context/AuthContext";
import DashboardLayout from "./DashboardLayout";
import { createLogger } from "~/utils/logger";

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
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardLayout>
        <Outlet />
      </DashboardLayout>
    </div>
  );
};

export default ProtectedLayout;
