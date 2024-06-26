# Benchmark

![GitHub issues](https://img.shields.io/github/issues/dayvidwhy/benchmark)
![GitHub pull requests](https://img.shields.io/github/issues-pr/dayvidwhy/benchmark)
![GitHub](https://img.shields.io/github/license/dayvidwhy/benchmark)

Benchmark provides a user-friendly interface for conducting surveys and aggregating the results.

## Prerequisites

Before you begin, ensure you have the following installed:
- Docker
- Git

## Getting Started

The development environment is provided by containers.

```bash
git clone git@github.com:dayvidwhy/benchmark.git
cd benchmark

# Copy the example env file and update the variables.
cp .env.example .env

# Start the containers
docker-compose up --build
```

To access the application, open your web browser and navigate to `localhost:8000`.

## Useful commands

```bash
# list routes provided by the app
php artisan route:list --except-vendor

# create a new model with migration
php artisan make:model Survey -m

# view the database
php artisan db:show

# migrate the database
php artisan migrate

# rollback the last migration
php artisan migrate:rollback

# create a migration
php artisan make:migration [useful_migration_name]
```

If you want to inspect a particular table;

```bash
# Start the php CLI
php artisan tinker
```

```php
// View the user table
$table = App\Models\User::all();
```

## VSCode Integration
For an optimized development experience, attach VSCode to the running app container:

1. Use the command palette (Ctrl+Shift+P or Cmd+Shift+P on Mac) and select: `>Dev Containers: Attach to Running Container...`
2. Choose /benchmark-php-1 from the list.
