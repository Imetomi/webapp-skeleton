FROM python:3.11-slim

WORKDIR /app

# Install Poetry
RUN pip install poetry==1.7.1

# Configure Poetry to not create a virtual environment
RUN poetry config virtualenvs.create false

# Copy pyproject.toml only
COPY pyproject.toml ./

# Generate lock file and install only main dependencies
RUN poetry lock --no-update && poetry install --only main

# Copy the application
COPY . .

# Expose port
EXPOSE 8000

# Start the application
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000", "--reload"]
