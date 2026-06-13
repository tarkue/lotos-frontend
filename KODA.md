# KODA.md — Инструкция по проекту

## Обзор проекта

**Назначение:** Платформа для онлайн-обучения с системой курсов, модулей, материалов, тестов и домашней работы.

**Тип:** Next.js веб-приложение с использованием архитектурного паттерна Feature-Sliced Design (FSD).

### Технологии

- **Фреймворк:** Next.js 16.0.7
- **React:** 19.2.0
- **Язык:** TypeScript 5
- **Стилизация:** TailwindCSS 4
- **UI компоненты:** Radix UI, shadcn/ui (`components.json`)
- **Формы:** @tanstack/react-form
- **HTTP клиент:** Axios
- **State management:** @tanstack/react-query
- **Валидация:** Zod
- **Markdown:** remark, gray-matter, remark-html
- **Иконки:** Lucide React

### Архитектура

Проект следует паттерну **Feature-Sliced Design**:

```
src/
├── app/           # Страницы приложения (Next.js App Router)
├── entity/        # Сущности (course, user, material, test, module, comment, homework, question, files)
├── features/      # Функциональные возможности (course-action, teacher-action, comment-form и т.д.)
├── shared/        # Переиспользуемые компоненты и утилиты
│   ├── api/       # API клиент
│   ├── context/   # React контексты
│   ├── hooks/     # Кастомные хуки
│   ├── libs/      # Внешние библиотеки и настройки
│   ├── models/    # Общие модели и типы
│   └── ui/        # Базовые UI компоненты
└── widgets/       # Сложные композиционные компоненты
```

## Сборка и запуск

### Команды разработки

```bash
# Установка зависимостей
npm install

# Запуск сервера разработки
npm run dev

# Сборка для продакшена
npm run build

# Запуск продакшен-сервера
npm run start

# Линтинг кода
npm run lint
```

### Docker

```bash
# Сборка Docker образа
docker build -t my-app .

# Запуск контейнера
docker-compose up -d
```

### Порты

- **Разработка:** http://localhost:3000
- **Production:** Порт 3000 (настраивается через ENV)

## Основные маршруты

| Маршрут                | Описание                                |
| ---------------------- | --------------------------------------- |
| `/catalog/all`         | Каталог всех курсов (главная страница)  |
| `/catalog/my`          | Мои курсы (авторизованные пользователи) |
| `/catalog/created`     | Созданные курсы (преподаватели)         |
| `/admin`               | Панель администратора                   |
| `/admin/teachers`      | Управление преподавателями              |
| `/admin/courses`       | Управление курсами                      |
| `/login`               | Вход в систему                          |
| `/register`            | Регистрация                             |
| `/forget-password`     | Восстановление пароля                   |
| `/profile`             | Профиль пользователя                    |
| `/progress`            | Прогресс обучения                       |
| `/progress/{courseId}` | Прогресс по конкретному курсу           |

### Структура URL курсов

- `/catalog/courses/{courseId}` — страница курса
- `/catalog/courses/{courseId}/{moduleId}` — модуль курса
- `/catalog/courses/{courseId}/{moduleId}/{materialId}` — материал/тест
- `/catalog/courses/{courseId}/settings/teachers` — настройки преподавателей
- `/catalog/courses/{courseId}/settings/students` — настройки студентов
- `/catalog/courses/{courseId}/settings/applications` — заявки на обучение
- `/catalog/courses/{courseId}/settings/about` — информация о курсе

## Энтити (Сущности)

Проект оперирует следующими сущностями:

- **Course** — курс
- **Module** — модуль курса
- **Material** — учебный материал
- **Test** — тест/квиз
- **Question** — вопрос теста
- **Homework** — домашнее задание
- **Comment** — комментарии
- **User** — пользователь (студент/преподаватель/админ)
- **Files** — файлы (загрузки)

## UI Компоненты

В проекте используется библиотека кастомных UI компонентов в `src/shared/ui/`:

