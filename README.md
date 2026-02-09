# SaleScout — AI Profit Analyzer

Интерактивный продукт для продавцов на Kaspi: пользователь вводит ссылку на товар и название магазина, система через внутренний API Kaspi рассчитывает позицию, лучшую цену и разницу до ТОП-1. Визуальный мастер из 4 шагов превращает анализ в эмоциональный AI-дашборд и ведет к заявке.

## Стек

**Frontend**

- React 19 + Vite 6
- TypeScript
- Tailwind CSS (CDN)
- Framer Motion
- Lucide React
- i18next + react-i18next (RU / KZ / EN)

**Backend**

- Node.js (ESM)
- Express
- MongoDB (Mongoose)

## Архитектура

- Один роут на фронте, 4-шаговый wizard:
  1. Приветствие
  2. Ввод данных (URL товара + название магазина)
  3. Анализ (интерактивный AI-дашборд)
  4. Заявка (лид-форма)
- Бэкенд:
  - `POST /api/analyze` — анализ по Kaspi API
  - `POST /api/lead` — сохранение заявки в MongoDB
  - `GET/POST /api/records` — записи анализов

## Структура проекта

```
.
├── index.html
├── vite.config.ts
├── tsconfig.json
├── package.json
├── src/
│   ├── App.tsx                              # Корневой компонент (навбар + язык)
│   ├── App.styles.ts                        # Стили для App
│   ├── index.tsx                            # Точка входа React
│   ├── types.ts                             # TypeScript-интерфейсы
│   │
│   ├── styles/
│   │   ├── global.css                       # CSS custom properties, keyframes, base
│   │   └── shared.ts                        # Общие Tailwind class-строки (card, btn, input)
│   │
│   ├── constants/
│   │   ├── app.ts                           # Polling interval, задержки анимаций
│   │   ├── chart.ts                         # SVG-график: размеры, цвета
│   │   ├── analysis.ts                      # Расчёты: margin, boost, growth rates
│   │   └── demo.ts                          # Демо-данные
│   │
│   ├── i18n/
│   │   ├── index.ts                         # Конфигурация i18next
│   │   └── locales/
│   │       ├── ru.ts                        # Русский
│   │       ├── kk.ts                        # Казахский
│   │       └── en.ts                        # Английский
│   │
│   ├── components/
│   │   ├── ui/
│   │   │   ├── AnimatedNumber.tsx           # Анимация числовых значений
│   │   │   ├── ErrorBoundary.tsx            # React Error Boundary
│   │   │   ├── FormField.tsx                # Переиспользуемое поле формы
│   │   │   ├── FormField.styles.ts
│   │   │   ├── States.tsx                   # LoadingState / ErrorState
│   │   │   └── States.styles.ts
│   │   │
│   │   ├── wizard/
│   │   │   ├── StepProgress.tsx             # Прогресс-бар (4 шага)
│   │   │   ├── StepProgress.styles.ts
│   │   │   ├── StepWelcome.tsx              # Шаг 1 — приветствие
│   │   │   ├── StepWelcome.styles.ts
│   │   │   ├── StepInput.tsx                # Шаг 2 — ввод URL + магазин
│   │   │   ├── StepInput.styles.ts
│   │   │   ├── StepLeadForm.tsx             # Шаг 4 — форма заявки
│   │   │   └── StepLeadForm.styles.ts
│   │   │
│   │   └── analysis/
│   │       ├── StepAnalysis.tsx             # Оркестратор дашборда
│   │       ├── StepAnalysis.styles.ts
│   │       ├── ProfitChart.tsx              # SVG-график прибыли
│   │       ├── ProfitChart.styles.ts
│   │       ├── FomoBlock.tsx                # FOMO-блок упущенной выгоды
│   │       ├── FomoBlock.styles.ts
│   │       ├── PriceSimulator.tsx           # Симулятор цены
│   │       ├── PriceSimulator.styles.ts
│   │       ├── PositionRanking.tsx          # Мини-рейтинг продавцов
│   │       └── PositionRanking.styles.ts
│   │
│   ├── hooks/
│   │   ├── useThrottledValue.ts             # Троттлинг значений
│   │   └── usePolling.ts                    # Авто-обновление данных
│   │
│   ├── lib/
│   │   ├── onboardingClient.ts              # API-клиент (analyzeKaspi, submitLead)
│   │   ├── utils.ts                         # Утилиты (cn, formatMoney)
│   │   └── miniSellerRanking.ts             # Логика мини-рейтинга продавцов
│   │
│   ├── pages/
│   │   ├── AiProfitAnalyzerPage.tsx         # Главная страница — состояние визарда
│   │   └── AiProfitAnalyzerPage.styles.ts
│   │
│   └── assets/
│       ├── sellers-bg.png                   # Фон телефона для мини-рейтинга
│       └── Logo_of_Kaspi_bank.png           # Логотип Kaspi
│
└── server/
    ├── package.json
    ├── .env.example
    └── src/
        ├── index.js                         # Express + MongoDB
        ├── models/
        │   ├── Lead.js                      # Модель заявки
        │   └── Record.js                    # Модель записи анализа
        ├── routes/
        │   ├── analyze.js                   # POST /api/analyze
        │   ├── lead.js                      # POST /api/lead
        │   └── records.js                   # GET/POST /api/records
        └── services/
            └── kaspiParser.js               # Интеграция с Kaspi API
```

### Паттерн стилей

Каждый компонент имеет co-located `.styles.ts` файл:

```ts
// Component.styles.ts
import { shared } from '@/styles/shared';
import { cn } from '@/lib/utils';

export const styles = {
  root: cn(shared.card, 'p-4'),
  title: 'text-xl font-bold',
};

export const animations = { ... };
```

```tsx
// Component.tsx
import { styles, animations } from './Component.styles';
<div className={styles.root}>...</div>
```

## Переменные окружения (Backend)

Создайте `server/.env`:

```
MONGODB_URI=mongodb://127.0.0.1:27017/salescout
PORT=4000
CORS_ORIGIN=http://localhost:3000
PROXY_SERVER=http://proxy-host:proxy-port
PROXY_USERNAME=username
PROXY_PASSWORD=password
PROXY_URLS=http://user:pass@proxy-host:proxy-port
```

## Запуск

**Frontend**

```bash
npm install
npm run dev
```

**Backend**

```bash
npm --prefix server install
npm run dev:api
```

## Что умеет Step 3 (анализ)

- Реальный API Kaspi (без HTML-парсинга и браузерных парсеров)
- SVG-график роста прибыли с анимацией линий и точек
- FOMO-блок "упущенной выгоды"
- Мини-рейтинг продавцов с reorder-анимацией и конкурентным shuffle
- Симулятор цены без запроса к серверу
- Авто-обновление данных каждые 15 секунд

## Локализация

Сайт поддерживает 3 языка: русский (по умолчанию), казахский и английский. Переводы хранятся в отдельных файлах `src/i18n/locales/`.

## Важно

- Проект работает **только с kaspi.kz**
- Для других маркетплейсов возвращается корректная ошибка
- Внешние UI-библиотеки не используются
