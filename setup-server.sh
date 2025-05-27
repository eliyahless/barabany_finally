#!/bin/bash

# Обновление системы
sudo apt update
sudo apt upgrade -y

# Установка Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs

# Установка PM2
sudo npm install -g pm2

# Установка Nginx
sudo apt install -y nginx

# Создание конфигурации Nginx
sudo tee /etc/nginx/sites-available/nextjs << EOF
server {
    listen 80;
    server_name _;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_cache_bypass \$http_upgrade;
    }
}
EOF

# Активация конфигурации Nginx
sudo ln -s /etc/nginx/sites-available/nextjs /etc/nginx/sites-enabled/
sudo rm /etc/nginx/sites-enabled/default

# Перезапуск Nginx
sudo systemctl restart nginx

# Создание директории для приложения
mkdir -p ~/app
cd ~/app

# Установка зависимостей и сборка приложения
npm install
npm run build

# Запуск приложения через PM2
pm2 start npm --name "nextjs" -- start
pm2 save
pm2 startup 