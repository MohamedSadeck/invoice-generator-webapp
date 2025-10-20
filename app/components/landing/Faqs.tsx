import React from 'react'
import { Box, Container, Typography, Accordion, AccordionSummary, AccordionDetails } from '@mui/material'
import { ChevronDown } from 'lucide-react'
import { FAQS } from '~/utils/data'

const Faqs = () => {
  const [expanded, setExpanded] = React.useState<string | false>('f1')

  const handleChange = (panel: string) => (_event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false)
  }

  return (
    <Box id="FAQ" sx={{ py: 10, bgcolor: 'background.default' }}>
      <Container maxWidth="md">
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography
            variant="h3"
            component="h2"
            gutterBottom
            sx={{ fontWeight: 'bold', color: 'primary.main' }}
          >
            Frequently Asked Questions
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 600, mx: 'auto' }}>
            Find answers to common questions about our AI invoice generator
          </Typography>
        </Box>

        <Box>
          {FAQS.map((faq) => (
            <Accordion
              key={faq.id}
              expanded={expanded === faq.id}
              onChange={handleChange(faq.id)}
              sx={{
                mb: 2,
                boxShadow: 1,
                '&:before': { display: 'none' },
                '&.Mui-expanded': { margin: '0 0 16px 0' },
              }}
            >
              <AccordionSummary
                expandIcon={<ChevronDown />}
                sx={{
                  '& .MuiAccordionSummary-content': {
                    my: 1.5,
                  },
                }}
              >
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  {faq.question}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.8 }}>
                  {faq.answer}
                </Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </Box>
      </Container>
    </Box>
  )
}

export default Faqs
