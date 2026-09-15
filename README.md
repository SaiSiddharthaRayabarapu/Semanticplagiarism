# Semantic Plagiarism Detector — Final Integrated Project

Person 1 NLP + Person 3 FastAPI + Person 2 React frontend.

## Backend
From the project root:
```powershell
python -m pip install -r requirements.txt
python -m uvicorn backend.main:app --reload
```
Backend: http://127.0.0.1:8000
Swagger: http://127.0.0.1:8000/docs

## Frontend
In a second terminal, from `frontend`:
```powershell
npm install
npm run dev
```
Then open the Vite URL, normally http://localhost:5173.

The frontend sends multipart fields `source` and `submitted` to `POST http://127.0.0.1:8000/analyze`.
