#!/bin/bash

# Проверяем наличие файла с ключом
if [ ! -f "certificate.key" ]; then
    echo "Ошибка: Файл certificate.key не найден в текущей директории"
    exit 1
fi

# Создаем директорию для SSL на сервере (если её нет)
ssh root@79.174.93.221 "mkdir -p /etc/nginx/ssl"

# Загружаем ключ на сервер
scp certificate.key root@79.174.93.221:/etc/nginx/ssl/barabany-neshkola.ru.key

# Устанавливаем правильные права доступа на сервере
ssh root@79.174.93.221 "chmod 600 /etc/nginx/ssl/barabany-neshkola.ru.key"

echo "SSL-ключ успешно загружен на сервер" 