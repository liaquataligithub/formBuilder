export interface FormField {
  id: string;
  type: 'text' | 'number' | 'email' | 'textarea' | 'select';
  label: string;
  placeholder?: string;
}