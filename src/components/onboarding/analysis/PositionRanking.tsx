import React from 'react';
import { motion } from 'framer-motion';
import { Award, Crown } from 'lucide-react';
import { cn, formatMoney } from '../../../lib/utils';

export interface PositionItem {
  id: string;
  name: string;
  price: number;
  isUser?: boolean;
  isLeader?: boolean;
}

interface PositionRankingProps {
  items: PositionItem[];
}

const PositionRanking: React.FC<PositionRankingProps> = ({ items }) => {
  return (
    <div className="bg-white rounded-3xl border border-gray-100 p-6 md:p-8 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <div>
          <p className="text-xs uppercase font-semibold text-gray-400">Позиция на Kaspi</p>
          <h3 className="text-xl font-bold text-gray-900 mt-1">Мини-рейтинг продавцов</h3>
        </div>
        <div className="w-10 h-10 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
          <Award size={18} />
        </div>
      </div>

      <motion.ul layout className="space-y-3">
        {items.map((item, index) => (
          <motion.li
            layout
            key={item.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className={cn(
              'flex items-center justify-between px-4 py-3 rounded-2xl border',
              item.isUser
                ? 'border-blue-200 bg-blue-50/50'
                : 'border-gray-100 bg-white',
              item.isLeader && 'shadow-sm'
            )}
          >
            <div className="flex items-center gap-3">
              <div
                className={cn(
                  'w-8 h-8 rounded-xl flex items-center justify-center text-xs font-bold',
                  item.isLeader ? 'bg-amber-100 text-amber-700' : 'bg-gray-100 text-gray-500',
                  item.isUser && 'bg-blue-600 text-white'
                )}
              >
                {item.isLeader ? <Crown size={14} /> : `#${index + 1}`}
              </div>
              <div>
                <p className={cn('text-sm font-semibold', item.isUser ? 'text-blue-700' : 'text-gray-900')}>
                  {item.name}
                </p>
                {item.isUser && <p className="text-xs text-blue-500">Ваш магазин</p>}
              </div>
            </div>
            <p className={cn('text-sm font-semibold', item.isUser ? 'text-blue-700' : 'text-gray-600')}>
              {formatMoney(item.price)}
            </p>
          </motion.li>
        ))}
      </motion.ul>
    </div>
  );
};

export default PositionRanking;
