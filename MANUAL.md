# Webapp Skeleton Manual

This manual provides detailed instructions for setting up, launching, and managing the Webapp Skeleton project. The project consists of four main components:

1. **Frontend**: Next.js application
2. **Backend**: FastAPI application
3. **CMS**: Strapi content management system
4. **Database**: PostgreSQL database

## Prerequisites

- Docker and Docker Compose installed
- Node.js (v18+) and npm (v9+) for local development
- Python 3.8+ and Poetry for backend local development

## Quick Start with Docker

The easiest way to launch all components is using Docker Compose:

```bash
# Clone the repository (if you haven't already)
git clone https://github.com/yourusername/webapp-skeleton.git
cd webapp-skeleton

# Start all services
docker-compose up -d

# To view logs
docker-compose logs -f

# To stop all services
docker-compose down

# To rebuild and restart services after making changes
docker-compose down && docker-compose up -d --build

# To remove volumes (will delete database data)
docker-compose down -v
```

## Manual Setup and Launch

If you need to run components individually, follow these instructions:

### Database Setup

```bash
# Start PostgreSQL
docker run -d \
  --name webapp-postgres \
  -e POSTGRES_USER=postgres \
  -e POSTGRES_PASSWORD=postgres \
  -e POSTGRES_DB=webapp_skeleton \
  -p 5432:5432 \
  postgres:16-alpine

# Create additional database for Strapi
docker exec -it webapp-postgres psql -U postgres -c "CREATE DATABASE strapi;"
```

### Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies using Poetry
poetry install

# Activate virtual environment
poetry shell

# Run migrations
alembic upgrade head

# Start the backend server
uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
```

### CMS Setup

```bash
# Navigate to CMS directory
cd cms

# Install dependencies
npm install

# Create uploads directory
mkdir -p ./public/uploads

# Start Strapi in development mode
npm run develop
```

### Frontend Setup

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start Next.js development server
npm run dev
```

## Updating Dependencies

### Frontend Dependencies

```bash
# Navigate to frontend directory
cd frontend

# Update dependencies
npm update

# Or update to specific versions
npm install next@latest react@latest react-dom@latest
```

### Backend Dependencies

```bash
# Navigate to backend directory
cd backend

# Update all dependencies
poetry update

# Or update specific packages
poetry update fastapi uvicorn sqlalchemy
```

### CMS Dependencies

```bash
# Navigate to CMS directory
cd cms

# Update dependencies
npm update

# Or update Strapi specifically
npm install @strapi/strapi@latest @strapi/plugin-users-permissions@latest @strapi/plugin-i18n@latest
```

## Testing Services with curl

You can use the following curl commands to test if your services are running correctly:

### Testing the Frontend
```bash
# Check if the frontend is accessible
curl -I http://localhost:3000

# Expected output should include:
# HTTP/1.1 200 OK
# Content-Type: text/html; charset=utf-8
```

### Testing the Backend
```bash
# Check if the backend API is accessible
curl http://localhost:8000

# Expected output:
# {"message":"Welcome to the Webapp Skeleton API"}

# Get API documentation
curl http://localhost:8000/docs
```

### Testing the CMS
```bash
# Check if Strapi CMS is accessible
curl -I http://localhost:1337

# Expected output should include:
# HTTP/1.1 200 OK
# Content-Type: text/html; charset=utf-8

# Check Strapi API
curl http://localhost:1337/api
```

## Common Tasks

### Creating a Strapi Admin User

1. Access the Strapi admin panel at http://localhost:1337/admin
2. Follow the on-screen instructions to create your first administrator

### Accessing the API Documentation

- Backend API documentation: http://localhost:8000/docs
- Strapi API documentation: http://localhost:1337/documentation

### Running Tests

```bash
# Frontend tests
cd frontend
npm test

# Backend tests
cd backend
poetry run pytest
```

### Building for Production

```bash
# Frontend
cd frontend
npm run build
npm start

# Backend
cd backend
uvicorn app.main:app --host 0.0.0.0 --port 8000

# CMS
cd cms
npm run build
npm start
```

## Troubleshooting

### Database Connection Issues

If you encounter database connection issues:

```bash
# Check if PostgreSQL is running
docker ps | grep postgres

# Check PostgreSQL logs
docker logs webapp-postgres

# Reset PostgreSQL data (caution: this will delete all data)
docker-compose down -v
docker-compose up -d
```

### CMS Issues

If Strapi fails to start:

```bash
# Check if required dependencies are installed
cd cms
npm install react@18.2.0 react-dom@18.2.0 react-router-dom@5.3.4 styled-components@5.3.11

# Clear Strapi cache
rm -rf .cache
npm run develop
```

### Frontend Issues

If the frontend fails to start:

```bash
# Clear Next.js cache
cd frontend
rm -rf .next
npm run dev
```

### Docker Issues

If Docker containers fail to start:

```bash
# Check container logs
docker-compose logs

# Rebuild containers
docker-compose down
docker-compose build --no-cache
docker-compose up -d
```

## Environment Variables

### Backend Environment Variables

- `DATABASE_URL`: PostgreSQL connection string
- `SECRET_KEY`: Secret key for JWT token generation
- `ALGORITHM`: Algorithm for JWT token (default: HS256)
- `ACCESS_TOKEN_EXPIRE_MINUTES`: JWT token expiration time

### CMS Environment Variables

- `DATABASE_CLIENT`: Database client (postgres)
- `DATABASE_HOST`: Database host (db)
- `DATABASE_PORT`: Database port (5432)
- `DATABASE_NAME`: Database name (strapi)
- `DATABASE_USERNAME`: Database username (postgres)
- `DATABASE_PASSWORD`: Database password (postgres)
- `ADMIN_JWT_SECRET`: Secret for admin JWT
- `STRAPI_JWT_SECRET`: Secret for Strapi JWT
- `API_TOKEN_SALT`: Salt for API tokens
- `TRANSFER_TOKEN_SALT`: Salt for transfer tokens

### Frontend Environment Variables

- `NEXT_PUBLIC_API_URL`: Backend API URL
- `NEXT_PUBLIC_CMS_URL`: CMS API URL

## Security Considerations

For production deployment, make sure to:

1. Change all default passwords and secrets
2. Use environment variables for sensitive information
3. Enable HTTPS for all services
4. Restrict access to admin interfaces
5. Regularly update dependencies
