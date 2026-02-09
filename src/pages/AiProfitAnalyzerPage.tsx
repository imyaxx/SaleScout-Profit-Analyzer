/**
 * Главная страница — визард из 4 шагов:
 * 1. Welcome  — приветствие
 * 2. Input    — ввод ссылки + магазина
 * 3. Analysis — результат анализа (авто-обновление каждые 15 сек)
 * 4. Lead     — лид-форма для заявки
 */
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import StepProgress from '../components/wizard/StepProgress';
import StepWelcome from '../components/wizard/StepWelcome';
import StepInput from '../components/wizard/StepInput';
import StepAnalysis from '../components/analysis/StepAnalysis';
import StepLeadForm from '../components/wizard/StepLeadForm';
import { analyzeKaspi, submitLead } from '../lib/onboardingClient';
import { KaspiAnalysis, LeadPayload } from '../types';
import { usePolling } from '../hooks/usePolling';
import { ANALYSIS_POLL_INTERVAL_MS } from '../constants/app';
import { styles, animations } from './AiProfitAnalyzerPage.styles';


type WizardStep = 'welcome' | 'input' | 'analysis' | 'lead';

const initialLead: LeadPayload = {
  name: '',
  phone: '+7',
  email: '',
  shopName: '',
  description: ''
};

const AiProfitAnalyzerPage: React.FC = () => {
  const { t } = useTranslation();
  const [step, setStep] = useState<WizardStep>('welcome');
  const [productUrl, setProductUrl] = useState('');
  const [shopName, setShopName] = useState('');

  const [analysis, setAnalysis] = useState<KaspiAnalysis | null>(null);
  const [analysisLoading, setAnalysisLoading] = useState(false);
  const [analysisError, setAnalysisError] = useState<string | null>(null);

  const [leadForm, setLeadForm] = useState<LeadPayload>(initialLead);
  const [leadSubmitting, setLeadSubmitting] = useState(false);
  const [leadError, setLeadError] = useState<string | null>(null);
  const [leadSuccess, setLeadSuccess] = useState(false);

  const progressStep = step === 'welcome' ? 1 : step === 'analysis' ? 3 : step === 'lead' ? 4 : 2;

  const runAnalysis = useCallback(async () => {
    if (!productUrl || !shopName) return;
    setAnalysisLoading(true);
    setAnalysisError(null);
    setAnalysis(null);
    try {
      const result = await analyzeKaspi({ productUrl, shopName });
      setAnalysis(result);
    } catch (err: any) {
      setAnalysisError(err.message || t('errors.analyzeFailed'));
    } finally {
      setAnalysisLoading(false);
    }
  }, [productUrl, shopName, t]);

  const shouldRunAnalysis = useRef(false);

  const handleInputNext = (url: string, shop: string) => {
    setProductUrl(url);
    setShopName(shop);
    setLeadForm((prev) => ({ ...prev, shopName: shop }));
    shouldRunAnalysis.current = true;
    setStep('analysis');
  };

  useEffect(() => {
    if (step === 'analysis' && shouldRunAnalysis.current) {
      shouldRunAnalysis.current = false;
      runAnalysis();
    }
  }, [step, runAnalysis]);

  const isRefreshingRef = useRef(false);

  const refreshAnalysis = useCallback(async () => {
    if (!productUrl || !shopName || !analysis || isRefreshingRef.current) return;
    isRefreshingRef.current = true;
    try {
      const result = await analyzeKaspi({ productUrl, shopName });
      setAnalysis(result);
    } catch {
      // Silent fail — keep showing last successful data
    } finally {
      isRefreshingRef.current = false;
    }
  }, [productUrl, shopName, analysis]);

  usePolling(refreshAnalysis, ANALYSIS_POLL_INTERVAL_MS, step === 'analysis' && analysis !== null);

  const handleGoLead = () => {
    setStep('lead');
  };

  const handleLeadSubmit = async (payload: LeadPayload) => {
    setLeadSubmitting(true);
    setLeadError(null);
    try {
      await submitLead(payload);
      setLeadSuccess(true);
    } catch (err: any) {
      setLeadError(err.message || t('errors.leadFailed'));
    } finally {
      setLeadSubmitting(false);
    }
  };

  const handleRestart = () => {
    setStep('welcome');
    setProductUrl('');
    setShopName('');
    setAnalysis(null);
    setAnalysisError(null);
    setAnalysisLoading(false);
    setLeadForm(initialLead);
    setLeadError(null);
    setLeadSuccess(false);
    setLeadSubmitting(false);
  };

  return (
    <div className={styles.root}>
      <StepProgress current={progressStep} />
      <div className={styles.content}>
        <AnimatePresence mode="wait">
          {step === 'welcome' && (
            <motion.div key="welcome" {...animations.stepTransition}>
              <StepWelcome onNext={() => setStep('input')} />
            </motion.div>
          )}

          {step === 'input' && (
            <motion.div key="input" {...animations.stepTransition}>
              <StepInput
                initialUrl={productUrl}
                initialShop={shopName}
                onBack={() => setStep('welcome')}
                onNext={handleInputNext}
              />
            </motion.div>
          )}

          {step === 'analysis' && (
            <motion.div key="analysis" {...animations.stepTransition}>
              <StepAnalysis
                analysis={analysis}
                isLoading={analysisLoading}
                error={analysisError}
                shopName={shopName}
                onRetry={runAnalysis}
                onNext={handleGoLead}
                onBack={() => setStep('input')}
              />
            </motion.div>
          )}

          {step === 'lead' && (
            <motion.div key="lead" {...animations.stepTransition}>
              <StepLeadForm
                values={leadForm}
                onChange={(next) => setLeadForm((prev) => ({ ...prev, ...next }))}
                onBack={() => setStep('analysis')}
                onSubmit={handleLeadSubmit}
                isSubmitting={leadSubmitting}
                error={leadError}
                success={leadSuccess}
                onRestart={handleRestart}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <footer className={styles.footer}>
        <p className={styles.footerText}>
          {t('footer.text')}
        </p>
      </footer>
    </div>
  );
};

export default AiProfitAnalyzerPage;
