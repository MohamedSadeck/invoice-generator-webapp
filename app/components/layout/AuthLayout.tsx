import { Outlet } from "react-router";
import { redirect } from "react-router";
import { useAuth } from "~/context/AuthContext";

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
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Outlet />
    </div>
  );
};

export default AuthLayout;
