export type FormFieldType = "text" | "date" | "select" | "checkbox";

export interface FormField {
  id: string;
  label: string;
  type: FormFieldType;
  value: string;
  required: boolean;
  options?: string[];
}

export interface Form {
  id: string;
  title: string;
  description: string;
  category: string;
  language: string;
  fields: FormField[];
}