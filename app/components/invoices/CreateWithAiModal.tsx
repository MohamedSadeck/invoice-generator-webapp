import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Typography, Box } from "@mui/material";
import { Wand2 } from 'lucide-react';
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import type { ParseInvoiceTextResponse } from "~/types";
import { API_PATHS } from "~/utils/apiPaths";
import axiosInstance from "~/utils/axiosInstance";
import logger from "~/utils/logger";

interface CreateWithAiModalProps {
  open: boolean;
  onClose: () => void;
}

const CreateWithAiModal = ({ open, onClose }: CreateWithAiModalProps) => {
  const [text, setText] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleGenerate = async () => {
    if(!text.trim()){
      toast.error('Please paste some text to generate an invoice.');
      return;
    }
    setIsLoading(true);
    try{
      const response = await axiosInstance.post<ParseInvoiceTextResponse>(API_PATHS.AI.PARSE_INVOICE_TEXT,{text});
      const invoiceData = response.data.data;

      toast.success("Invoice data extracted successfully!");
      onClose();
      setText(''); // Clear the text after successful generation

      navigate('/invoices/create', {state: { aiData: invoiceData}});
    }catch(error){
      toast.error('Failed to generate invoice from text.');
      logger.error('AI Parsing error', {
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }finally{
      setIsLoading(false);
    }
  }
  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>
        <Box display="flex" alignItems="center" gap={1}>
          <Wand2 size={24} color="#1976d2" />
          <span>Create Invoice with AI</span>
        </Box>
      </DialogTitle>
      <DialogContent>
        <Box sx={{ mt: 2 }}>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            Paste any text that contains invoice details (like client name, items, quantities, and prices) and the AI will attempt to create an invoice from it.
          </Typography>
          
          <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
            Paste invoice text here
          </Typography>
          
          <TextField
            fullWidth
            multiline
            rows={8}
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder='Example: "Invoice for TechCorp Inc (contact@techcorp.com, 123 Business St): 5 hours of web development at 25000da/hr, 3 hours of consulting at 40000da/hr, 1 logo design for 150000da"'
            variant="outlined"
            disabled={isLoading}
            helperText="💡 Tip: Include client name, contact info (optional), and itemize services/products with quantities and prices for best results"
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} disabled={isLoading}>Cancel</Button>
        <Button 
          variant="contained" 
          color="primary"
          onClick={handleGenerate}
          disabled={isLoading}
        >
          {isLoading ? 'Generating...' : 'Generate Invoice'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateWithAiModal;
