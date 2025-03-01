# backend/Dockerfile
# Use official Python image
FROM python:3.10-slim

# Set working directory
WORKDIR /app

# Install PostgreSQL client dependencies
RUN apt-get update && apt-get install -y \
    gcc \
    libpq-dev \
    && rm -rf /var/lib/apt/lists/*

# Copy requirements and install them
COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt
RUN apt-get update && apt-get install -y curl
# Copy project files
COPY . .

# Environment variables for superuser creation
ENV DJANGO_SUPERUSER_USERNAME=varun
ENV DJANGO_SUPERUSER_PASSWORD=varun123
ENV DJANGO_SUPERUSER_EMAIL=varunteja007006@gmail.com

# Expose the backend port
EXPOSE 8000

# Copy the entrypoint script
COPY entrypoint.sh /entrypoint.sh

# Give execution permissions to the entrypoint script
RUN chmod +x /entrypoint.sh

# Start the Django application via scripts
ENTRYPOINT ["/entrypoint.sh"]