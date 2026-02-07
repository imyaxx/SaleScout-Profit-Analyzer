import React, { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { User, Phone, Mail, Store, FileText, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { cn } from '../../lib/utils';
import { LeadPayload } from '../../types';

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
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white p-5 sm:p-8 md:p-12 rounded-3xl border border-gray-100 shadow-xl shadow-blue-900/5 text-center"
      >
        <div className="w-14 h-14 sm:w-16 sm:h-16 bg-green-50 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
          <CheckCircle2 size={28} />
        </div>
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-2 sm:mb-3">
          {t('lead.successTitle')}
        </h2>
        <p className="text-gray-500 text-sm sm:text-base mb-6 sm:mb-8">
          {t('lead.successBody')}
        </p>
        <button
          onClick={onRestart}
          className="bg-blue-600 text-white px-6 sm:px-8 py-3 sm:py-3.5 rounded-2xl font-semibold inline-flex items-center justify-center gap-2 hover:bg-blue-700 transition-all shadow-lg shadow-blue-200 w-full sm:w-auto"
        >
          {t('lead.newAnalysis')}
        </button>
      </motion.div>
    );
  }

  const phoneDigits = normalizePhoneDigits(values.phone || '');

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white p-4 sm:p-6 md:p-8 rounded-3xl border border-gray-100 shadow-xl shadow-blue-900/5"
    >
      <div className="flex items-center justify-between mb-4 sm:mb-6">
        <div>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">{t('lead.title')}</h2>
          <p className="text-gray-500 text-sm sm:text-base mt-1">{t('lead.subtitle')}</p>
        </div>
        <button
          type="button"
          onClick={onBack}
          className="hidden sm:inline-flex items-center gap-2 text-gray-400 hover:text-blue-600 font-medium transition-colors"
        >
          <ArrowLeft size={16} />
          {t('lead.back')}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700 ml-1">{t('lead.fields.name')}</label>
          <div className="relative">
            <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              value={values.name}
              onChange={(e) => {
                onChange({ name: e.target.value });
                setTouched((prev) => ({ ...prev, name: true }));
              }}
              onBlur={() => handleBlur('name')}
              placeholder={t('lead.placeholders.name')}
              className={cn(
                'w-full pl-12 pr-4 py-3.5 bg-gray-50 border rounded-2xl focus:bg-white transition-all outline-none',
                touched.name && errors.name
                  ? 'border-red-300 ring-2 ring-red-50'
                  : 'border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-50'
              )}
            />
          </div>
          {touched.name && errors.name && <p className="text-xs text-red-500 ml-1">{errors.name}</p>}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700 ml-1">{t('lead.fields.phone')}</label>
          <div className="relative">
            <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
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
              className={cn(
                'w-full pl-12 pr-4 py-3.5 bg-gray-50 border rounded-2xl focus:bg-white transition-all outline-none',
                touched.phone && errors.phone
                  ? 'border-red-300 ring-2 ring-red-50'
                  : 'border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-50'
              )}
            />
          </div>
          {touched.phone && errors.phone && <p className="text-xs text-red-500 ml-1">{errors.phone}</p>}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700 ml-1">{t('lead.fields.email')}</label>
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="email"
              value={values.email}
              onChange={(e) => {
                onChange({ email: e.target.value });
                setTouched((prev) => ({ ...prev, email: true }));
              }}
              onBlur={() => handleBlur('email')}
              placeholder={t('lead.placeholders.email')}
              className={cn(
                'w-full pl-12 pr-4 py-3.5 bg-gray-50 border rounded-2xl focus:bg-white transition-all outline-none',
                touched.email && errors.email
                  ? 'border-red-300 ring-2 ring-red-50'
                  : 'border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-50'
              )}
            />
          </div>
          {touched.email && errors.email && <p className="text-xs text-red-500 ml-1">{errors.email}</p>}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700 ml-1">{t('lead.fields.shop')}</label>
          <div className="relative">
            <Store className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              value={values.shopName}
              onChange={(e) => {
                onChange({ shopName: e.target.value });
                setTouched((prev) => ({ ...prev, shopName: true }));
              }}
              onBlur={() => handleBlur('shopName')}
              placeholder={t('lead.placeholders.shop')}
              className={cn(
                'w-full pl-12 pr-4 py-3.5 bg-gray-50 border rounded-2xl focus:bg-white transition-all outline-none',
                touched.shopName && errors.shopName
                  ? 'border-red-300 ring-2 ring-red-50'
                  : 'border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-50'
              )}
            />
          </div>
          {touched.shopName && errors.shopName && (
            <p className="text-xs text-red-500 ml-1">{errors.shopName}</p>
          )}
        </div>
      </div>

      <div className="space-y-2 mt-4 sm:mt-6">
        <label className="text-sm font-medium text-gray-700 ml-1">{t('lead.fields.description')}</label>
        <div className="relative">
          <FileText className="absolute left-4 top-4 text-gray-400" size={18} />
          <textarea
            rows={3}
            value={values.description}
            onChange={(e) => {
              onChange({ description: e.target.value });
              setTouched((prev) => ({ ...prev, description: true }));
            }}
            onBlur={() => handleBlur('description')}
            placeholder={t('lead.placeholders.description')}
            className={cn(
              'w-full pl-12 pr-4 py-3.5 bg-gray-50 border rounded-2xl focus:bg-white transition-all outline-none resize-none',
              touched.description && errors.description
                ? 'border-red-300 ring-2 ring-red-50'
                : 'border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-50'
            )}
          />
        </div>
        {touched.description && errors.description && (
          <p className="text-xs text-red-500 ml-1">{errors.description}</p>
        )}
      </div>

      {error && <p className="text-sm text-red-500 mt-4">{error}</p>}

      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-6 sm:mt-8">
        <button
          type="button"
          onClick={onBack}
          className="sm:hidden w-full flex items-center justify-center gap-2 px-6 py-3 border border-gray-200 rounded-2xl text-sm font-semibold text-gray-600 hover:bg-gray-50"
        >
          <ArrowLeft size={16} />
          {t('lead.back')}
        </button>
        <button
          type="submit"
          disabled={!isValid || isSubmitting}
          className={cn(
            'w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-3.5 rounded-2xl font-semibold flex items-center justify-center gap-2 transition-all shadow-lg',
            !isValid || isSubmitting
              ? 'bg-gray-200 text-gray-400 shadow-none cursor-not-allowed'
              : 'bg-blue-600 text-white hover:bg-blue-700 shadow-blue-200'
          )}
        >
          {isSubmitting ? t('lead.submitting') : t('lead.submit')}
        </button>
      </div>
    </motion.form>
  );
};

export default StepLeadForm;
