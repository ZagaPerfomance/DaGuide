const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const config = require('../config');

// Регистрация пользователя
const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Проверка, не зарегистрирован ли уже пользователь с таким email
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Пользователь с таким email уже зарегистрирован' });
    }

    // Хеширование пароля
    const hashedPassword = await bcrypt.hash(password, 10);

    // Создание нового пользователя
    const newUser = new User({ username, email, password: hashedPassword });

    // Сохранение пользователя в базе данных
    await newUser.save();

    // Генерация JWT-токена
    const token = jwt.sign({ userId: newUser._id }, config.jwtSecret, { expiresIn: '1h' });

    res.status(201).json({ message: 'Пользователь успешно зарегистрирован', token, userId: newUser._id });
  } catch (error) {
    res.status(500).json({ message: 'Ошибка при регистрации пользователя' });
  }
};

// Аутентификация пользователя
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Проверка наличия пользователя с указанным email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Неверный email или пароль' });
    }

    // Проверка правильности введенного пароля
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Неверный email или пароль' });
    }

    // Генерация JWT-токена
    const token = jwt.sign({ userId: user._id }, config.jwtSecret, { expiresIn: '1h' });

    res.json({ token, userId: user._id });
  } catch (error) {
    res.status(500).json({ message: 'Ошибка при аутентификации пользователя' });
  }
};

// Получение информации о текущем пользователе
const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).json({ message: 'Пользователь не найден' });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Ошибка при получении информации о пользователе' });
  }
};

// Обновление информации о пользователе
const updateProfile = async (req, res) => {
  try {
    const { username, email } = req.body;

    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).json({ message: 'Пользователь не найден' });
    }

    user.username = username || user.username;
    user.email = email || user.email;

    await user.save();

    res.json({ message: 'Информация о пользователе успешно обновлена', user });
  } catch (error) {
    res.status(500).json({ message: 'Ошибка при обновлении информации о пользователе' });
  }
};

// Удаление пользователя
const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.userId);

    if (!user) {
      return res.status(404).json({ message: 'Пользователь не найден' });
    }

    res.json({ message: 'Пользователь успешно удален' });
  } catch (error) {
    res.status(500).json({ message: 'Ошибка при удалении пользователя' });
  }
};

module.exports = {
  registerUser,
  loginUser,
  getUserProfile,
  updateProfile,
  deleteUser,
};