import { redirect } from "react-router";
import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Invoice Generator - AI-Powered Invoice Management" },
    { name: "description", content: "Generate professional invoices with AI assistance" },
  ];
}

export async function loader({}: Route.LoaderArgs) {
  return redirect("/landing");
}

const Home = () => {
  return null;
}

export default Home

