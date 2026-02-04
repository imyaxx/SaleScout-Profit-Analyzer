
import React, { useState, useMemo } from 'react';
import { Search, ChevronLeft, ChevronRight, ArrowUpDown, ChevronUp, ChevronDown, Check, XCircle } from 'lucide-react';
import { ShopProduct, SortField, SortOrder } from '../../types';
import { formatMoney, cn } from '../../lib/utils';

interface ShopProductsTableProps {
  products: ShopProduct[];
}

const ITEMS_PER_PAGE = 8;

const ShopProductsTable: React.FC<ShopProductsTableProps> = ({ products }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [sortField, setSortField] = useState<SortField>('potentialMargin');
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc');

  const filteredProducts = useMemo(() => {
    let result = products.filter(p => 
      p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.sku.toLowerCase().includes(searchTerm.toLowerCase())
    );

    result.sort((a, b) => {
      const aVal = a[sortField];
      const bVal = b[sortField];
      return sortOrder === 'asc' ? aVal - bVal : bVal - aVal;
    });

    return result;
  }, [products, searchTerm, sortField, sortOrder]);

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('desc');
    }
  };

  const SortIcon = ({ field }: { field: SortField }) => {
    if (sortField !== field) return <ArrowUpDown size={14} className="text-gray-400" />;
    return sortOrder === 'asc' ? <ChevronUp size={14} /> : <ChevronDown size={14} />;
  };

  return (
    <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="p-6 border-b border-gray-50 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-bold">Товары магазина</h3>
          <p className="text-sm text-gray-500">Всего позиций в ассортименте: {products.length}</p>
        </div>
        <div className="relative w-full md:w-80">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Поиск по названию или SKU..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full pl-11 pr-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl focus:bg-white outline-none focus:border-blue-500 transition-all text-sm"
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm whitespace-nowrap">
          <thead className="bg-gray-50/50 text-gray-500 font-medium">
            <tr>
              <th className="px-6 py-4">Товар</th>
              <th className="px-6 py-4">SKU</th>
              <th className="px-6 py-4 cursor-pointer hover:text-blue-600 transition-colors" onClick={() => handleSort('myPrice')}>
                <div className="flex items-center gap-1.5">
                  Цена магазина <SortIcon field="myPrice" />
                </div>
              </th>
              <th className="px-6 py-4 cursor-pointer hover:text-blue-600 transition-colors" onClick={() => handleSort('marketMinPrice')}>
                <div className="flex items-center gap-1.5">
                  Мин цена рынка <SortIcon field="marketMinPrice" />
                </div>
              </th>
              <th className="px-6 py-4 cursor-pointer hover:text-blue-600 transition-colors" onClick={() => handleSort('potentialMargin')}>
                <div className="flex items-center gap-1.5">
                  Потенц. маржа <SortIcon field="potentialMargin" />
                </div>
              </th>
              <th className="px-6 py-4">Статус</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {paginatedProducts.length > 0 ? (
              paginatedProducts.map((p) => (
                <tr key={p.id} className="hover:bg-blue-50/30 transition-colors">
                  <td className="px-6 py-4 font-medium text-gray-900 max-w-[200px] truncate">{p.title}</td>
                  <td className="px-6 py-4 text-gray-500">{p.sku}</td>
                  <td className="px-6 py-4">{formatMoney(p.myPrice)}</td>
                  <td className="px-6 py-4 font-medium">{formatMoney(p.marketMinPrice)}</td>
                  <td className="px-6 py-4 text-green-600 font-bold">+{p.potentialMargin}%</td>
                  <td className="px-6 py-4">
                    {p.status === 'in_top' ? (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-green-50 text-green-700 rounded-full text-xs font-semibold">
                        <Check size={12} /> В топе
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-gray-100 text-gray-500 rounded-full text-xs font-semibold">
                        <XCircle size={12} /> Не в топе
                      </span>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="px-6 py-12 text-center text-gray-400 italic">
                  Товары не найдены
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="p-6 border-t border-gray-50 flex items-center justify-between">
          <span className="text-sm text-gray-500">
            Страница {currentPage} из {totalPages}
          </span>
          <div className="flex gap-2">
            <button
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="p-2 border border-gray-100 rounded-lg hover:bg-gray-50 disabled:opacity-30 transition-colors"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="p-2 border border-gray-100 rounded-lg hover:bg-gray-50 disabled:opacity-30 transition-colors"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShopProductsTable;
