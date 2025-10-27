import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@mui/material";

interface CreateWithAiModalProps {
  open: boolean;
  onClose: () => void;
}

const CreateWithAiModal = ({ open, onClose }: CreateWithAiModalProps) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Create Invoice with AI</DialogTitle>
      <DialogContent>
        {/* AI invoice creation form will go here */}
        <p>AI-powered invoice creation feature coming soon...</p>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" color="primary">
          Generate Invoice
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateWithAiModal;
