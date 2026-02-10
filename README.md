# SaleScout — AI Profit Analyzer

Интерактивный продукт для продавцов на Kaspi: пользователь вводит ссылку на товар и название магазина, система через внутренний API Kaspi рассчитывает позицию, лучшую цену и разницу до ТОП-1. Визуальный мастер из 4 шагов превращает анализ в эмоциональный AI-дашборд и ведет к заявке.

## Стек

**Frontend**

- React + Vite
- JavaScript
- CSS Modules
- Framer Motion
- Lucide React
- i18next + react-i18next (RU / KZ / EN)
- ESLint + Prettier

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
├── vite.config.js
├── eslint.config.js
├── .prettierrc
├── package.json
│
└── src/
    ├── app/
    │   ├── main.jsx                          # Точка входа React
    │   ├── App.jsx                           # Корневой компонент (навбар + язык)
    │   └── App.module.css
    │
    ├── shared/
    │   ├── styles/
    │   │   ├── tokens.css                    # CSS custom properties (дизайн-токены)
    │   │   └── globals.css                   # Reset, body, keyframes
    │   │
    │   ├── ui/
    │   │   ├── AnimatedNumber/               # Анимация числовых значений
    │   │   ├── ErrorBoundary/                # React Error Boundary
    │   │   ├── FormField/                    # Переиспользуемое поле формы
    │   │   └── States/                       # LoadingState / ErrorState
    │   │
    │   ├── i18n/
    │   │   ├── i18n.js                       # Конфигурация i18next
    │   │   └── locales/
    │   │       ├── ru.json                   # Русский
    │   │       ├── kz.json                   # Казахский
    │   │       └── en.json                   # Английский
    │   │
    │   ├── lib/
    │   │   ├── utils.js                      # Утилиты (cn, formatMoney)
    │   │   ├── onboardingClient.js           # API-клиент (analyzeKaspi, submitLead)
    │   │   └── miniSellerRanking.js          # Логика мини-рейтинга продавцов
    │   │
    │   ├── hooks/
    │   │   └── usePolling.js                 # Авто-обновление данных
    │   │
    │   └── constants/
    │       ├── app.js                        # Polling interval, задержки анимаций
    │       ├── chart.js                      # SVG-график: размеры, цвета
    │       ├── analysis.js                   # Расчёты: margin, boost, growth rates
    │       └── demo.js                       # Фолбэк-данные
    │
    ├── features/
    │   ├── wizard/
    │   │   ├── StepWelcome/                  # Шаг 1 — приветствие
    │   │   ├── StepInput/                    # Шаг 2 — ввод URL + магазин
    │   │   ├── StepProgress/                 # Прогресс-бар (4 шага)
    │   │   └── StepLeadForm/                 # Шаг 4 — форма заявки
    │   │
    │   └── analysis/
    │       ├── StepAnalysis/                 # Оркестратор дашборда
    │       ├── ProfitChart/                  # SVG-график прибыли
    │       ├── FomoBlock/                    # FOMO-блок упущенной выгоды
    │       ├── PriceSimulator/               # Симулятор цены
    │       └── PositionRanking/              # Мини-рейтинг продавцов
    │
    ├── pages/
    │   └── AiProfitAnalyzerPage/             # Главная страница — состояние визарда
    │
    └── assets/
        ├── sellers-bg.png                    # Фон телефона для мини-рейтинга
        └── Logo_of_Kaspi_bank.png            # Логотип Kaspi

server/
├── package.json
├── .env.example
└── src/
    ├── index.js                              # Express + MongoDB
    ├── models/
    │   ├── Lead.js                           # Модель заявки
    │   └── Record.js                         # Модель записи анализа
    ├── routes/
    │   ├── analyze.js                        # POST /api/analyze
    │   ├── lead.js                           # POST /api/lead
    │   └── records.js                        # GET/POST /api/records
    └── services/
        └── kaspiParser.js                    # Интеграция с Kaspi API
```

### Паттерн стилей

Каждый компонент живёт в своей папке с CSS Module:

```
Component/
├── Component.jsx
├── Component.module.css
└── index.js
```

```jsx
// Component.jsx
import { cn } from '@/shared/lib/utils';
import s from './Component.module.css';

<div className={cn(s.root, isActive && s.rootActive)}>...</div>;
```

Дизайн-токены (цвета, радиусы, тени) определены в `tokens.css` как CSS custom properties и используются во всех `.module.css` файлах.

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

## Скрипты

```bash
npm run dev        # Запуск dev-сервера (localhost:3000)
npm run build      # Production-сборка
npm run preview    # Предпросмотр production-сборки
npm run lint       # ESLint
npm run format     # Prettier
```

## Что умеет Step 3 (анализ)

- Реальный API Kaspi (без HTML-парсинга и браузерных парсеров)
- SVG-график роста прибыли с анимацией линий и точек
- FOMO-блок "упущенной выгоды"
- Мини-рейтинг продавцов с reorder-анимацией и конкурентным shuffle
- Симулятор цены без запроса к серверу
- Авто-обновление данных каждые 15 секунд

## Локализация

Сайт поддерживает 3 языка: русский (по умолчанию), казахский и английский. Переводы хранятся в JSON-файлах `src/shared/i18n/locales/`. Выбранный язык сохраняется в localStorage.

## Важно

- Проект работает **только с kaspi.kz**
- Для других маркетплейсов возвращается корректная ошибка
- Внешние UI-библиотеки не используются
