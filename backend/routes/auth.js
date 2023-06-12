const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = express.Router();

const User = require('../models/User');
const { validateRegistration, validateLogin } = require('../middlewares/validation');
const { authenticateUser } = require('../middlewares/authentication');

// Регистрация нового пользователя
router.post('/register', validateRegistration, async (req, res) => {
    try {
      const { name, email, password } = req.body;
  
      // Проверяем, существует ли уже пользователь с указанным email
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: 'Пользователь с таким email уже зарегистрирован' });
      }
  
      // Хэшируем пароль
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Создаем нового пользователя
      const newUser = new User({ name, email, password: hashedPassword });
      await newUser.save();
  
      // Генерируем JWT токен
      const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET);
  
      res.status(201).json({ token });
    } catch (err) {
      console.error('Ошибка при регистрации пользователя:', err);
      res.status(500).json({ message: 'Внутренняя ошибка сервера' });
    }
  })

// Вход пользователя
router.post('/login', validateLogin, async (req, res) => {
    try {
      const { email, password } = req.body;
  
      // Проверяем, существует ли пользователь с указанным email
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: 'Неверный email или пароль' });
      }
  
      // Проверяем правильность введенного пароля
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(400).json({ message: 'Неверный email или пароль' });
      }
  
      // Генерируем JWT токен
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
  
      res.status(200).json({ token });
    } catch (err) {
      console.error('Ошибка при входе пользователя:', err);
      res.status(500).json({ message: 'Внутренняя ошибка сервера' });
    }
  });

// Получение информации о текущем пользователе
router.get('/profile', authenticateUser, async (req, res) => {
  try {
    // Получаем информацию о текущем пользователе из JWT-токена
    const userId = req.user;

    // Ищем пользователя в базе данных
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'Пользователь не найден' });
    }

    res.status(200).json({ user });
  } catch (err) {
    console.error('Ошибка при получении информации о пользователе:', err);
    res.status(500).json({ message: 'Внутренняя ошибка сервера' });
  }
});

// Обновление информации о текущем пользователе
router.put('/profile', authenticateUser, async (req, res) => {
  try {
    // Получаем информацию о текущем пользователе из JWT-токена
    const userId = req.user;
// Обновление информации о текущем пользователе
router.put('/profile', authenticateUser, async (req, res) => {
    try {
      // Получаем информацию о текущем пользователе из JWT-токена
      const userId = req.user;
  
      // Извлекаем данные из запроса
      const { name, email } = req.body;
  
      // Находим пользователя в базе данных
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: 'Пользователь не найден' });
      }
  
      // Обновляем информацию о пользователе
      user.name = name;
      user.email = email;
      await user.save();
  
      res.status(200).json({ message: 'Информация о пользователе обновлена' });
    } catch (err) {
      console.error('Ошибка при обновлении информации о пользователе:', err);
      res.status(500).json({ message: 'Внутренняя ошибка сервера' });
    }
  });
  
    

    res.status(200).json({ message: 'Информация о пользователе обновлена' });
  } catch (err) {
    console.error('Ошибка при обновлении информации о пользователе:', err);
    res.status(500).json({ message: 'Внутренняя ошибка сервера' });
  }
});

// Удаление текущего пользователя
router.delete('/profile', authenticateUser, async (req, res) => {
  try {
    // Получаем информацию о текущем пользователе из JWT-токена
    const userId = req.user;

// Удаление пользователя
router.delete('/profile', authenticateUser, async (req, res) => {
    try {
      // Получаем информацию о текущем пользователе из JWT-токена
      const userId = req.user;
  
      // Находим пользователя в базе данных
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: 'Пользователь не найден' });
      }
  
      // Удаляем пользователя
      await user.remove();
  
      res.status(200).json({ message: 'Пользователь успешно удален' });
    } catch (err) {
      console.error('Ошибка при удалении пользователя:', err);
      res.status(500).json({ message: 'Внутренняя ошибка сервера' });
    }
  });
  
    res.status(200).json({ message: 'Пользователь удален' });
  } catch (err) {
    console.error('Ошибка при удалении пользователя:', err);
    res.status(500).json({ message: 'Внутренняя ошибка сервера' });
  }
});

module.exports = router;