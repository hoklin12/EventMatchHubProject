# FastAPI Service – Certificate Generator

> **Description:**
> This service handles certificate generation using Python. It exposes a **FastAPI endpoint** that receives user and template data, generates a certificate image, and returns the result as a **base64 encoded PNG string**.

---

## Project Structure

```
fastapi_service/
├─ certificate_generator/
│ └─ main.py # Python logic for certificate generation (PIL usage)
├─ main.py # FastAPI entry point and endpoint definition
├─ requirements.txt # List of project dependencies
├─ venv/ # Python virtual environment (ignored in git)
```

---

## Requirements

The following tools and dependencies are required to set up and run the service:

- **Python 3.10.11** (Recommended Version)
- `pip` installed
- `Git` installed

---

## Setup Guide

### 1. Clone the repository

```bash
git clone https://github.com/hoklin12/EventMatchHubProject
cd fastapi_service
```

### 2. Create & activate virtual environment

```bash
python -m venv venv
```

**Activation:**

**Windows (PowerShell):**

```bash
.\venv\Scripts\Activate.ps1
```

**Mac/Linux:**

```bash
source venv/bin/activate
```

### 3. Install dependencies

```bash
pip install -r requirements.txt
```

**Key Dependencies include:**

- `fastapi` (Web framework)
- `uvicorn` (ASGI server)
- `pillow` (PIL - Image manipulation for certificate generation)
- `requests` (If the service needs to fetch templates/data)
- `python-multipart` (For handling form data)

### 4. Run the FastAPI server

```bash
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

---

## Usage

### Accessing the API

The interactive documentation (Swagger UI) for testing endpoints is available at:
`http://localhost:8000/docs`

The primary endpoint for generation is: `/generate-certificate` (POST)

### Request Format

Send a `POST` request to the generation endpoint with the necessary JSON payload:

```json
{
  "userData": {
    "name": "Jane Doe",
    "course_id": "ML-2024"
    /* other user-specific fields */
  },
  "metadata": {
    "template_id": "default_cert_v1",
    "date_issued": "2024-05-20"
    /* template configuration fields */
  }
}
```

### Successful Response

The service returns a JSON object containing the base64 encoded PNG of the certificate image:

```json
{
  "status": "success",
  "image": "<base64-encoded PNG string>"
}
```

---

## Environment & Configuration

- **Configuration File:** `config/config.json` (Note: Ensure this file or directory exists if the service relies on it).
- Sensitive information and configuration details should be kept out of version control (check `.gitignore`).

---

## Tips for Developers

1.  **Environment:** Always activate the virtual environment (`source venv/bin/activate`) before running any Python commands or services.
2.  **Dependencies:** Ensure the `requirements.txt` file is up-to-date whenever new libraries are installed:
    ```bash
    pip freeze > requirements.txt
    ```
3.  **Testing:** Use the interactive documentation (`/docs`) to quickly test payload structures and endpoint responses.
4.  **Logging:** Logs and standard errors are printed directly to the console by Uvicorn; application-specific errors are encapsulated and returned in the JSON response structure.

---

## Recommended Python Version

We recommend using **Python 3.10.11** for this project to maintain environment parity across the team.

- Use `pyenv` or `conda` to manage and ensure the correct Python version is active.
