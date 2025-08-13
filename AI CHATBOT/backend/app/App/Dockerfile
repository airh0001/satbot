FROM python:3.10

WORKDIR /app

COPY . /app

# Install system dependencies (optional, adjust as needed)
RUN apt-get update && apt-get install -y \
    build-essential \
    libpq-dev \
    default-libmysqlclient-dev \
    && rm -rf /var/lib/apt/lists/*
# Install Python dependencies

# Expose the port the app runs on
EXPOSE 8001
# Set environment variables (optional, adjust as needed)
ENV PYTHONUNBUFFERED=1
ENV PYTHONDONTWRITEBYTECODE=1
# Run the application
# Replace 'main.py' with your application's entry point





CMD ["python", "main.py"]

