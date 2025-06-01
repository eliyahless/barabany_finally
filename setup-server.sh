#!/bin/bash

# Обновляем систему
apt update && apt upgrade -y

# Устанавливаем Nginx
apt install -y nginx

# Копируем конфигурацию Nginx
cp nginx.conf /etc/nginx/sites-available/default

# Проверяем конфигурацию Nginx
nginx -t

# Перезапускаем Nginx
systemctl restart nginx

# Устанавливаем Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | bash -
apt install -y nodejs

# Проверяем версии
node --version
npm --version

# Устанавливаем PM2 для управления процессами
npm install -g pm2

# Даем права на директорию
chown -R www-data:www-data /root/app/out
chmod -R 755 /root/app/out

echo "Настройка сервера завершена" 