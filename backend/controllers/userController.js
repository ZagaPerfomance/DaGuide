// Получение списка всех пользователей
const getAllUsers = async (req, res) => {
    try {
      const users = await User.find().select('-password');
      res.json(users);
    } catch (error) {
      res.status(500).json({ message: 'Ошибка при получении списка пользователей' });
    }
  };
  
  // Получение информации о конкретном пользователе
  const getUserById = async (req, res) => {
    try {
      const { userId } = req.params;
  
      const user = await User.findById(userId).select('-password');
      if (!user) {
        return res.status(404).json({ message: 'Пользователь не найден' });
      }
  
      res.json(user);
    } catch (error) {
      res.status(500).json({ message: 'Ошибка при получении информации о пользователе' });
    }
  };
  
  // Обновление информации о конкретном пользователе
  const updateUserById = async (req, res) => {
    try {
      const { userId } = req.params;
      const { name, email } = req.body;
  
      const user = await User.findByIdAndUpdate(userId, { name, email }, { new: true });
  
      if (!user) {
        return res.status(404).json({ message: 'Пользователь не найден' });
      }
  
      res.json({ message: 'Информация о пользователе успешно обновлена', user });
    } catch (error) {
      res.status(500).json({ message: 'Ошибка при обновлении информации о пользователе' });
    }
  };
  
  // Удаление конкретного пользователя
  const deleteUserById = async (req, res) => {
    try {
      const { userId } = req.params;
  
      const user = await User.findByIdAndDelete(userId);
  
      if (!user) {
        return res.status(404).json({ message: 'Пользователь не найден' });
      }
  
      res.json({ message: 'Пользователь успешно удален' });
    } catch (error) {
      res.status(500).json({ message: 'Ошибка при удалении пользователя' });
    }
  };
  
  module.exports = {
    getCurrentUser,
    updateCurrentUser,
    deleteCurrentUser,
    getAllUsers,
    getUserById,
    updateUserById,
    deleteUserById,
  };  