
import { AnalyzeRequest, AnalyzeResponse, ShopProduct } from '../types';

const MOCK_TITLES = [
  "Смартфон Samsung Galaxy S23 Ultra 256GB",
  "Беспроводные наушники Sony WH-1000XM5",
  "Ноутбук Apple MacBook Air M2 13.6\"",
  "Умные часы Apple Watch Series 8 45mm",
  "Игровая консоль Sony PlayStation 5",
  "Планшет iPad Pro 11 M2 128GB",
  "Кофемашина DeLonghi Magnifica S",
  "Электросамокат Xiaomi Mi Electric Scooter 3",
  "Робот-пылесос Roborock S7 MaxV",
  "Фотоаппарат Fujifilm X-T5 Silver"
];

const generateMockProducts = (count: number): ShopProduct[] => {
  return Array.from({ length: count }).map((_, i) => ({
    id: `prod-${i}`,
    title: MOCK_TITLES[i % MOCK_TITLES.length],
    sku: `SKU-${1000 + i}`,
    myPrice: Math.floor(Math.random() * 500000) + 50000,
    marketMinPrice: Math.floor(Math.random() * 450000) + 45000,
    potentialMargin: Math.floor(Math.random() * 20) + 5,
    status: Math.random() > 0.5 ? 'in_top' : 'out_of_top'
  }));
};

export async function analyzeProduct(req: AnalyzeRequest): Promise<AnalyzeResponse> {
  const delay = Math.floor(Math.random() * (1400 - 900 + 1)) + 900;
  
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // 10% chance to fail
      if (Math.random() < 0.1) {
        reject(new Error("Не удалось получить данные по ссылке. Пожалуйста, проверьте URL и попробуйте снова."));
        return;
      }

      const marketplaceMin = 245000;
      const myPrice = 258000;

      resolve({
        product: {
          title: "Смартфон Apple iPhone 15 Pro 256GB Natural Titanium",
          url: req.productUrl,
          image: "https://picsum.photos/seed/iphone/400/400",
          marketplacePriceMin: marketplaceMin,
          myShopPrice: myPrice,
          myPosition: 4,
          top1Delta: myPrice - marketplaceMin,
          currency: "KZT"
        },
        profit: {
          low: 850000,
          high: 1240000,
          assumptions: [
            "Увеличение конверсии при снижении цены на 5%",
            "Текущий объем рынка в категории - 1200 ед/мес",
            "Ожидаемый рост спроса в следующем квартале (+15%)"
          ]
        },
        recommendations: [
          "Снизить минимальную цену до 244 990 ₸ для выхода в ТОП-1",
          "Оптимизировать описание товара для повышения CTR на 12%",
          "Настроить авто-репрайсинг в диапазоне 244k - 260k ₸",
          "Проверить остатки на складе: текущего запаса хватит на 14 дней при росте продаж"
        ],
        shopProducts: generateMockProducts(25)
      });
    }, delay);
  });
}
