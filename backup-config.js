/**
 * Конфигурация для резервного копирования
 *
 * Этот файл содержит настройки для быстрого подключения системы резервного копирования.
 * Для использования с внешними сервисами или скриптами.
 *
 * Инструкция по настройке ручных бэкапов:
 *
 * 1. Для Vercel:
 *    - Используйте Vercel CLI для создания бэкапов:
 *      $ vercel login
 *      $ vercel project download --name neshkola
 *
 * 2. Для других хостингов:
 *    - Настройте cron-задачу для запуска скрипта резервного копирования
 *    - Используйте rsync, tar или специализированные инструменты
 *
 * 3. Для базы данных (если используется):
 *    - Настройте регулярные дампы базы данных
 *    - Храните дампы в безопасном месте
 */

// Пример скрипта для создания бэкапа
// Сохраните как backup.sh и сделайте исполняемым (chmod +x backup.sh)

/*
#!/bin/bash

# Настройки
SITE_NAME="neshkola"
BACKUP_DIR="/path/to/backups"
DATE=$(date +"%Y-%m-%d_%H-%M-%S")
BACKUP_FILE="${BACKUP_DIR}/${SITE_NAME}_${DATE}.tar.gz"

# Создаем директорию для бэкапов, если она не существует
mkdir -p ${BACKUP_DIR}

# Архивируем файлы сайта
tar -czf ${BACKUP_FILE} /path/to/site/files

# Если используется база данных, добавляем дамп
# mysqldump -u username -p database_name > ${BACKUP_DIR}/db_${DATE}.sql
# tar -rf ${BACKUP_FILE} ${BACKUP_DIR}/db_${DATE}.sql
# rm ${BACKUP_DIR}/db_${DATE}.sql

# Удаляем старые бэкапы (оставляем последние 7)
ls -t ${BACKUP_DIR}/${SITE_NAME}_*.tar.gz | tail -n +8 | xargs -r rm

echo "Backup completed: ${BACKUP_FILE}"
*/

// Экспортируем конфигурацию для использования в будущем
module.exports = {
  // Основные настройки
  site: {
    name: "neshkola",
    url: "https://neshkola.ru",
    environment: "production",
  },

  // Настройки для резервного копирования
  backup: {
    schedule: "0 3 * * *", // cron-формат: ежедневно в 3:00
    retention: {
      count: 7, // количество сохраняемых копий
      days: 30, // или количество дней хранения
    },

    // Что включать в бэкап
    include: [
      {
        type: "files",
        path: "/path/to/site/files",
      },
      {
        type: "database",
        engine: "mysql", // mysql, postgresql, mongodb
        name: "neshkola_db",
        user: "db_user",
        password: "use_environment_variable", // В реальном использовании берите из переменных окружения
      },
    ],

    // Куда сохранять бэкапы
    storage: [
      {
        type: "local",
        path: "/path/to/backups",
      },
      {
        type: "remote",
        protocol: "sftp", // sftp, s3, dropbox, google-drive
        host: "backup-server.example.com",
        user: "backup_user",
        path: "/backups/neshkola",
      },
    ],
  },

  // Настройки уведомлений
  notifications: {
    on_success: ["email"],
    on_failure: ["email", "sms"],
    contacts: [
      {
        type: "email",
        address: "admin@neshkola.ru",
      },
      {
        type: "sms",
        number: "+7XXXXXXXXXX", // Замените на реальный номер
      },
    ],
  },
}
