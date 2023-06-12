const express = require('express');
const router = express.Router();
const User = require('../models/User');
const authMiddleware = require('../middlewares/auth');

// GET /api/users
// Получение списка всех пользователей
router.get('/', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Ошибка при получении списка пользователей' });
  }
});

// GET /api/users/:id
// Получение информации о конкретном пользователе
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'Пользователь не найден' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Ошибка при получении информации о пользователе' });
  }
});

// POST /api/users
// Создание нового пользователя
router.post('/', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Проверка наличия обязательных полей
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Пожалуйста, заполните все поля' });
    }

    // Проверка уникальности email
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Пользователь с таким email уже существует' });
    }

    // Создание нового пользователя
    const newUser = new User({ name, email, password });

    // Сохранение пользователя в базе данных
    await newUser.save();

    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ message: 'Ошибка при создании пользователя' });
  }
});

// PUT /api/users/:id
// Обновление информации о пользователе
router.put('/:id', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'Пользователь не найден' });
    }

    // Обновление информации о пользователе
    user.name = name || user.name;
    user.email = email || user.email;
    user.password = password || user.password;

    // Сохранение обновленного пользователя
    const updatedUser = await user.save();

    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: 'Ошибка при обновлении информации о пользователе' });
  }
});

// DELETE /api/users/:id
// Удаление пользователя
router.delete('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'Пользователь не найден' });
    }

    // Удаление пользователя
    await user.remove();

    res.json({ message: 'Пользователь удален' });
  } catch (error) {
    res.status(500).json({ message: 'Ошибка при удалении пользователя' });
  }
});

module.exports = router;