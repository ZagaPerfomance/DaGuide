const clientMiddleware = (req, res, next) => {
    // Проверка, что пользователь аутентифицирован
    if (!req.user) {
      return res.status(401).json({ message: 'Пользователь не аутентифицирован' });
    }
  
    // Проверка, что пользователь имеет роль клиента
    if (req.user.role !== 'client') {
      return res.status(403).json({ message: 'Недостаточно прав для выполнения операции' });
    }
  
    // Проверка доступа к определенным функциям клиента
    if (!req.user.permissions.includes('manageBookings')) {
      return res.status(403).json({ message: 'Недостаточно прав для управления бронированиями' });
    }
  
    // Дополнительные функции и проверки
    // Например, проверка активности аккаунта или другие проверки на основе пользовательских данных
  
    // Проход к следующему middleware или обработчику запроса
    next();
  };
  
  module.exports = clientMiddleware;  