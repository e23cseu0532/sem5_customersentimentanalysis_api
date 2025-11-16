# Customer Sentiment Analysis - Full Stack AI Application

BTech 3rd Year Project - Intelligent Model Design

## 🎯 Overview
Full-stack sentiment analysis application using BERT-based NLP models to classify customer reviews as Positive, Neutral, or Negative.

## 📁 Project Structure
├── backend/ # Flask REST API with ML model (Python)
└── frontend/ # Next.js web application (React)
## 🚀 Live Demo
- **Frontend:** https://sem5-customersentimentanalysis-api.vercel.app
- **Backend API:** https://customersentimentanalysis-production.up.railway.app
- **API Health Check:** https://customersentimentanalysis-production.up.railway.app/health
- **API Documentation:** https://customersentimentanalysis-production.up.railway.app/

## 🛠️ Tech Stack
- **Backend:** Python, Flask, PyTorch, Transformers, Railway
- **Frontend:** Next.js, React, Tailwind CSS, Firebase Studio, Vercel
- **ML Model:** cardiffnlp/twitter-roberta-base-sentiment-latest (3-class)

## 🎓 Academic Details
- **Student:** Vansh Tyagi (e23cseu0532)
- **Course:** BTech 3rd Year - Intelligent Model Design
- **Date:** November 2025

## 📦 Local Setup

### Backend
cd backend
pip install -r requirements.txt
python app.py
### Frontend
cd frontend
npm install
npm run dev
## 📊 API Endpoints

### Health Check
GET /health

### Predict Sentiment

POST /predict
Body: {"text": "Your review text"}
Response: {
"success": true,
"result": {
"sentiment": "Positive" | "Neutral" | "Negative",
"confidence": 95.5,
"label": 2 | 1 | 0
}
}