- **Базовые:** button, input, textarea, checkbox, radio, select, modal, tab, table
- **Формы:** field, label, upload-file
- **Навигация:** link, sidebar, pagination
- **Отображение:** typography, container, icon, logo, markdown-content, scroll-area
- **Интерактив:** player (react-player), timer, progress-bar, toast, loader

## Правила разработки

### Кодирование

- Использовать **TypeScript** со строгим режимом (`strict: true`)
- Следовать паттерну **Feature-Sliced Design**
- Импорты использовать через алиас `@/*` (корень проекта)
- CSS модули или Tailwind классы для стилей

### Стиль кода

- **ESLint** с конфигурацией `eslint-config-next`
- Форматирование через **Prettier** (если настроен)
- React 19 с использованием новых возможностей

### Тестирование

TODO: Добавить описание стратегии тестирования (единичные, интеграционные, E2E)

### Git workflow

TODO: Описать ветвление и процесс мержа

## Конфигурация

### Next.js Config

Разрешена загрузка изображений с домена:

- `verybaddomain.site` (HTTPS)

### Tailwind

Используется TailwindCSS v4 с плагином `@tailwindcss/postcss`.

### PostCSS

Конфигурация в `postcss.config.mjs`

### Базовые URL

TODO: Указать базовый URL API (предположительно внешний бэкенд)

## Структура файлов

```
.
├── app/                      # App Router страницы
│   ├── admin/               # Админка
│   ├── catalog/             # Каталог курсов
│   ├── login/               # Вход
│   ├── register/            # Регистрация
│   ├── forget-password/     # Восстановление пароля
│   ├── profile/             # Профиль
│   ├── progress/            # Прогресс обучения
│   ├── layout.tsx           # Корневой layout
│   ├── page.tsx             # Редирект на /catalog/all
│   └── not-found.tsx        # 404 страница
├── src/
│   ├── app/                 # Страницы (если используются)
│   ├── entity/              # Сущности
│   ├── features/            # Фичи
│   ├── shared/              # Шеринг
│   └── widgets/             # Виджеты
├── pages/                   # Pages Router (legacy)
│   └── 404.tsx              # Кастомная 404
├── public/                  # Статические файлы
├── package.json             # Зависимости и скрипты
├── tsconfig.json            # TypeScript конфигурация
├── next.config.ts           # Next.js конфигурация
├── eslint.config.mjs        # ESLint конфигурация
├── tailwind.config.ts       # Tailwind конфигурация
├── postcss.config.mjs       # PostCSS конфигурация
├── components.json          # shadcn/ui конфигурация
├── Dockerfile               # Docker сборка
├── docker-compose.yaml      # Docker Compose
└── README.md                # Документация
```

## Зависимости

### Основные

- `next` — фреймворк
- `react`, `react-dom` — UI библиотека
- `@tanstack/react-query` — управление состоянием сервера
- `axios` — HTTP клиент
- `zod` — валидация схем
- `lucide-react` — иконки
- `tailwindcss` — стилизация

### UI

- `@radix-ui/react-*` — примитивы UI
- `class-variance-authority` — управление вариантами классов
- `clsx`, `tailwind-merge` — утилиты для классов

### Контент

- `gray-matter` — парсинг markdown с frontmatter
- `remark`, `remark-html`, `remark-breaks` — обработка markdown

### Dev dependencies

- `typescript` — типизация
- `eslint`, `eslint-config-next` — линтинг
- `@types/*` — типы для Node, React, React-DOM

## Внешние сервисы

TODO: Описать интеграции с бэкендом, CDN, сторонними сервисами

## Развёртывание

### Vercel

Рекомендуемая платформа для деплоя. См. [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying)

### Docker

Проект подготовлен для Docker-развёртывания через `docker-compose.yaml`

## Примечания

- Основная страница перенаправляет на `/catalog/all` через `Endpoint.ALL_COURSES`
- Используется кастомная 404 страница в `pages/404.tsx`
- Для работы с медиа используется `react-player`
- Профиль пользователя поддерживает сброс пароля через `/profile/reset-password`
