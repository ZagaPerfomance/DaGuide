const jwt = require('jsonwebtoken');
const config = require('../config');

// Функция для проверки аутентификации пользователя
const isAuthenticated = (req, res, next) => {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ message: 'Отсутствует токен, авторизация отклонена' });
  }

  try {
    const decoded = jwt.verify(token, config.jwtSecret);
    req.user = decoded.user;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Недействительный токен' });
  }
};

// Функция для проверки роли пользователя
const hasRole = (role) => (req, res, next) => {
  if (req.user.role !== role) {
    return res.status(403).json({ message: 'Недостаточно прав для выполнения операции' });
  }
  next();
};

// Функция для проверки доступа к определенным ресурсам
const hasAccessToResource = (resourceId) => (req, res, next) => {
  if (req.user.resources.indexOf(resourceId) === -1) {
    return res.status(403).json({ message: 'Недостаточно прав для доступа к ресурсу' });
  }
  next();
};

module.exports = {
  isAuthenticated,
  hasRole,
  hasAccessToResource
};