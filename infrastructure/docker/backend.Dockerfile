FROM python:3.12-slim

WORKDIR /app

# Install dependencies directly
RUN pip install fastapi==0.110.0 uvicorn==0.29.0 sqlalchemy==2.0.29 alembic==1.13.1 pydantic==2.6.4 python-jose[cryptography]==3.3.0 passlib[bcrypt]==1.7.4 python-multipart==0.0.9 python-dotenv==1.0.1 httpx==0.27.0 firebase-admin==6.4.0 stripe==8.5.0

# Copy the application
COPY . .

# Expose port
EXPOSE 8000

# Start the application
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000", "--reload"]
