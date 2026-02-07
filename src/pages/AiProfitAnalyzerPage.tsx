import React, { useCallback, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import StepProgress from '../components/wizard/StepProgress';
import StepWelcome from '../components/wizard/StepWelcome';
import StepInput from '../components/wizard/StepInput';
import StepConfirm from '../components/wizard/StepConfirm';
import StepAnalysis from '../components/analysis/StepAnalysis';
import StepLeadForm from '../components/wizard/StepLeadForm';
import { analyzeKaspi, submitLead } from '../lib/onboardingClient';
import { KaspiAnalysis, LeadPayload } from '../types';


type WizardStep = 'welcome' | 'input' | 'confirm' | 'analysis' | 'lead';

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

  const handleInputNext = (url: string, shop: string) => {
    setProductUrl(url);
    setShopName(shop);
    setLeadForm((prev) => ({ ...prev, shopName: shop }));
    setStep('confirm');
  };

  const handleConfirm = () => {
    setStep('analysis');
    runAnalysis();
  };

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
    <div className="min-h-screen">
      <StepProgress current={progressStep} />
      <div className="max-w-[1280px] mx-auto px-4 pt-6 sm:pt-10 pb-10 md:py-16">
        <AnimatePresence mode="wait">
          {step === 'welcome' && (
            <motion.div
              key="welcome"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              <StepWelcome onNext={() => setStep('input')} />
            </motion.div>
          )}

          {step === 'input' && (
            <motion.div
              key="input"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              <StepInput
                initialUrl={productUrl}
                initialShop={shopName}
                onBack={() => setStep('welcome')}
                onNext={handleInputNext}
              />
            </motion.div>
          )}

          {step === 'confirm' && (
            <motion.div
              key="confirm"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              <StepConfirm
                url={productUrl}
                shopName={shopName}
                onBack={() => setStep('input')}
                onConfirm={handleConfirm}
              />
            </motion.div>
          )}

          {step === 'analysis' && (
            <motion.div
              key="analysis"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              <StepAnalysis
                analysis={analysis}
                isLoading={analysisLoading}
                error={analysisError}
                shopName={shopName}
                onRetry={runAnalysis}
                onNext={handleGoLead}
              />
            </motion.div>
          )}

          {step === 'lead' && (
            <motion.div
              key="lead"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
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

      <footer className="mt-8 sm:mt-12 md:mt-20 pt-8 sm:pt-12 border-t border-gray-100 text-center px-4">
        <p className="text-sm text-gray-400">
          {t('footer.text')}
        </p>
      </footer>
    </div>
  );
};

export default AiProfitAnalyzerPage;
