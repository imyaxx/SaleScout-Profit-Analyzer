/**
 * Шаг 4 — Лид-форма: имя, телефон, email, магазин, описание.
 * Валидация в реальном времени. При успехе показывает экран «Заявка отправлена».
 */
import React, { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { User, Phone, Mail, Store, FileText, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { LeadPayload } from '../../types';
import FormField from '../ui/FormField';
import { inputClassName, styles as fieldStyles } from '../ui/FormField.styles';
import { styles, animations } from './StepLeadForm.styles';

interface StepLeadFormProps {
  values: LeadPayload;
  onChange: (next: Partial<LeadPayload>) => void;
  onBack: () => void;
  onSubmit: (payload: LeadPayload) => void;
  isSubmitting: boolean;
  error: string | null;
  success: boolean;
  onRestart: () => void;
}

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const normalizePhoneDigits = (value: string) => {
  const digits = value.replace(/\D/g, '');
  let rest = digits.startsWith('7') ? digits.slice(1) : digits;
  return rest.slice(0, 10);
};

const formatPhone = (digits: string) => `+7${digits}`;

const StepLeadForm: React.FC<StepLeadFormProps> = ({
  values,
  onChange,
  onBack,
  onSubmit,
  isSubmitting,
  error,
  success,
  onRestart
}) => {
  const { t, i18n } = useTranslation();
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const errors = useMemo(() => {
    const next: Record<string, string> = {};
    if (!values.name || values.name.trim().length < 2) {
      next.name = t('lead.errors.name');
    }

    const digits = normalizePhoneDigits(values.phone || '');
    if (digits.length !== 10) {
      next.phone = t('lead.errors.phone');
    }

    if (!values.email || !emailRegex.test(values.email.trim())) {
      next.email = t('lead.errors.email');
    }

    if (!values.shopName || values.shopName.trim().length < 2) {
      next.shopName = t('lead.errors.shop');
    }

    if (!values.description || values.description.trim().length < 2) {
      next.description = t('lead.errors.description');
    }

    return next;
  }, [values, i18n.language, t]);

  const isValid = Object.keys(errors).length === 0;

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setTouched({
      name: true,
      phone: true,
      email: true,
      shopName: true,
      description: true
    });
    if (!isValid) return;

    const digits = normalizePhoneDigits(values.phone || '');
    const payload: LeadPayload = {
      name: values.name.trim(),
      phone: formatPhone(digits),
      email: values.email.trim(),
      shopName: values.shopName.trim(),
      description: values.description.trim()
    };

    onSubmit(payload);
  };

  const handleBlur = (field: keyof LeadPayload) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  if (success) {
    return (
      <motion.div {...animations.successFadeIn} className={styles.successRoot}>
        <div className={styles.successIcon}>
          <CheckCircle2 size={28} />
        </div>
        <h2 className={styles.successTitle}>
          {t('lead.successTitle')}
        </h2>
        <p className={styles.successBody}>
          {t('lead.successBody')}
        </p>
        <button onClick={onRestart} className={styles.successBtn}>
          {t('lead.newAnalysis')}
        </button>
      </motion.div>
    );
  }

  const phoneDigits = normalizePhoneDigits(values.phone || '');

  return (
    <motion.form
      onSubmit={handleSubmit}
      {...animations.formFadeIn}
      className={styles.formRoot}
    >
      <div className={styles.headerRow}>
        <div>
          <h2 className={styles.title}>{t('lead.title')}</h2>
          <p className={styles.subtitle}>{t('lead.subtitle')}</p>
        </div>
        <button type="button" onClick={onBack} className={styles.btnBackDesktop}>
          <ArrowLeft size={16} />
          {t('lead.back')}
        </button>
      </div>

      <div className={styles.grid}>
        <FormField
          label={t('lead.fields.name')}
          icon={<User className={fieldStyles.icon} size={18} />}
          error={touched.name ? errors.name : null}
        >
          <input
            type="text"
            value={values.name}
            onChange={(e) => {
              onChange({ name: e.target.value });
              setTouched((prev) => ({ ...prev, name: true }));
            }}
            onBlur={() => handleBlur('name')}
            placeholder={t('lead.placeholders.name')}
            className={inputClassName(!!(touched.name && errors.name))}
          />
        </FormField>

        <FormField
          label={t('lead.fields.phone')}
          icon={<Phone className={fieldStyles.icon} size={18} />}
          error={touched.phone ? errors.phone : null}
        >
          <input
            type="tel"
            value={formatPhone(phoneDigits)}
            onChange={(e) => {
              const digits = normalizePhoneDigits(e.target.value);
              onChange({ phone: formatPhone(digits) });
              setTouched((prev) => ({ ...prev, phone: true }));
            }}
            onBlur={() => handleBlur('phone')}
            placeholder={t('lead.placeholders.phone')}
            className={inputClassName(!!(touched.phone && errors.phone))}
          />
        </FormField>

        <FormField
          label={t('lead.fields.email')}
          icon={<Mail className={fieldStyles.icon} size={18} />}
          error={touched.email ? errors.email : null}
        >
          <input
            type="email"
            value={values.email}
            onChange={(e) => {
              onChange({ email: e.target.value });
              setTouched((prev) => ({ ...prev, email: true }));
            }}
            onBlur={() => handleBlur('email')}
            placeholder={t('lead.placeholders.email')}
            className={inputClassName(!!(touched.email && errors.email))}
          />
        </FormField>

        <FormField
          label={t('lead.fields.shop')}
          icon={<Store className={fieldStyles.icon} size={18} />}
          error={touched.shopName ? errors.shopName : null}
        >
          <input
            type="text"
            value={values.shopName}
            onChange={(e) => {
              onChange({ shopName: e.target.value });
              setTouched((prev) => ({ ...prev, shopName: true }));
            }}
            onBlur={() => handleBlur('shopName')}
            placeholder={t('lead.placeholders.shop')}
            className={inputClassName(!!(touched.shopName && errors.shopName))}
          />
        </FormField>
      </div>

      <div className={styles.textareaWrap}>
        <FormField
          label={t('lead.fields.description')}
          icon={<FileText className={fieldStyles.iconTextarea} size={18} />}
          error={touched.description ? errors.description : null}
        >
          <textarea
            rows={3}
            value={values.description}
            onChange={(e) => {
              onChange({ description: e.target.value });
              setTouched((prev) => ({ ...prev, description: true }));
            }}
            onBlur={() => handleBlur('description')}
            placeholder={t('lead.placeholders.description')}
            className={inputClassName(!!(touched.description && errors.description), 'resize-none')}
          />
        </FormField>
      </div>

      {error && <p className={styles.serverError}>{error}</p>}

      <div className={styles.footer}>
        <button type="button" onClick={onBack} className={styles.btnBackMobile}>
          <ArrowLeft size={16} />
          {t('lead.back')}
        </button>
        <button
          type="submit"
          disabled={!isValid || isSubmitting}
          className={styles.btnSubmit(!isValid || isSubmitting)}
        >
          {isSubmitting ? t('lead.submitting') : t('lead.submit')}
        </button>
      </div>
    </motion.form>
  );
};

export default StepLeadForm;
