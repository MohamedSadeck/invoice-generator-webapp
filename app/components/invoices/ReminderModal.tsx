import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from "@mui/material";
import { useState } from "react";

interface ReminderModalProps {
  open: boolean;
  onClose: () => void;
  invoiceId: string | null;
}

const ReminderModal = ({ open, onClose, invoiceId }: ReminderModalProps) => {
  const [message, setMessage] = useState("");

  const handleSend = () => {
    // Send reminder logic will go here
    console.log("Sending reminder for invoice:", invoiceId);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Send Payment Reminder</DialogTitle>
      <DialogContent>
        <TextField
          fullWidth
          multiline
          rows={4}
          label="Reminder Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Enter your reminder message..."
          sx={{ mt: 2 }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" color="primary" onClick={handleSend}>
          Send Reminder
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ReminderModal;
