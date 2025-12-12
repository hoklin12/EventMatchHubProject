# We use a specific Python version that meets your requirement (3.10.11 base)
# Using python:3.10-slim is generally best for production.
FROM python:3.10-slim

# Install system dependencies required for Pillow (image manipulation library)
# This is crucial to avoid runtime errors with image processing.
RUN apt-get update && \
    apt-get install -y --no-install-recommends \
    gcc \
    libjpeg-dev \
    zlib1g-dev \
    && rm -rf /var/lib/apt/lists/*

# Set the working directory
WORKDIR /app

# Copy and install Python dependencies
COPY requirements.txt .
# Install packages, ensuring Pillow is compiled correctly
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the application code
# Assuming your main FastAPI file is 'main.py'
COPY . .

# Expose the port Uvicorn will listen on (standard for FastAPI)
EXPOSE 8000

# Command to run the FastAPI application using Uvicorn
# The command assumes your main application instance is named 'app' in 'main.py'
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]