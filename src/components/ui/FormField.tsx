/**
 * Reusable form field with icon, validation, and consistent styling.
 * Replaces the duplicated input pattern in StepInput and StepLeadForm.
 */
import React from 'react';
import { styles } from './FormField.styles';

interface FormFieldProps {
  label: string;
  icon: React.ReactNode;
  error?: string | null;
  children: React.ReactNode;
}

const FormField: React.FC<FormFieldProps> = ({ label, icon, error, children }) => {
  return (
    <div className={styles.wrapper}>
      <label className={styles.label}>{label}</label>
      <div className={styles.inputWrap}>
        {icon}
        {children}
      </div>
      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
};

export default FormField;
