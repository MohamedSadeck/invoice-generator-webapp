import {
  Card,
  CardContent,
  Typography,
  TextField,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from "@mui/material";
import { Plus, Trash2 } from "lucide-react";
import type { InvoiceItem } from "~/types";

interface ItemsSectionProps {
  items: InvoiceItem[];
  onItemChange: (index: number, field: string, value: any) => void;
  onAddItem: () => void;
  onDeleteItem: (index: number) => void;
}

const ItemsSection = ({
  items,
  onItemChange,
  onAddItem,
  onDeleteItem,
}: ItemsSectionProps) => {
  return (
    <Card sx={{ mb: 3 }}>
      <CardContent>
        <Typography variant="h6" fontWeight="600" gutterBottom>
          Items
        </Typography>
        <TableContainer component={Paper} variant="outlined" sx={{ mt: 2 }}>
          <Table>
            <TableHead>
              <TableRow sx={{ bgcolor: 'grey.50' }}>
                <TableCell><strong>Item</strong></TableCell>
                <TableCell align="center"><strong>Qty</strong></TableCell>
                <TableCell align="right"><strong>Price</strong></TableCell>
                <TableCell align="right"><strong>Tax (%)</strong></TableCell>
                <TableCell align="right"><strong>Total</strong></TableCell>
                <TableCell align="center"><strong>Action</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <TextField
                      fullWidth
                      size="small"
                      value={item.name}
                      onChange={(e) => onItemChange(index, 'name', e.target.value)}
                      placeholder="Item name"
                      required
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      type="number"
                      size="small"
                      value={item.quantity}
                      onChange={(e) => onItemChange(index, 'quantity', Number(e.target.value))}
                      inputProps={{ min: 1 }}
                      sx={{ width: 80 }}
                      required
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      type="number"
                      size="small"
                      value={item.unitPrice}
                      onChange={(e) => onItemChange(index, 'unitPrice', Number(e.target.value))}
                      inputProps={{ min: 0, step: 0.01 }}
                      sx={{ width: 100 }}
                      required
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      type="number"
                      size="small"
                      value={item.taxPercent}
                      onChange={(e) => onItemChange(index, 'taxPercent', Number(e.target.value))}
                      inputProps={{ min: 0, max: 100, step: 0.1 }}
                      sx={{ width: 80 }}
                    />
                  </TableCell>
                  <TableCell align="right">
                    <Typography fontWeight="600">
                      {item.total.toFixed(2)} DZD
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <IconButton
                      color="error"
                      onClick={() => onDeleteItem(index)}
                      disabled={items.length === 1}
                      size="small"
                    >
                      <Trash2 size={18} />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Button
          variant="outlined"
          startIcon={<Plus size={18} />}
          onClick={onAddItem}
          sx={{ mt: 2 }}
        >
          Add Item
        </Button>
      </CardContent>
    </Card>
  );
};

export default ItemsSection;
