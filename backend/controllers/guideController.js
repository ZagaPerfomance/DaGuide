// Получение списка всех заявок гидов
const getAllApplications = async (req, res) => {
    try {
      const applications = await GuideApplication.find();
      res.json(applications);
    } catch (error) {
      res.status(500).json({ message: 'Ошибка при получении списка заявок гидов' });
    }
  };
  
  // Получение информации о конкретной заявке гида
  const getApplicationById = async (req, res) => {
    try {
      const { applicationId } = req.params;
  
      const application = await GuideApplication.findById(applicationId);
      if (!application) {
        return res.status(404).json({ message: 'Заявка гида не найдена' });
      }
  
      res.json(application);
    } catch (error) {
      res.status(500).json({ message: 'Ошибка при получении информации о заявке гида' });
    }
  };
  
  // Обновление информации о конкретной заявке гида
  const updateApplicationById = async (req, res) => {
    try {
      const { applicationId } = req.params;
      const { status } = req.body;
  
      const application = await GuideApplication.findByIdAndUpdate(applicationId, { status }, { new: true });
  
      if (!application) {
        return res.status(404).json({ message: 'Заявка гида не найдена' });
      }
  
      res.json({ message: 'Информация о заявке гида успешно обновлена', application });
    } catch (error) {
      res.status(500).json({ message: 'Ошибка при обновлении информации о заявке гида' });
    }
  };
  
  // Удаление конкретной заявки гида
  const deleteApplicationById = async (req, res) => {
    try {
      const { applicationId } = req.params;
  
      const application = await GuideApplication.findByIdAndDelete(applicationId);
  
      if (!application) {
        return res.status(404).json({ message: 'Заявка гида не найдена' });
      }
  
      res.json({ message: 'Заявка гида успешно удалена' });
    } catch (error) {
      res.status(500).json({ message: 'Ошибка при удалении заявки гида' });
    }
  };

  // Создание новой заявки гида
const createGuideApplication = async (req, res) => {
    try {
      const { name, email, experience, coverLetter } = req.body;
  
      const newApplication = new GuideApplication({
        name,
        email,
        experience,
        coverLetter,
      });
  
      const savedApplication = await newApplication.save();
  
      res.status(201).json({ message: 'Заявка гида успешно создана', application: savedApplication });
    } catch (error) {
      res.status(500).json({ message: 'Ошибка при создании заявки гида' });
    }
  };
  
  // Получение списка заявок гидов с определенным статусом
  const getApplicationsByStatus = async (req, res) => {
    try {
      const { status } = req.params;
  
      const applications = await GuideApplication.find({ status });
      res.json(applications);
    } catch (error) {
      res.status(500).json({ message: 'Ошибка при получении списка заявок гидов' });
    }
  };
  
  // Обновление статуса всех заявок гидов
  const updateAllApplicationsStatus = async (req, res) => {
    try {
      const { status } = req.body;
  
      await GuideApplication.updateMany({}, { status });
  
      res.json({ message: 'Статус всех заявок гидов успешно обновлен' });
    } catch (error) {
      res.status(500).json({ message: 'Ошибка при обновлении статуса заявок гидов' });
    }
  };
  
  module.exports = {
    getAllApplications,
    getApplicationById,
    updateApplicationById,
    deleteApplicationById,
    createGuideApplication,
    getApplicationsByStatus,
    updateAllApplicationsStatus,
  };  