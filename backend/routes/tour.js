const express = require('express');
const router = express.Router();
const Tour = require('../models/Tour');
const Booking = require('../models/Booking');
const authMiddleware = require('../middlewares/auth');

// GET /api/tours
// Получение списка всех туров
router.get('/', async (req, res) => {
  try {
    const tours = await Tour.find();
    res.json(tours);
  } catch (error) {
    res.status(500).json({ message: 'Произошла ошибка при получении списка туров' });
  }
});

// POST /api/tours
// Создание нового тура
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { name, description, location, price } = req.body;

    // Создаем новый тур
    const tour = new Tour({
      name,
      description,
      location,
      price,
      createdBy: req.user.id,
    });

    // Сохраняем тур в базе данных
    const savedTour = await tour.save();

    res.status(201).json(savedTour);
  } catch (error) {
    res.status(500).json({ message: 'Произошла ошибка при создании тура' });
  }
});

// GET /api/tours/:id
// Получение информации о конкретном туре
router.get('/:id', async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id);
    if (!tour) {
      return res.status(404).json({ message: 'Тур не найден' });
    }
    res.json(tour);
  } catch (error) {
    res.status(500).json({ message: 'Произошла ошибка при получении информации о туре' });
  }
});

// PUT /api/tours/:id
// Обновление информации о туре
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const { name, description, location, price } = req.body;

    const tour = await Tour.findById(req.params.id);
    if (!tour) {
      return res.status(404).json({ message: 'Тур не найден' });
    }

    // Проверяем, является ли текущий пользователь создателем тура
    if (tour.createdBy.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Вы не авторизованы для обновления этого тура' });
    }

    // Обновляем информацию о туре
    tour.name = name;
    tour.description = description;
    tour.location = location;
    tour.price = price;

    // Сохраняем обновленный тур
    const updatedTour = await tour.save();

    res.json(updatedTour);
  } catch (error) {
    res.status(500).json({ message: 'Произошла ошибка при обновлении информации о туре' });
  }
});

// DELETE /api/tours/:id
// Удаление тура
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id);
    if (!tour) {
      return res.status(404).json({ message: 'Тур не найден' });
    }

    // Проверяем, является ли текущий пользователь создателем тура
    if (tour.createdBy.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Вы не авторизованы для удаления этого тура' });
    }

    // Удаляем тур
    await tour.remove();

    // Удаляем связанные с туром заказы
    await Booking.deleteMany({ tour: tour._id });

    res.json({ message: 'Тур успешно удален' });
  } catch (error) {
    res.status(500).json({ message: 'Произошла ошибка при удалении тура' });
  }
});

module.exports = router;