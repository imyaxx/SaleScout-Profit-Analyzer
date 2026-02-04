import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, ShieldCheck } from 'lucide-react';

interface StepConfirmProps {
  url: string;
  shopName: string;
  onBack: () => void;
  onConfirm: () => void;
}

const StepConfirm: React.FC<StepConfirmProps> = ({ url, shopName, onBack, onConfirm }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white p-6 md:p-8 rounded-3xl border border-gray-100 shadow-xl shadow-blue-900/5"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
          <ShieldCheck size={20} />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Подтверждение анализа</h2>
          <p className="text-gray-500 text-sm">Проверьте данные перед запуском.</p>
        </div>
      </div>

      <div className="bg-gray-50 border border-gray-100 rounded-2xl p-4 md:p-6 space-y-4">
        <div>
          <p className="text-xs uppercase text-gray-400 font-semibold mb-1">Товар</p>
          <p className="text-sm font-semibold text-gray-900 break-all">{url}</p>
        </div>
        <div>
          <p className="text-xs uppercase text-gray-400 font-semibold mb-1">Магазин</p>
          <p className="text-sm font-semibold text-gray-900">{shopName}</p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mt-8">
        <button
          type="button"
          onClick={onBack}
          className="w-full sm:w-auto px-6 py-3 border border-gray-200 rounded-2xl text-sm font-semibold text-gray-600 hover:bg-gray-50 flex items-center justify-center gap-2"
        >
          <ArrowLeft size={16} />
          Назад
        </button>
        <button
          type="button"
          onClick={onConfirm}
          className="w-full sm:w-auto bg-blue-600 text-white px-8 py-3.5 rounded-2xl font-semibold flex items-center justify-center gap-2 hover:bg-blue-700 active:scale-95 transition-all shadow-lg shadow-blue-200"
        >
          Подтвердить
          <ArrowRight size={16} />
        </button>
      </div>
    </motion.div>
  );
};

export default StepConfirm;
