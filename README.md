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

## VSCode Integration
For an optimized development experience, attach VSCode to the running app container:

1. Use the command palette (Ctrl+Shift+P or Cmd+Shift+P on Mac) and select: `>Dev Containers: Attach to Running Container...`
2. Choose /benchmark-php-1 from the list.
