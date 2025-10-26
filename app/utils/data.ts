import type { Feature, Testimonial, FAQ } from '~/types';

export const FEATURES: Feature[] = [
  {
    id: 'auto-generate',
    title: 'AI-powered Invoice Generation',
    description: 'Create professional invoices instantly from plain text, email threads, or uploaded documents using natural language parsing and templates.',
    bullets: ['Extract line items, prices and taxes automatically', 'Support for multiple currencies and locales'],
    icon: 'bolt'
  },
  {
    id: 'custom-templates',
    title: 'Customizable Templates',
    description: 'Choose or create invoice templates with your branding, payment terms, and legal text. Save templates for repeated use.',
    bullets: ['Branding (logo, colors, fonts)', 'Reusable template variables'],
    icon: 'palette'
  },
  {
    id: 'smart-recognition',
    title: 'Smart Line-item Recognition',
    description: 'Automatically group and categorize line items, suggest tax rates and discounts based on rules and past invoices.',
    bullets: ['Automatic category suggestions', 'Detect duplicates and mismatches'],
    icon: 'list'
  },
  {
    id: 'pdf-and-export',
    title: 'PDF Export & Sharing',
    description: 'Export invoices to PDF, download, or share via a secure link. Add optional password protection and expiration.',
    bullets: ['High-quality PDF with embedded metadata', 'One-click shareable invoice links'],
    icon: 'download'
  },
  {
    id: 'integrations',
    title: 'Integrations & Payment Links',
    description: 'Connect to payment providers and accounting tools to accept payments and sync records automatically.',
    bullets: ['Stripe, PayPal, and bank transfer support', 'Sync to QuickBooks and Xero (coming soon)'],
    icon: 'link'
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't1',
    name: 'Sana Ali',
    role: 'Founder',
    company: 'Bright Studio',
    quote: 'AI Invoice Generator saved us hours every week — invoices that used to take half a day are now ready in minutes and look professional.',
  },
  {
    id: 't2',
    name: 'Mark Chen',
    role: 'Operations Manager',
    company: 'Freightly',
    quote: 'The line-item recognition is shockingly accurate. It removed human error and sped up our billing cycle.',
  },
  {
    id: 't3',
    name: 'Priya Nair',
    role: 'Accountant',
    company: 'LedgerWorks',
    quote: 'Integrations make reconciliation a breeze — combined with the templates, it feels like a complete invoicing suite.',
  }
];

export const FAQS: FAQ[] = [
  {
    id: 'f1',
    question: 'Is my data secure?',
    answer: 'Yes. We use industry-standard encryption for data in transit and at rest. User credentials and sensitive fields are never stored in plain text. For self-hosted or enterprise plans, you can configure your own storage options.',
  },
  {
    id: 'f2',
    question: 'Can I import old invoices?',
    answer: 'You can upload PDFs, CSVs, or paste invoice text and our AI will attempt to parse line items and amounts. Results can be reviewed and corrected before saving.',
  },
  {
    id: 'f3',
    question: 'How accurate is the AI extraction?',
    answer: 'Accuracy depends on document quality but is very high for structured invoices. We provide a review step where you can confirm or correct extracted data. Over time the model adapts to your patterns.',
  },
  {
    id: 'f4',
    question: 'Do you support multiple currencies and taxes?',
    answer: 'Yes. The app supports multiple currencies, tax rates, and locale-specific formatting. You can set default currency and tax settings per account or per client.',
  },
  {
    id: 'f5',
    question: 'How do I accept payments?',
    answer: 'Connect your Stripe or PayPal account in Integrations to generate payment links on invoices. For bank transfers, you can include payment instructions on the invoice template.',
  }
];

export default {
  FEATURES,
  TESTIMONIALS,
  FAQS,
};
