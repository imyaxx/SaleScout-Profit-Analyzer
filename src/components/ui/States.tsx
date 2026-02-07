import React from "react";
import { motion } from "framer-motion";
import { AlertCircle, RefreshCw } from "lucide-react";
import { useTranslation } from "react-i18next";

export const LoadingState: React.FC = () => {
  return (
    <div className="space-y-6 sm:space-y-8 animate-pulse py-6 sm:py-8">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-24 sm:h-32 bg-gray-200 rounded-2xl"></div>
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-8">
        <div className="h-48 sm:h-64 bg-gray-200 rounded-2xl"></div>
        <div className="h-48 sm:h-64 bg-gray-200 rounded-2xl"></div>
      </div>
      <div className="h-64 sm:h-96 bg-gray-200 rounded-2xl"></div>
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
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center py-12 sm:py-20 px-4 text-center"
    >
      <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mb-6">
        <AlertCircle size={32} />
      </div>
      <h3 className="text-xl font-bold mb-2">{t("errors.genericTitle")}</h3>
      <p className="text-gray-500 mb-8 max-w-md">{message}</p>
      <button
        onClick={onRetry}
        className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200"
      >
        <RefreshCw size={18} />
        {t("errors.retry")}
      </button>
    </motion.div>
  );
};
