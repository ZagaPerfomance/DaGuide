# DaGuide
Сайт туристического агрегатора на стеке MERN
src
└── components
    ├── Auth
    │   ├── Login.js                 // Компонент для входа в систему
    │   └── Signup.js                // Компонент для регистрации нового пользователя
    ├── Dashboard
    │   ├── Dashboard.js             // Компонент для отображения панели администратора
    │   ├── Home.js                  // Компонент для отображения домашней страницы панели администратора
    │   ├── AddTourPackage.js        // Компонент для добавления нового тура
    │   ├── ManageOrders.js          // Компонент для управления заказами туров
    │   ├── EditOrder.js             // Компонент для редактирования заказа тура
    │   ├── AddGuestHouse.js         // Компонент для добавления нового гостевого дома
    │   ├── EditGuestHouse.js        // Компонент для редактирования гостевого дома
    │   ├── AssignRoles.js           // Компонент для назначения ролей пользователям
    │   └── ManageGuideApplications.js  // Компонент для управления заявками гидов
    ├── TourPackage
    │   ├── TourPackage.js           // Компонент для отображения информации о туре
    │   └── BookingForm.js           // Компонент для заполнения формы бронирования тура
    ├── GuestHouse
    │   ├── GuestHouse.js            // Компонент для отображения информации о гостевом доме
    │   └── BookingForm.js           // Компонент для заполнения формы бронирования гостевого дома
    ├── Guide
    │   ├── GuideApplicationForm.js  // Компонент для отправки заявки на статус гида
    │   ├── TourCreationForm.js      // Компонент для создания нового тура
    │   └── GuideProfile.js          // Компонент для отображения профиля гида
    ├── Client
    │   ├── TourBookingConfirmation.js  // Компонент для подтверждения бронирования тура
    │   ├── GuestHouseBookingConfirmation.js  // Компонент для подтверждения бронирования гостевого дома
    │   └── BookingCancellation.js  // Компонент для отмены бронирования
    └── Profile
        └── Profile.js                // Компонент для отображения и редактирования профиля пользователя
└── pages
    ├── Home.js                      // Компонент для отображения главной страницы
    ├── Tours.js                     // Компонент для отображения страницы со списком туров
    ├── Booking.js                   // Компонент для отображения страницы бронирования тура
    └── Profile.js                   // Компонент для отображения профиля пользователя
└── App.js                          // Основной компонент приложения, определяющий маршрутизацию и общий макет
└── index.js                        // Файл для инициализации приложения

routes
├── auth.js                        // Маршруты для аутентификации и авторизации пользователей
├── tour.js                        // Маршруты для управления турами и заказами
├── user.js                        // Маршруты для управления профилем пользователя
└── guide.js                       // Маршруты для управления заявками гидов
controllers
├── authController.js              // Контроллер для обработки запросов, связанных с аутентификацией и авторизацией
├── tourController.js              // Контроллер для обработки запросов, связанных с турами и заказами
├── userController.js              // Контроллер для обработки запросов, связанных с профилем пользователя
└── guideController.js             // Контроллер для обработки запросов, связанных с заявками гидов
models
├── User.js                        // Модель пользователя
├── Tour.js                        // Модель тура
├── Booking.js                     // Модель заказа
├── GuideApplication.js            // Модель заявки гида
└── GuestHouse.js                  // Модель гостевого дома
middlewares
├── authMiddleware.js              // Middleware для проверки аутентификации пользователя
├── adminMiddleware.js             // Middleware для проверки роли пользователя (администратора)
├── guideMiddleware.js             // Middleware для проверки роли пользователя (гида)
└── clientMiddleware.js            // Middleware для проверки роли пользователя (клиента)
app.js                             // Основной файл сервера, настройка и запуск приложения
config.js                          // Файл с конфигурационными параметрами приложения (например, настройки базы данных)