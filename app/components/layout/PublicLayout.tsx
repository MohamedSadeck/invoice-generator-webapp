import { Outlet, Link } from "react-router";

const PublicLayout = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation Header */}
      <header className="border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="text-xl font-bold text-gray-900">
              Invoice Generator
            </Link>
            <nav className="flex space-x-4">
              <Link
                to="/login"
                className="px-4 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="px-4 py-2 rounded-md text-sm font-medium text-white bg-gray-900 hover:bg-gray-800"
              >
                Sign Up
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default PublicLayout;
