import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import type { Invoice } from '~/types';
import moment from 'moment';

// Extend jsPDF type to include autoTable plugin
declare module 'jspdf' {
  interface jsPDF {
    lastAutoTable: {
      finalY: number;
    };
  }
}

/**
 * Generate and download a PDF for an invoice
 */
export const generateInvoicePDF = async (invoice: Invoice): Promise<void> => {
  const doc = new jsPDF();
  
  // Set font styles
  doc.setFontSize(20);
  doc.setFont('helvetica', 'bold');
  doc.text('INVOICE', 105, 20, { align: 'center' });
  
  // Invoice number
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text(`Invoice #${invoice.invoiceNumber}`, 105, 28, { align: 'center' });
  
  // From section
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text('From:', 20, 45);
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text(invoice.billFrom.businessName, 20, 52);
  doc.text(invoice.billFrom.email, 20, 58);
  doc.text(invoice.billFrom.phoneNumber, 20, 64);
  doc.text(invoice.billFrom.address, 20, 70);
  
  // To section
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text('To:', 120, 45);
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text(invoice.billTo.clientName, 120, 52);
  doc.text(invoice.billTo.email, 120, 58);
  doc.text(invoice.billTo.phoneNumber, 120, 64);
  doc.text(invoice.billTo.address, 120, 70);
  
  // Invoice details
  doc.setFontSize(10);
  doc.text(`Invoice Date: ${moment(invoice.invoiceDate).format('MMM DD, YYYY')}`, 20, 85);
  doc.text(`Due Date: ${moment(invoice.dueDate).format('MMM DD, YYYY')}`, 20, 91);
  doc.text(`Status: ${invoice.status}`, 20, 97);
  
  // Items table
  const tableData = invoice.items.map(item => [
    item.name + (item.description ? `\n${item.description}` : ''),
    item.quantity.toString(),
    `$${item.unitPrice.toFixed(2)}`,
    `${item.taxPercent}%`,
    `$${item.total.toFixed(2)}`
  ]);
  
  autoTable(doc, {
    startY: 105,
    head: [['Item', 'Quantity', 'Unit Price', 'Tax %', 'Total']],
    body: tableData,
    theme: 'striped',
    headStyles: { fillColor: [25, 118, 210] },
  });
  
  // Get the final Y position after the table
  const finalY = doc.lastAutoTable.finalY || 105;
  
  // Totals
  const totalsStartY = finalY + 10;
  doc.setFontSize(10);
  doc.text(`Subtotal: $${invoice.subTotal.toFixed(2)}`, 140, totalsStartY);
  doc.text(`Tax: $${invoice.taxTotal.toFixed(2)}`, 140, totalsStartY + 6);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.text(`Total: $${invoice.total.toFixed(2)}`, 140, totalsStartY + 14);
  
  // Notes and Payment Terms
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  let notesY = totalsStartY + 25;
  
  if (invoice.notes) {
    doc.setFont('helvetica', 'bold');
    doc.text('Notes:', 20, notesY);
    doc.setFont('helvetica', 'normal');
    const splitNotes = doc.splitTextToSize(invoice.notes, 170);
    doc.text(splitNotes, 20, notesY + 6);
    notesY += 6 + (splitNotes.length * 5);
  }
  
  if (invoice.paymentTerms) {
    doc.setFont('helvetica', 'bold');
    doc.text('Payment Terms:', 20, notesY + 6);
    doc.setFont('helvetica', 'normal');
    doc.text(invoice.paymentTerms, 20, notesY + 12);
  }
  
  // Download the PDF
  doc.save(`Invoice-${invoice.invoiceNumber}.pdf`);
};
