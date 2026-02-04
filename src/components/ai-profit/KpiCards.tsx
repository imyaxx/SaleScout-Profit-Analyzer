
import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Award, DollarSign, ArrowUpRight, BarChart3 } from 'lucide-react';
import { AnalyzeResponse } from '../../types';
import { formatMoney, cn } from '../../lib/utils';

interface KpiCardsProps {
  data: AnalyzeResponse;
}

const KpiCards: React.FC<KpiCardsProps> = ({ data }) => {
  const { product, profit } = data;

  const kpis = [
    {
      label: "Текущая позиция",
      value: `#${product.myPosition}`,
      icon: Award,
      color: "text-amber-600",
      bg: "bg-amber-50"
    },
    {
      label: "Цена магазина",
      value: formatMoney(product.myShopPrice),
      icon: DollarSign,
      color: "text-blue-600",
      bg: "bg-blue-50"
    },
    {
      label: "Лучшая цена",
      value: formatMoney(product.marketplacePriceMin),
      icon: Target,
      color: "text-green-600",
      bg: "bg-green-50"
    },
    {
      label: "До ТОП-1",
      value: `-${formatMoney(product.top1Delta)}`,
      icon: TrendingUp,
      color: "text-red-600",
      bg: "bg-red-50"
    }
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((kpi, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05 }}
            className="p-5 bg-white border border-gray-100 rounded-2xl shadow-sm flex flex-col justify-between"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium text-gray-500">{kpi.label}</span>
              <div className={cn("p-2 rounded-xl", kpi.bg, kpi.color)}>
                <kpi.icon size={18} />
              </div>
            </div>
            <div className="text-xl font-bold text-gray-900">{kpi.value}</div>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="relative overflow-hidden p-6 md:p-8 bg-gradient-to-br from-blue-600 to-indigo-700 text-white rounded-3xl shadow-xl shadow-blue-200"
      >
        <div className="absolute top-0 right-0 p-8 opacity-10">
          <BarChart3 size={120} />
        </div>
        <div className="relative z-10">
          <div className="flex items-center gap-2 text-blue-100 mb-2 uppercase tracking-wider text-xs font-bold">
            <ArrowUpRight size={14} />
            Прогноз прибыли с SaleScout
          </div>
          <div className="text-3xl md:text-4xl font-black mb-4">
            {formatMoney(profit.low)} – {formatMoney(profit.high)}
          </div>
          <div className="flex flex-wrap gap-2">
            {profit.assumptions.map((asm, i) => (
              <span key={i} className="px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-xs font-medium">
                • {asm}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

// Internal Target Icon helper
const Target = ({ size, className }: { size?: number; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <circle cx="12" cy="12" r="10" />
    <circle cx="12" cy="12" r="6" />
    <circle cx="12" cy="12" r="2" />
  </svg>
);

export default KpiCards;
