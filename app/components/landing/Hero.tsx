import { Box, Button, Container, Stack, Typography } from '@mui/material'
import { Link } from 'react-router'

const Hero = () => {
  return (
    <div>
      <Container maxWidth="lg" sx={{ py: 20 }}>
        <Box sx={{ textAlign: 'center' }}>
          <Typography 
            variant="h1" 
            sx={{ 
              fontSize: { xs: '2.5rem', md: '3.5rem' },
              fontWeight: 700,
              color: 'text.primary',
              mb: 3
            }}
          >
            AI-Powered Invoice Generator
          </Typography>
          <Typography 
            variant="h5" 
            sx={{ 
              color: 'text.secondary',
              mb: 4,
              maxWidth: '800px',
              mx: 'auto'
            }}
          >
            Create professional invoices in seconds with the power of artificial intelligence
          </Typography>
          <Stack 
            direction={{ xs: 'column', sm: 'row' }} 
            spacing={2} 
            justifyContent="center"
          >
            <Button
              component={Link}
              to="/signup"
              variant="contained"
              size="large"
              sx={{ 
                px: 4, 
                py: 1.5,
                fontSize: '1rem',
                fontWeight: 500
              }}
            >
              Get Started
            </Button>
            <Button
              component={Link}
              to="/login"
              variant="outlined"
              size="large"
              sx={{ 
                px: 4, 
                py: 1.5,
                fontSize: '1rem',
                fontWeight: 500
              }}
            >
              Sign In
            </Button>
          </Stack>
        </Box>
      </Container>
    </div>
  )
}

export default Hero
