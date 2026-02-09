/**
 * Роуты /api/records
 * POST /parse  — только парсинг (без сохранения)
 * POST /       — парсинг + сохранение записи в БД
 * GET  /       — список последних 50 записей
 */
import express from 'express';
import Record from '../models/Record.js';
import { analyzeKaspiProduct } from '../services/kaspiParser.js';

const router = express.Router();

/** Безопасно парсит URL; возвращает null при невалидной ссылке */
function parseUrl(rawUrl) {
  try {
    const parsed = new URL(rawUrl);
    if (!['http:', 'https:'].includes(parsed.protocol)) {
      return null;
    }
    return {
      host: parsed.host,
      path: parsed.pathname,
      href: parsed.href
    };
  } catch (error) {
    return null;
  }
}

/** Только парсинг — без сохранения в БД (для превью) */
router.post('/parse', async (req, res) => {
  try {
    const productUrl = String(req.body.productUrl ?? '').trim();
    const shopName = String(req.body.shopName ?? '').trim();

    if (!productUrl) {
      return res.status(400).json({ message: 'Введите ссылку на товар' });
    }

    const parsed = parseUrl(productUrl);
    if (!parsed) {
      return res.status(400).json({ message: 'Некорректная ссылка' });
    }

    if (!parsed.host.endsWith('kaspi.kz')) {
      return res
        .status(400)
        .json({ message: 'Платформа не поддерживается. Вставьте ссылку на товар Kaspi.' });
    }

    if (!shopName || shopName.length < 2) {
      return res.status(400).json({ message: 'Введите название магазина' });
    }

    const result = await analyzeKaspiProduct(productUrl, shopName);
    return res.json(result);
  } catch (error) {
    const payload = { message: error.message || 'Не удалось выполнить парсинг' };
    if (error.debugFiles) {
      payload.debugFiles = error.debugFiles;
    }
    return res.status(500).json(payload);
  }
});

/** Парсинг + сохранение результата анализа в БД */
router.post('/', async (req, res) => {
  try {
    const productUrl = String(req.body.productUrl ?? '').trim();
    const shopName = String(req.body.shopName ?? '').trim();

    if (!productUrl) {
      return res.status(400).json({ message: 'Введите ссылку на товар' });
    }

    const parsed = parseUrl(productUrl);
    if (!parsed) {
      return res.status(400).json({ message: 'Некорректная ссылка' });
    }

    if (!parsed.host.endsWith('kaspi.kz')) {
      return res
        .status(400)
        .json({ message: 'Платформа не поддерживается. Вставьте ссылку на товар Kaspi.' });
    }

    if (!shopName || shopName.length < 2) {
      return res.status(400).json({ message: 'Введите название магазина' });
    }

    const analysis = await analyzeKaspiProduct(productUrl, shopName);

    if (!analysis.myShopFound) {
      return res.status(404).json({ message: 'Указанный магазин не найден среди продавцов' });
    }

    const {
      leaderPrice,
      myShopPrice: myPrice,
      myShopPosition: position,
      leaderShop,
      offers
    } = analysis;

    const record = await Record.create({
      productUrl,
      productHost: parsed.host,
      productPath: parsed.path,
      shopName,
      leaderPrice,
      myPrice,
      position,
      offers
    });

    return res.status(201).json({
      id: record._id.toString(),
      leaderPrice,
      myPrice,
      position,
      leaderShop,
      createdAt: record.createdAt
    });
  } catch (error) {
    return res.status(500).json({ message: error.message || 'Не удалось сохранить данные' });
  }
});

/** Последние 50 записей (для истории анализов) */
router.get('/', async (req, res) => {
  const items = await Record.find()
    .sort({ createdAt: -1 })
    .limit(50)
    .lean();

  const payload = items.map((item) => ({
    id: item._id.toString(),
    productUrl: item.productUrl,
    productHost: item.productHost,
    productPath: item.productPath,
    shopName: item.shopName,
    leaderPrice: item.leaderPrice,
    myPrice: item.myPrice,
    offers: item.offers,
    position: item.position,
    createdAt: item.createdAt
  }));

  res.json(payload);
});

export default router;
