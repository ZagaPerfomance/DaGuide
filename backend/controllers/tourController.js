const Tour = require('../models/Tour');
const Booking = require('../models/Booking');
const User = require('../models/User');

// Получение списка всех туров
const getAllTours = async (req, res) => {
  try {
    const tours = await Tour.find();
    res.json(tours);
  } catch (error) {
    res.status(500).json({ message: 'Ошибка при получении списка туров' });
  }
};

// Создание нового тура
const createTour = async (req, res) => {
  try {
    const { title, description, price } = req.body;

    const newTour = new Tour({ title, description, price });

    await newTour.save();

    res.status(201).json({ message: 'Тур успешно создан', tour: newTour });
  } catch (error) {
    res.status(500).json({ message: 'Ошибка при создании тура' });
  }
};

// Получение информации о конкретном туре
const getTourById = async (req, res) => {
  try {
    const { id } = req.params;

    const tour = await Tour.findById(id);

    if (!tour) {
      return res.status(404).json({ message: 'Тур не найден' });
    }

    res.json(tour);
  } catch (error) {
    res.status(500).json({ message: 'Ошибка при получении информации о туре' });
  }
};

// Обновление информации о туре
const updateTour = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, price } = req.body;

    const tour = await Tour.findByIdAndUpdate(id, { title, description, price }, { new: true });

    if (!tour) {
      return res.status(404).json({ message: 'Тур не найден' });
    }

    res.json({ message: 'Информация о туре успешно обновлена', tour });
  } catch (error) {
    res.status(500).json({ message: 'Ошибка при обновлении информации о туре' });
  }
};

// Удаление тура
const deleteTour = async (req, res) => {
  try {
    const { id } = req.params;

    const tour = await Tour.findByIdAndDelete(id);

    if (!tour) {
      return res.status(404).json({ message: 'Тур не найден' });
    }

    // Удаление связанных заказов
    await Booking.deleteMany({ tour: id });

    res.json({ message: 'Тур успешно удален' });
  } catch (error) {
    res.status(500).json({ message: 'Ошибка при удалении тура' });
  }
};

// Создание заказа
const createBooking = async (req, res) => {
  try {
    const { tourId, userId, date } = req.body;

    // Проверка, существует ли указанный тур
    const tour = await Tour.findById(tourId);
    if (!tour) {
      return res.status(404).json({ message: 'Тур не найден' });
    }

    // Проверка, существует ли указанный пользователь
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'Пользователь не найден' });
    }

    // Создание нового заказа
    const newBooking = new Booking({ tour: tourId, user: userId, date });
    await newBooking.save();

    res.status(201).json({ message: 'Заказ успешно создан', booking: newBooking });
  } catch (error) {
    res.status(500).json({ message: 'Ошибка при создании заказа' });
  }
};

module.exports = {
  getAllTours,
  createTour,
  getTourById,
  updateTour,
  deleteTour,
  createBooking,
};