/**
 * UI-состояния: LoadingState (скелетон) и ErrorState (ошибка с кнопкой retry).
 * Используются на шаге анализа при загрузке / ошибке API.
 */
import React from "react";
import { motion } from "framer-motion";
import { AlertCircle, RefreshCw } from "lucide-react";
import { useTranslation } from "react-i18next";
import { styles, animations } from "./States.styles";

export const LoadingState: React.FC = () => {
  return (
    <div className={styles.loadingRoot}>
      <div className={styles.skeletonGrid}>
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className={styles.skeletonCard}></div>
        ))}
      </div>
      <div className={styles.skeletonTwoCol}>
        <div className={styles.skeletonHalf}></div>
        <div className={styles.skeletonHalf}></div>
      </div>
      <div className={styles.skeletonFull}></div>
    </div>
  );
};

interface ErrorStateProps {
  message: string;
  onRetry: () => void;
}

export const ErrorState: React.FC<ErrorStateProps> = ({ message, onRetry }) => {
  const { t } = useTranslation();

  return (
    <motion.div {...animations.errorFadeIn} className={styles.errorRoot}>
      <div className={styles.errorIcon}>
        <AlertCircle size={32} />
      </div>
      <h3 className={styles.errorTitle}>{t("errors.genericTitle")}</h3>
      <p className={styles.errorMessage}>{message}</p>
      <button onClick={onRetry} className={styles.retryBtn}>
        <RefreshCw size={18} />
        {t("errors.retry")}
      </button>
    </motion.div>
  );
};
