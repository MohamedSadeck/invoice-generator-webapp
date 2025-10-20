
import { Box } from "@mui/material";
import Header from "~/components/landing/Header";
import Hero from "~/components/landing/Hero";
import Features from "~/components/landing/Features";
import Testimonials from "~/components/landing/Testimonials";
import Faqs from "~/components/landing/Faqs";

const LandingPage = () => {
  return (
    <Box sx={{ bgcolor: 'background.default', minHeight: 'calc(100vh - 64px)' }}>
      <Header />
      <main>
        <Hero />
        <Features />
        <Testimonials />
        <Faqs />
      </main>
    </Box>
  );
};

export default LandingPage;

