#!/bin/bash

# Создаем директорию для приложения
mkdir -p /var/www/barabany-neshkola.ru
cd /var/www/barabany-neshkola.ru

# Распаковываем архив
tar xzf /root/app.tar.gz

# Устанавливаем зависимости
npm install --production

# Создаем конфигурацию Nginx
cat > /etc/nginx/sites-available/barabany-neshkola.ru << 'EOL'
server {
    listen 80;
    server_name barabany-neshkola.ru www.barabany-neshkola.ru;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
EOL

# Создаем символическую ссылку для Nginx
ln -sf /etc/nginx/sites-available/barabany-neshkola.ru /etc/nginx/sites-enabled/

# Проверяем конфигурацию Nginx
nginx -t

# Перезапускаем Nginx
systemctl restart nginx

# Устанавливаем PM2 для управления процессом
npm install -g pm2

# Запускаем приложение через PM2
cd /var/www/barabany-neshkola.ru
pm2 start npm --name "barabany-neshkola" -- start

# Сохраняем конфигурацию PM2
pm2 save

# Настраиваем автозапуск PM2
pm2 startup 