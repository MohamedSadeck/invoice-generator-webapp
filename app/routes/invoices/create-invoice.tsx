import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "~/context/AuthContext";
import moment from "moment";
import type { Invoice, InvoiceFormData } from "~/types";
import logger from "~/utils/logger";
import axiosInstance from "~/utils/axiosInstance";
import { API_PATHS } from "~/utils/apiPaths";
import {
  Box,
  Button,
  Typography,
  Container,
  Stack,
} from "@mui/material";
import { Save, X, Wand2 } from "lucide-react";
import InvoiceDetailsSection from "~/components/invoices/InvoiceDetailsSection";
import BillFromSection from "~/components/invoices/BillFromSection";
import BillToSection from "~/components/invoices/BillToSection";
import ItemsSection from "~/components/invoices/ItemsSection";
import NotesAndTermsSection from "~/components/invoices/NotesAndTermsSection";
import InvoiceSummary from "~/components/invoices/InvoiceSummary";
import CreateWithAiModal from "~/components/invoices/CreateWithAiModal";

const CreateInvoice = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();

  // Get existing invoice from location state if editing
  const existingInvoice = location.state?.existingInvoice as InvoiceFormData | null;
  const aiData = location.state?.aiData;
  const isFromAi = Boolean(aiData);

  const [formData, setFormData] = useState<InvoiceFormData>(existingInvoice || {
    invoiceNumber: '',
    invoiceDate: new Date().toISOString().split('T')[0],
    dueDate: "",
    billFrom: {
      businessName: user?.businessName || '',
      email: user?.email || '',
      address: user?.address || '',
      phoneNumber: user?.phoneNumber || '',
    },
    billTo: {
      clientName: '',
      email: '',
      address: '',
      phoneNumber: '',
    },
    items: [{
      name: '',
      description: '',
      quantity: 1,
      unitPrice: 0,
      taxPercent: 0,
      total: 0,
    }],
    notes: '',
    paymentTerms: 'Net 15',
  });

  const [loading, setLoading] = useState<boolean>(false);
  const [isGeneratingNumber, setIsGeneratingNumber] = useState<boolean>(false);
  const [isAiModalOpen, setIsAiModalOpen] = useState<boolean>(false);

  useEffect(() => {
    if (aiData) {
      setFormData(prev => ({
        ...prev,
        billTo: {
          clientName: aiData.clientName || '',
          email: aiData.email || '',
          address: aiData.address || '',
          phoneNumber: aiData.phoneNumber || '',
        },
        items: aiData.items?.map((item: any) => ({
          name: item.name || '',
          description: item.description || '',
          quantity: item.quantity || 1,
          unitPrice: item.unitPrice || 0,
          taxPercent: item.taxPercent || 0,
          total: (item.quantity || 1) * (item.unitPrice || 0),
        })) || [{ name: '', description: '', quantity: 1, unitPrice: 0, taxPercent: 0, total: 0 }],
      }));
    }

    if (existingInvoice) {
      setFormData({
        ...existingInvoice,
        invoiceDate: moment(existingInvoice.invoiceDate).format('YYYY-MM-DD'),
        dueDate: moment(existingInvoice.dueDate).format('YYYY-MM-DD'),
      });
    } else {
      const generateNewInvoiceNumber = async () => {
        setIsGeneratingNumber(true);
        try {
          const response = await axiosInstance.get(API_PATHS.INVOICES.GET_ALL_INVOICES);
          const invoices: Invoice[] = response.data.data;
          let maxNum = 0;

          invoices.forEach(inv => {
            const num = parseInt(inv.invoiceNumber.split('-')[1]);
            if (!isNaN(num) && num > maxNum) maxNum = num;
          });
          const newInvoiceNumber = `INT-${String(maxNum+1).padStart(3,'0')}`;
          setFormData(prev => ({...prev, invoiceNumber: newInvoiceNumber }));
        } catch (error) {
          logger.error('Error generating invoice number', {
            error: error instanceof Error ? error.message : 'Unknown error'
          });
          setFormData(prev => ({...prev, invoiceNumber: `INV-${String(Date.now()).slice(-5)}` }));
        } finally {
          setIsGeneratingNumber(false);
        }
      };

      generateNewInvoiceNumber();
    }
  }, [existingInvoice, location.state]);

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleBillFromChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      billFrom: { ...prev.billFrom, [field]: value }
    }));
  };

  const handleBillToChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      billTo: { ...prev.billTo, [field]: value }
    }));
  };

  const handleItemChange = (index: number, field: string, value: any) => {
    const newItems = [...formData.items];
    newItems[index] = { ...newItems[index], [field]: value };
    
    // Calculate total for the item
    const item = newItems[index];
    const subtotal = item.quantity * item.unitPrice;
    const taxAmount = (subtotal * item.taxPercent) / 100;
    newItems[index].total = subtotal + taxAmount;

    setFormData(prev => ({ ...prev, items: newItems }));
  };

  const addItem = () => {
    setFormData(prev => ({
      ...prev,
      items: [...prev.items, {
        name: '',
        description: '',
        quantity: 1,
        unitPrice: 0,
        taxPercent: 0,
        total: 0,
      }]
    }));
  };

  const deleteItem = (index: number) => {
    if (formData.items.length > 1) {
      setFormData(prev => ({
        ...prev,
        items: prev.items.filter((_, i) => i !== index)
      }));
    }
  };

  const calculateSubtotal = () => {
    return formData.items.reduce((sum, item) => sum + (item.quantity * item.unitPrice), 0);
  };

  const calculateTax = () => {
    return formData.items.reduce((sum, item) => {
      const subtotal = item.quantity * item.unitPrice;
      return sum + (subtotal * item.taxPercent) / 100;
    }, 0);
  };

  const calculateTotal = () => {
    return calculateSubtotal() + calculateTax();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // Add your save logic here
      logger.info('Saving invoice', { formData });
      // onSave(formData);
      // navigate to invoices list or details
    } catch (error) {
      logger.error('Error saving invoice', {
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" component="h1" fontWeight="bold">
          Create Invoice
        </Typography>
        
        {!isFromAi && (
          <Button
            variant="outlined"
            startIcon={<Wand2 size={18} />}
            onClick={() => setIsAiModalOpen(true)}
            sx={{
              textTransform: 'none',
              borderColor: '#1976d2',
              color: '#1976d2',
              '&:hover': {
                borderColor: '#1565c0',
                bgcolor: 'rgba(25, 118, 210, 0.04)'
              }
            }}
          >
            Create with AI
          </Button>
        )}
      </Box>

      <CreateWithAiModal
        open={isAiModalOpen}
        onClose={() => setIsAiModalOpen(false)}
      />
      
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
        {/* Section 1: Invoice Details */}
        <InvoiceDetailsSection
          invoiceNumber={formData.invoiceNumber}
          invoiceDate={formData.invoiceDate}
          dueDate={formData.dueDate}
          isGeneratingNumber={isGeneratingNumber}
          onInvoiceNumberChange={(value) => handleInputChange('invoiceNumber', value)}
          onInvoiceDateChange={(value) => handleInputChange('invoiceDate', value)}
          onDueDateChange={(value) => handleInputChange('dueDate', value)}
        />

        {/* Section 2: Bill From & Bill To */}
        <Stack 
          direction={{ xs: 'column', lg: 'row' }} 
          spacing={3} 
          sx={{ mb: 3 }}
        >
          <BillFromSection
            billFrom={formData.billFrom}
            onBillFromChange={handleBillFromChange}
          />
          <BillToSection
            billTo={formData.billTo}
            onBillToChange={handleBillToChange}
          />
        </Stack>

        {/* Section 3: Items */}
        <ItemsSection
          items={formData.items}
          onItemChange={handleItemChange}
          onAddItem={addItem}
          onDeleteItem={deleteItem}
        />

        {/* Section 4: Notes & Terms + Summary */}
        <Stack 
          direction={{ xs: 'column', md: 'row' }} 
          spacing={3} 
          sx={{ mb: 3 }}
          alignItems="stretch"
        >
          <Box sx={{ flex: { xs: 1, md: 2 } }}>
            <NotesAndTermsSection
              notes={formData.notes}
              paymentTerms={formData.paymentTerms}
              onNotesChange={(value) => handleInputChange('notes', value)}
              onPaymentTermsChange={(value) => handleInputChange('paymentTerms', value)}
            />
          </Box>

          <Box sx={{ flex: 1 }}>
            <InvoiceSummary
              subtotal={calculateSubtotal()}
              tax={calculateTax()}
              total={calculateTotal()}
            />
          </Box>
        </Stack>

        {/* Submit Buttons */}
        <Stack 
          direction="row" 
          spacing={2} 
          justifyContent="flex-end"
        >
          <Button
            variant="outlined"
            startIcon={<X size={18} />}
            onClick={() => navigate('/dashboard/invoices')}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="contained"
            startIcon={<Save size={18} />}
            disabled={loading}
          >
            {loading ? 'Saving...' : 'Save Invoice'}
          </Button>
        </Stack>
      </Box>
    </Container>
  )
}

export default CreateInvoice
