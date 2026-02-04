
import React from 'react';
import { motion } from 'framer-motion';
import { Lightbulb, CheckCircle2, Info, ExternalLink } from 'lucide-react';
import { AnalyzeResponse } from '../../types';

interface RecommendationsProps {
  data: AnalyzeResponse;
}

const Recommendations: React.FC<RecommendationsProps> = ({ data }) => {
  return (
    <div className="h-full flex flex-col gap-6">
      <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex items-start gap-4">
        {data.product.image && (
          <img 
            src={data.product.image} 
            alt={data.product.title}
            className="w-20 h-20 rounded-2xl object-cover border border-gray-100"
          />
        )}
        <div className="flex-1 overflow-hidden">
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2 py-0.5 bg-blue-50 text-blue-600 text-[10px] font-bold uppercase rounded-md tracking-wide">
              Оценка предварительная
            </span>
          </div>
          <h2 className="text-lg font-bold text-gray-900 truncate mb-2">{data.product.title}</h2>
          <a 
            href={data.product.url} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-sm text-blue-600 hover:underline flex items-center gap-1.5 font-medium"
          >
            Смотреть на маркетплейсе
            <ExternalLink size={14} />
          </a>
        </div>
      </div>

      <div className="bg-white p-6 md:p-8 rounded-3xl border border-gray-100 shadow-sm flex-1">
        <div className="flex items-center gap-2 mb-6">
          <div className="w-8 h-8 bg-amber-50 text-amber-600 rounded-lg flex items-center justify-center">
            <Lightbulb size={18} />
          </div>
          <h3 className="text-lg font-bold">Рекомендации AI</h3>
        </div>

        <ul className="space-y-4">
          {data.recommendations.map((rec, idx) => (
            <motion.li
              key={idx}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + idx * 0.1 }}
              className="flex items-start gap-3 group"
            >
              <div className="mt-1 flex-shrink-0">
                <CheckCircle2 size={18} className="text-blue-500" />
              </div>
              <p className="text-gray-700 leading-snug group-hover:text-gray-900 transition-colors">
                {rec}
              </p>
            </motion.li>
          ))}
        </ul>

        <div className="mt-8 p-4 bg-gray-50 rounded-2xl flex gap-3">
          <Info size={20} className="text-gray-400 flex-shrink-0" />
          <p className="text-xs text-gray-500 leading-relaxed">
            Расчет произведен на основе текущей конъюнктуры рынка и исторических данных. Для более точного анализа подключите личный кабинет магазина в SaleScout.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Recommendations;
