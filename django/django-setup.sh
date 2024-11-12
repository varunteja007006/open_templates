#!/bin/bash
# Activate the virtual environment (adjust path as needed)
source venv/bin/activate

# Make migrations
python manage.py makemigrations

# Migrate the database
python manage.py migrate

# Create a superuser
python manage.py createsuperuser

# Run the development server
python manage.py runserver
