
import React, { useState } from 'react';
import { Search, Store, ArrowRight, Loader2 } from 'lucide-react';
import { cn } from '../../lib/utils';

interface AnalyzerFormProps {
  onAnalyze: (url: string, shop: string) => void;
  isLoading: boolean;
}

const AnalyzerForm: React.FC<AnalyzerFormProps> = ({ onAnalyze, isLoading }) => {
  const [url, setUrl] = useState('');
  const [shop, setShop] = useState('');
  const [errors, setErrors] = useState<{ url?: string; shop?: string }>({});

  const validate = () => {
    const newErrors: { url?: string; shop?: string } = {};
    if (!url || !url.startsWith('http')) {
      newErrors.url = 'Введите корректную ссылку на товар (http/https)';
    }
    if (!shop || shop.length < 2) {
      newErrors.shop = 'Введите название магазина (мин. 2 символа)';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onAnalyze(url, shop);
    }
  };

  return (
    <form 
      onSubmit={handleSubmit}
      className="bg-white p-6 md:p-8 rounded-3xl border border-gray-100 shadow-xl shadow-blue-900/5 mb-12"
    >
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr_auto] gap-6 items-end">
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700 ml-1">Ссылка на товар</label>
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="https://market.kz/product/..."
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className={cn(
                "w-full pl-12 pr-4 py-3.5 bg-gray-50 border rounded-2xl focus:bg-white transition-all outline-none",
                errors.url ? "border-red-300 ring-2 ring-red-50" : "border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-50"
              )}
            />
          </div>
          {errors.url && <p className="text-xs text-red-500 ml-1">{errors.url}</p>}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700 ml-1">Ваш магазин</label>
          <div className="relative">
            <Store className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="SaleScout Store"
              value={shop}
              onChange={(e) => setShop(e.target.value)}
              className={cn(
                "w-full pl-12 pr-4 py-3.5 bg-gray-50 border rounded-2xl focus:bg-white transition-all outline-none",
                errors.shop ? "border-red-300 ring-2 ring-red-50" : "border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-50"
              )}
            />
          </div>
          {errors.shop && <p className="text-xs text-red-500 ml-1">{errors.shop}</p>}
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="bg-blue-600 text-white px-8 py-3.5 rounded-2xl font-semibold flex items-center justify-center gap-2 hover:bg-blue-700 active:scale-95 transition-all disabled:opacity-70 disabled:pointer-events-none shadow-lg shadow-blue-200 min-w-[200px]"
        >
          {isLoading ? (
            <Loader2 className="animate-spin" size={20} />
          ) : (
            <>
              Сделать анализ
              <ArrowRight size={20} />
            </>
          )}
        </button>
      </div>
    </form>
  );
};

export default AnalyzerForm;
