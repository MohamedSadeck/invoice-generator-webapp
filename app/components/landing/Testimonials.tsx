import { Box, Container, Typography, Grid, Card, CardContent, Avatar } from '@mui/material';
import { TESTIMONIALS } from '~/utils/data';

const Testimonials = () => {
  return (
    <Box id="testimonials" sx={{ py: 8, bgcolor: 'grey.50' }}>
      <Container maxWidth="lg">
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography
            variant="h3"
            component="h2"
            gutterBottom
            sx={{ fontWeight: 'bold', color: 'primary.main' }}
          >
            What Our Users Say
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 600, mx: 'auto' }}>
            Don't just take our word for it — hear from professionals who transformed their invoicing workflow
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {TESTIMONIALS.map((testimonial) => (
            <Grid size={{ xs: 12, md: 4 }} key={testimonial.id}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  position: 'relative',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: 6,
                  },
                }}
              >
                <CardContent sx={{ flexGrow: 1, p: 3, display: 'flex', flexDirection: 'column' }}>
                  <Box
                    sx={{
                      fontSize: 40,
                      color: 'primary.main',
                      opacity: 0.3,
                      mb: 2,
                      fontFamily: 'serif',
                      fontWeight: 'bold',
                    }}
                  >
                    "
                  </Box>
                  
                  <Typography
                    variant="body1"
                    sx={{
                      mb: 3,
                      fontStyle: 'italic',
                      color: 'text.secondary',
                      lineHeight: 1.7,
                    }}
                  >
                    "{testimonial.quote}"
                  </Typography>

                  <Box sx={{ display: 'flex', alignItems: 'center', mt: 'auto' }}>
                    <Avatar
                      sx={{
                        bgcolor: 'primary.main',
                        width: 56,
                        height: 56,
                        mr: 2,
                        fontSize: '1.25rem',
                      }}
                    >
                      {testimonial.name.split(' ').map(n => n[0]).join('')}
                    </Avatar>
                    <Box>
                      <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                        {testimonial.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {testimonial.role}
                        {testimonial.company && ` at ${testimonial.company}`}
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Testimonials;
