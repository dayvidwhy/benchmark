FROM php:8.3-apache

# Add composer and node
COPY --from=composer/composer:latest-bin /composer /usr/bin/composer
COPY --from=node:21 /usr/local/bin /usr/local/bin
COPY --from=node:21 /usr/local/lib/node_modules /usr/local/lib/node_modules

# Install system and PHP dependencies
RUN apt-get update && apt-get install -y \
    git \
    unzip \
    curl \
    zip \
    libpng-dev \
    libonig-dev \
    libxml2-dev \
    libzip-dev \
    default-mysql-client && \
    a2enmod rewrite && \
    docker-php-ext-install pdo_mysql mbstring exif pcntl bcmath gd zip intl

# Set working directory and copy the project
WORKDIR /var/www/html
COPY . .

# Install dependencies
RUN composer install
RUN npm install

# Set permissions
RUN chown -R www-data:www-data /var/www/html

EXPOSE 80
EXPOSE 5173
EXPOSE 8000

# Start Apache in the foreground
CMD ["npm", "run", "start"]