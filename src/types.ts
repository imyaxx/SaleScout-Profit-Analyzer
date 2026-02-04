
export interface AnalyzeRequest {
  productUrl: string;
  shopName: string;
}

export interface ShopProduct {
  id: string;
  title: string;
  sku: string;
  myPrice: number;
  marketMinPrice: number;
  potentialMargin: number;
  status: 'in_top' | 'out_of_top';
}

export interface AnalyzeResponse {
  product: {
    title: string;
    url: string;
    image?: string;
    marketplacePriceMin: number;
    myShopPrice: number;
    myPosition: number;
    top1Delta: number;
    currency: "KZT";
  };
  profit: {
    low: number;
    high: number;
    assumptions: string[];
  };
  recommendations: string[];
  shopProducts: ShopProduct[];
}

export type SortField = 'myPrice' | 'marketMinPrice' | 'potentialMargin';
export type SortOrder = 'asc' | 'desc';

export interface KaspiAnalysis {
  productId: string;
  leaderShop: string;
  leaderPrice: number;
  myShopFound: boolean;
  myShopPrice: number | null;
  myShopPosition: number | null;
  priceToTop1: number | null;
  offers: { name: string; price: number }[];
}

export interface LeadPayload {
  name: string;
  phone: string;
  email: string;
  shopName: string;
  description: string;
}
