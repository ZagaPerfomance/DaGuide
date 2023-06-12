const express = require('express');
const router = express.Router();
const GuideApplication = require('../models/GuideApplication');
const authMiddleware = require('../middlewares/auth');

// GET /api/guides/applications
// Получение списка заявок гидов
router.get('/applications', async (req, res) => {
  try {
    const applications = await GuideApplication.find();
    res.json(applications);
  } catch (error) {
    res.status(500).json({ message: 'Ошибка при получении списка заявок гидов' });
  }
});

// GET /api/guides/applications/:id
// Получение информации о заявке гида
router.get('/applications/:id', async (req, res) => {
  try {
    const application = await GuideApplication.findById(req.params.id);
    if (!application) {
      return res.status(404).json({ message: 'Заявка гида не найдена' });
    }
    res.json(application);
  } catch (error) {
    res.status(500).json({ message: 'Ошибка при получении информации о заявке гида' });
  }
});

// POST /api/guides/applications
// Создание новой заявки гида
router.post('/applications', async (req, res) => {
  try {
    const { name, email, experience } = req.body;

    // Проверка наличия обязательных полей
    if (!name || !email || !experience) {
      return res.status(400).json({ message: 'Пожалуйста, заполните все поля' });
    }

    // Создание новой заявки гида
    const newApplication = new GuideApplication({ name, email, experience });

    // Сохранение заявки в базе данных
    await newApplication.save();

    res.status(201).json(newApplication);
  } catch (error) {
    res.status(500).json({ message: 'Ошибка при создании заявки гида' });
  }
});

// PUT /api/guides/applications/:id
// Обновление информации о заявке гида
router.put('/applications/:id', async (req, res) => {
  try {
    const { name, email, experience } = req.body;

    const application = await GuideApplication.findById(req.params.id);
    if (!application) {
      return res.status(404).json({ message: 'Заявка гида не найдена' });
    }

    // Обновление информации о заявке гида
    application.name = name || application.name;
    application.email = email || application.email;
    application.experience = experience || application.experience;

    // Сохранение обновленной заявки гида
    const updatedApplication = await application.save();

    res.json(updatedApplication);
  } catch (error) {
    res.status(500).json({ message: 'Ошибка при обновлении информации о заявке гида' });
  }
});

// DELETE /api/guides/applications/:id
// Удаление заявки гида
router.delete('/applications/:id', async (req, res) => {
  try {
    const application = await GuideApplication.findById(req.params.id);
    if (!application) {
      return res.status(404).json({ message: 'Заявка гида не найдена' });
    }

    // Удаление заявки гида из базы данных
    await application.remove();

    res.json({ message: 'Заявка гида удалена' });
  } catch (error) {
    res.status(500).json({ message: 'Ошибка при удалении заявки гида' });
  }
});

// GET /api/guides/applications/total
// Получение общего количества заявок гидов
router.get('/applications/total', async (req, res) => {
  try {
    const totalApplications = await GuideApplication.countDocuments();
    res.json({ total: totalApplications });
  } catch (error) {
    res.status(500).json({ message: 'Ошибка при получении общего количества заявок гидов' });
  }
});

// GET /api/guides/applications/recent
// Получение последних заявок гидов
router.get('/applications/recent', async (req, res) => {
  try {
    const recentApplications = await GuideApplication.find().sort({ createdAt: -1 }).limit(5);
    res.json(recentApplications);
  } catch (error) {
    res.status(500).json({ message: 'Ошибка при получении последних заявок гидов' });
  }
});

module.exports = router;