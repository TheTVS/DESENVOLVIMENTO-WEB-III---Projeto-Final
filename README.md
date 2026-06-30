# DESENVOLVIMENTO-WEB-III---Projeto-Final
# Cadastro e Lista de Recados

## Tecnologias
- Frontend: React (Create React App)
- Backend: Laravel 11 + Sanctum
- Banco: MySQL 8

## Pré-requisitos
- Node.js v20+
- PHP 8.2+
- Composer 2
- MySQL 8 rodando

## Como rodar o backend

```bash
cd backend
composer install
cp .env.example .env   # edite com suas credenciais MySQL
php artisan key:generate
php artisan migrate
php artisan serve
```

> O backend sobe em http://localhost:8000

## Como rodar o frontend

```bash
cd frontend
npm install
npm start
```

> O frontend sobe em http://localhost:3000
