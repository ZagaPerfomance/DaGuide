const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

// Подключение к базе данных MongoDB
mongoose.connect('mongodb://localhost:27017/myapp', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Маршруты
app.use('/api/auth', require('./routes/auth'));
app.use('/api/tours', require('./routes/tours'));
app.use('/api/users', require('./routes/users'));
app.use('/api/bookings', require('./routes/bookings'));
app.use('/api/guides', require('./routes/guides'));
app.use('/api/guesthouses', require('./routes/guesthouses'));

// Дополнительные функции
app.get('/api/health', (req, res) => {
  res.json({ message: 'Сервер работает' });
});

app.use((req, res, next) => {
  res.status(404).json({ message: 'Страница не найдена' });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Внутренняя ошибка сервера' });
});

// Запуск сервера
const port = process.env.PORT || 4444;
app.listen(port, () => {
  console.log(`Сервер запущен на порту ${port}`);
});