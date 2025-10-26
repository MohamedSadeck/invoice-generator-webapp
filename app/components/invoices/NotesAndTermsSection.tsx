import { Card, CardContent, Typography, Stack, TextField, MenuItem } from "@mui/material";

interface NotesAndTermsSectionProps {
  notes: string | undefined;
  paymentTerms: string;
  onNotesChange: (value: string) => void;
  onPaymentTermsChange: (value: string) => void;
}

const NotesAndTermsSection = ({
  notes,
  paymentTerms,
  onNotesChange,
  onPaymentTermsChange,
}: NotesAndTermsSectionProps) => {
  return (
    <Card sx={{ height: '100%' }}>
      <CardContent>
        <Typography variant="h6" fontWeight="600" gutterBottom>
          Notes & Terms
        </Typography>
        <Stack spacing={2} sx={{ mt: 2 }}>
          <TextField
            fullWidth
            label="Notes"
            value={notes || ''}
            onChange={(e) => onNotesChange(e.target.value)}
            multiline
            rows={4}
            placeholder="Additional notes or comments..."
          />
          <TextField
            fullWidth
            select
            label="Payment Terms"
            value={paymentTerms}
            onChange={(e) => onPaymentTermsChange(e.target.value)}
          >
            <MenuItem value="Net 15">Net 15</MenuItem>
            <MenuItem value="Net 30">Net 30</MenuItem>
            <MenuItem value="Net 45">Net 45</MenuItem>
            <MenuItem value="Net 60">Net 60</MenuItem>
            <MenuItem value="Due on Receipt">Due on Receipt</MenuItem>
          </TextField>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default NotesAndTermsSection;
