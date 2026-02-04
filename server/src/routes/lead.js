import express from 'express';
import Lead from '../models/Lead.js';

const router = express.Router();

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

router.post('/', async (req, res) => {
  try {
    const name = String(req.body.name ?? '').trim();
    const phone = String(req.body.phone ?? '').trim();
    const email = String(req.body.email ?? '').trim().toLowerCase();
    const shopName = String(req.body.shopName ?? '').trim();
    const description = String(req.body.description ?? '').trim();

    if (!name || name.length < 2) {
      return res.status(400).json({ message: 'Введите имя (мин. 2 символа)' });
    }
    if (!phone || !/^\+7\d{10}$/.test(phone)) {
      return res.status(400).json({ message: 'Введите телефон в формате +7XXXXXXXXXX' });
    }
    if (!email || !isValidEmail(email)) {
      return res.status(400).json({ message: 'Введите корректный email' });
    }
    if (!shopName || shopName.length < 2) {
      return res.status(400).json({ message: 'Введите название магазина' });
    }
    if (!description) {
      return res.status(400).json({ message: 'Опишите ваш запрос' });
    }

    const lead = await Lead.create({
      name,
      phone,
      email,
      shopName,
      description
    });

    return res.status(201).json({
      id: lead._id.toString(),
      createdAt: lead.createdAt
    });
  } catch (error) {
    return res.status(500).json({ message: error.message || 'Не удалось отправить заявку' });
  }
});

export default router;
