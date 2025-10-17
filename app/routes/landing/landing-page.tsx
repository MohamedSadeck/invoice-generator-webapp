import { Link } from "react-router";
import { FileText, Zap, Shield } from "lucide-react";

const LandingPage = () => {
  return (
    <div className="min-h-[calc(100vh-64px)]">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            AI-Powered Invoice Generator
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Create professional invoices in seconds with the power of artificial intelligence
          </p>
          <div className="flex justify-center space-x-4">
            <Link
              to="/signup"
              className="px-6 py-3 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800"
            >
              Get Started
            </Link>
            <Link
              to="/login"
              className="px-6 py-3 border border-gray-900 text-gray-900 rounded-lg font-medium hover:bg-gray-50"
            >
              Sign In
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 bg-gray-50">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center p-6">
            <div className="flex justify-center mb-4">
              <FileText className="w-12 h-12 text-gray-900" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Easy to Use</h3>
            <p className="text-gray-600">
              Create invoices with just a few clicks
            </p>
          </div>
          <div className="text-center p-6">
            <div className="flex justify-center mb-4">
              <Zap className="w-12 h-12 text-gray-900" />
            </div>
            <h3 className="text-xl font-semibold mb-2">AI-Powered</h3>
            <p className="text-gray-600">
              Smart suggestions and automated calculations
            </p>
          </div>
          <div className="text-center p-6">
            <div className="flex justify-center mb-4">
              <Shield className="w-12 h-12 text-gray-900" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Secure</h3>
            <p className="text-gray-600">
              Your data is protected and encrypted
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;

