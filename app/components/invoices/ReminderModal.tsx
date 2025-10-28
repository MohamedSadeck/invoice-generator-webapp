import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, IconButton, Box } from "@mui/material";
import { Copy } from "lucide-react";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import type { GenerateReminderResponse } from "~/types";
import { API_PATHS } from "~/utils/apiPaths";
import axiosInstance from "~/utils/axiosInstance";
import logger from "~/utils/logger";

interface ReminderModalProps {
  open: boolean;
  onClose: () => void;
  invoiceId: string | null;
}

const ReminderModal = ({ open, onClose, invoiceId }: ReminderModalProps) => {
  const [message, setMessage] = useState<string>("");
  const [isGenerating, setIsGenerating] = useState<boolean>(false);

  useEffect(() => {
    if (open && invoiceId) {
      generateReminder();
    }
  }, [open, invoiceId]);

  const generateReminder = async () => {
    if (!invoiceId) return;
    
    setIsGenerating(true);
    try {
      const response = await axiosInstance.post<{ data: GenerateReminderResponse }>(
        API_PATHS.AI.GENERATE_REMINDER,
        { invoiceId, reminderType: 'gentle' }
      );
      setMessage(response.data.data.body);
    } catch (error) {
      toast.error("Failed to generate reminder.");
      logger.error('Error generating reminder', {
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopyText = () => {
    navigator.clipboard.writeText(message);
    toast.success("Reminder text copied to clipboard!");
  };

  const handleClose = () => {
    setMessage("");
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>AI-Generated Reminder</DialogTitle>
      <DialogContent>
        <TextField
          fullWidth
          multiline
          rows={8}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder={isGenerating ? "Generating reminder..." : "AI-generated reminder will appear here"}
          disabled={isGenerating}
          sx={{ mt: 2 }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="secondary">
          Close
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={handleCopyText}
          startIcon={!isGenerating ? <Copy size={18} /> : undefined}
          disabled={isGenerating || !message}
        >
          {isGenerating ? 'Generating...' : 'Copy Text'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ReminderModal;
