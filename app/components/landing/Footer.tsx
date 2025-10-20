import { Box, Container, Typography, Link, Grid, Divider } from '@mui/material'
import { Github, Twitter, Linkedin, Mail } from 'lucide-react'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <Box component="footer" sx={{ bgcolor: 'grey.900', color: 'grey.300', py: 6 }}>
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* Brand Section */}
          <Grid size={{ xs: 12, md: 4 }}>
            <Typography variant="h6" sx={{ color: 'white', fontWeight: 600, mb: 2 }}>
              AI Invoice Generator
            </Typography>
            <Typography variant="body2" sx={{ mb: 2 }}>
              Create professional invoices instantly with the power of AI. 
              Streamline your billing process and get paid faster.
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
              <Link
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                sx={{ color: 'grey.300', '&:hover': { color: 'primary.main' } }}
              >
                <Github size={20} />
              </Link>
              <Link
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                sx={{ color: 'grey.300', '&:hover': { color: 'primary.main' } }}
              >
                <Twitter size={20} />
              </Link>
              <Link
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                sx={{ color: 'grey.300', '&:hover': { color: 'primary.main' } }}
              >
                <Linkedin size={20} />
              </Link>
              <Link
                href="mailto:support@aiinvoice.com"
                sx={{ color: 'grey.300', '&:hover': { color: 'primary.main' } }}
              >
                <Mail size={20} />
              </Link>
            </Box>
          </Grid>

          {/* Product Links */}
          <Grid size={{ xs: 6, md: 2 }}>
            <Typography variant="subtitle1" sx={{ color: 'white', fontWeight: 600, mb: 2 }}>
              Product
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Link href="/#features" sx={{ color: 'grey.300', textDecoration: 'none', '&:hover': { color: 'primary.main' } }}>
                Features
              </Link>
              <Link href="/pricing" sx={{ color: 'grey.300', textDecoration: 'none', '&:hover': { color: 'primary.main' } }}>
                Pricing
              </Link>
              <Link href="/integrations" sx={{ color: 'grey.300', textDecoration: 'none', '&:hover': { color: 'primary.main' } }}>
                Integrations
              </Link>
              <Link href="/templates" sx={{ color: 'grey.300', textDecoration: 'none', '&:hover': { color: 'primary.main' } }}>
                Templates
              </Link>
            </Box>
          </Grid>

          {/* Company Links */}
          <Grid size={{ xs: 6, md: 2 }}>
            <Typography variant="subtitle1" sx={{ color: 'white', fontWeight: 600, mb: 2 }}>
              Company
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Link href="/about" sx={{ color: 'grey.300', textDecoration: 'none', '&:hover': { color: 'primary.main' } }}>
                About
              </Link>
              <Link href="/blog" sx={{ color: 'grey.300', textDecoration: 'none', '&:hover': { color: 'primary.main' } }}>
                Blog
              </Link>
              <Link href="/careers" sx={{ color: 'grey.300', textDecoration: 'none', '&:hover': { color: 'primary.main' } }}>
                Careers
              </Link>
              <Link href="/contact" sx={{ color: 'grey.300', textDecoration: 'none', '&:hover': { color: 'primary.main' } }}>
                Contact
              </Link>
            </Box>
          </Grid>

          {/* Support Links */}
          <Grid size={{ xs: 6, md: 2 }}>
            <Typography variant="subtitle1" sx={{ color: 'white', fontWeight: 600, mb: 2 }}>
              Support
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Link href="/help" sx={{ color: 'grey.300', textDecoration: 'none', '&:hover': { color: 'primary.main' } }}>
                Help Center
              </Link>
              <Link href="/#FAQ" sx={{ color: 'grey.300', textDecoration: 'none', '&:hover': { color: 'primary.main' } }}>
                FAQ
              </Link>
              <Link href="/docs" sx={{ color: 'grey.300', textDecoration: 'none', '&:hover': { color: 'primary.main' } }}>
                Documentation
              </Link>
              <Link href="/api" sx={{ color: 'grey.300', textDecoration: 'none', '&:hover': { color: 'primary.main' } }}>
                API
              </Link>
            </Box>
          </Grid>

          {/* Legal Links */}
          <Grid size={{ xs: 6, md: 2 }}>
            <Typography variant="subtitle1" sx={{ color: 'white', fontWeight: 600, mb: 2 }}>
              Legal
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Link href="/privacy" sx={{ color: 'grey.300', textDecoration: 'none', '&:hover': { color: 'primary.main' } }}>
                Privacy
              </Link>
              <Link href="/terms" sx={{ color: 'grey.300', textDecoration: 'none', '&:hover': { color: 'primary.main' } }}>
                Terms
              </Link>
              <Link href="/security" sx={{ color: 'grey.300', textDecoration: 'none', '&:hover': { color: 'primary.main' } }}>
                Security
              </Link>
              <Link href="/cookies" sx={{ color: 'grey.300', textDecoration: 'none', '&:hover': { color: 'primary.main' } }}>
                Cookies
              </Link>
            </Box>
          </Grid>
        </Grid>

        <Divider sx={{ my: 4, borderColor: 'grey.700' }} />

        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
          <Typography variant="body2" color="grey.400">
            © {currentYear} AI Invoice Generator. All rights reserved.
          </Typography>
          <Typography variant="body2" color="grey.400">
            Made with ❤️ for small businesses and freelancers
          </Typography>
        </Box>
      </Container>
    </Box>
  )
}

export default Footer
