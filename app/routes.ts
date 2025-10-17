import { type RouteConfig, index, route, layout } from "@react-router/dev/routes";

export default [
  // Public routes
  layout("components/layout/PublicLayout.tsx", [
    index("routes/home.tsx"),
    route("landing", "routes/landing/landing-page.tsx"),
  ]),

  // Auth routes (redirects to dashboard if already authenticated)
  layout("components/layout/AuthLayout.tsx", [
    route("login", "routes/auth/login.tsx"),
    route("signup", "routes/auth/signup.tsx"),
  ]),

  // Protected routes (requires authentication)
  layout("components/layout/ProtectedLayout.tsx", [
    layout("components/layout/DashboardLayout.tsx", [
      route("dashboard", "routes/dashboard/dashboard.tsx"),
      route("profile", "routes/profile/profile-page.tsx"),
      route("invoices", "routes/invoices/all-invoices.tsx"),
      route("invoices/create", "routes/invoices/create-invoice.tsx"),
      route("invoices/:id", "routes/invoices/invoice-details.tsx"),
    ]),
  ]),
] satisfies RouteConfig;
