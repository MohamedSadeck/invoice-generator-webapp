import { Box, Card, CardContent, Container, Grid, Typography, List, ListItem, ListItemText } from '@mui/material'
import { Bolt, Palette, ListOrdered, Download, Link2 } from 'lucide-react'
import { FEATURES } from '~/utils/data'

const iconMap = {
  bolt: Bolt,
  palette: Palette,
  list: ListOrdered,
  download: Download,
  link: Link2,
}

const Features = () => {
  return (
    <Box id="features" sx={{ bgcolor: 'grey.50', py: 10 }}>
      <Container maxWidth="lg">
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography
            variant="h3"
            component="h2"
            gutterBottom
            sx={{ fontWeight: 'bold', color: 'primary.main' }}
          >
            Powerful Features
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 600, mx: 'auto' }}>
            Everything you need to create, manage, and send professional invoices
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {FEATURES.map((feature) => {
            const IconComponent = iconMap[feature.icon as keyof typeof iconMap] || Bolt
            return (
              <Grid size={{ xs: 12, md: 6, lg: 4 }} key={feature.id}>
                <Card
                  elevation={1}
                  sx={{
                    p: 3,
                    height: '90%',
                    bgcolor: 'white',
                    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      boxShadow: 4,
                    },
                  }}
                >
                  <CardContent>
                    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                      <IconComponent size={48} color="#1976d2" />
                    </Box>
                    <Typography variant="h5" component="h3" sx={{ fontWeight: 600, mb: 2, textAlign: 'center' }}>
                      {feature.title}
                    </Typography>
                    <Typography variant="body1" color="text.secondary" sx={{ mb: 2, textAlign: 'center' }}>
                      {feature.description}
                    </Typography>
                    {feature.bullets && feature.bullets.length > 0 && (
                      <List dense sx={{ mt: 2 }}>
                        {feature.bullets.map((bullet, index) => (
                          <ListItem key={index} sx={{ py: 0.5 }}>
                            <ListItemText
                              primary={bullet}
                              primaryTypographyProps={{
                                variant: 'body2',
                                color: 'text.secondary',
                              }}
                              sx={{
                                '& .MuiListItemText-primary::before': {
                                  content: '"• "',
                                  color: 'primary.main',
                                  fontWeight: 'bold',
                                },
                              }}
                            />
                          </ListItem>
                        ))}
                      </List>
                    )}
                  </CardContent>
                </Card>
              </Grid>
            )
          })}
        </Grid>
      </Container>
    </Box>
  )
}

export default Features
