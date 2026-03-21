export interface CustomFieldInstance {
  id: number;
  document: number; // Document
  field: number; // CustomField
  created: Date;
  value?: any;
}
