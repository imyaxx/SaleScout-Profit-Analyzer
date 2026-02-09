/** Запрос на анализ: ссылка на товар + название магазина */
export interface AnalyzeRequest {
  productUrl: string;
  shopName: string;
}

/** Результат анализа товара с Kaspi */
export interface KaspiAnalysis {
  productId: string;       // ID товара на Kaspi
  leaderShop: string;      // Название лидера рынка
  leaderPrice: number;     // Цена лидера
  myShopFound: boolean;    // Найден ли магазин пользователя среди продавцов
  myShopPrice: number | null;     // Цена магазина пользователя
  myShopPosition: number | null;  // Позиция в выдаче
  priceToTop1: number | null;     // Разница цены до ТОП-1
  offers: { name: string; price: number; rating?: number | null; reviewCount?: number | null }[];
}

/** Данные лид-формы для отправки заявки */
export interface LeadPayload {
  name: string;
  phone: string;
  email: string;
  shopName: string;
  description: string;
}
