/**
 * Шаг 2 — Ввод данных: ссылка на товар Kaspi + название магазина.
 * Валидирует поля перед переходом к анализу.
 */
import React, { useState } from 'react';
import { Search, Store, ArrowRight, ArrowLeft } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import FormField from '../ui/FormField';
import { inputClassName, styles as fieldStyles } from '../ui/FormField.styles';
import { styles } from './StepInput.styles';

interface StepInputProps {
  initialUrl: string;
  initialShop: string;
  onBack: () => void;
  onNext: (url: string, shop: string) => void;
}

const StepInput: React.FC<StepInputProps> = ({ initialUrl, initialShop, onBack, onNext }) => {
  const { t } = useTranslation();
  const [url, setUrl] = useState(initialUrl);
  const [shop, setShop] = useState(initialShop);
  const [errors, setErrors] = useState<{ url?: string; shop?: string }>({});

  const validate = () => {
    const nextErrors: { url?: string; shop?: string } = {};
    if (!url || !url.includes('kaspi.kz')) {
      nextErrors.url = 'input.errors.url';
    }
    if (!shop || shop.trim().length < 2) {
      nextErrors.shop = 'input.errors.shop';
    }
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    onNext(url.trim(), shop);
  };

  return (
    <form onSubmit={handleSubmit} className={styles.root}>
      <div className={styles.headerRow}>
        <div>
          <h2 className={styles.title}>{t('input.title')}</h2>
          <p className={styles.subtitle}>{t('input.subtitle')}</p>
        </div>
        <button type="button" onClick={onBack} className={styles.btnBackDesktop}>
          <ArrowLeft size={16} />
          {t('input.back')}
        </button>
      </div>

      <div className={styles.grid}>
        <FormField
          label={t('input.productLabel')}
          icon={<Search className={fieldStyles.icon} size={18} />}
          error={errors.url ? t(errors.url) : null}
        >
          <input
            type="text"
            placeholder={t('input.productPlaceholder')}
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className={inputClassName(!!errors.url)}
          />
        </FormField>

        <FormField
          label={t('input.shopLabel')}
          icon={<Store className={fieldStyles.icon} size={18} />}
          error={errors.shop ? t(errors.shop) : null}
        >
          <input
            type="text"
            placeholder={t('input.shopPlaceholder')}
            value={shop}
            onChange={(e) => setShop(e.target.value)}
            className={inputClassName(!!errors.shop)}
          />
        </FormField>
      </div>

      <div className={styles.footer}>
        <button type="button" onClick={onBack} className={styles.btnBackMobile}>
          <ArrowLeft size={16} />
          {t('input.back')}
        </button>
        <button type="submit" className={styles.btnSubmit}>
          {t('input.continue')}
          <ArrowRight size={18} />
        </button>
      </div>
    </form>
  );
};

export default StepInput;
